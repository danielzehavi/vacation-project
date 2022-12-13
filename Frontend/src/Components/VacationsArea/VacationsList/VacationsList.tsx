import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import followersVacationsService from "../../../Services/FollowersService";
import VacationCard from "../VacationCard/VacationCard";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import socketService from "../../../Services/SocketService";
import notifyService from "../../../Services/NotifyService";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsFillBarChartFill } from "react-icons/bs";
import Row from "react-bootstrap/Row";

function VacationsList(): JSX.Element {
  // State to handle vacations:
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [user, setUser] = useState<UserModel>();
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to socket.io:
    socketService.connect();

    // Get vacations from backend:
    followersVacationsService
      .getAllVacationsByFollowers(store.getState().authState.user.userId)
      .then((vacations) => setVacations(vacations))
      .catch((err) => console.log(err.message));

    // Load user when component starts:
    setUser(store.getState().authState.user);

    // Subscribe for redux changes:
    const unsubscribe = store.subscribe(() => {
      const dup = [...store.getState().vacationsState.vacations];
      setVacations(dup);
      setUser(store.getState().authState.user);
    });

    // Stop listening and unsubscribe:
    return () => {
      socketService.disconnect();
      unsubscribe();
    };
  }, []);

  async function followVacation(vacationId: number) {
    const followerToAdd = {
      vacationId: vacationId,
      userId: store.getState().authState.user.userId,
    };
    await followersVacationsService.addFollower(followerToAdd);
  }
  async function unFollowVacation(vacationId: number) {
    const followerToDelete = {
      vacationId: vacationId,
      userId: store.getState().authState.user.userId,
    };
    await followersVacationsService.deleteFollower(followerToDelete);
  }

  async function deleteVacation(vacationId: number) {
    try {
      await vacationsService.deleteVacation(vacationId);
      notifyService.success("Vacation has been deleted!");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="VacationsList">
      <div>
        <Row xs="auto" className="g-8 justify-content-center">
          <h6>Your Next Vacation Finder</h6>
        </Row>
        {/* Conditional rendering for admin: */}
        {store.getState().authState.user.Role === "Admin" && (
          <div>
            <Row xs="auto" className="g-8 justify-content-center">
              <Button variant="light" onClick={() => navigate("/charts")}>
                <BsFillBarChartFill /> Reports
              </Button>

              <Button
                variant="light"
                onClick={() => navigate("/vacations/new")}
              >
                <BsFillPlusCircleFill /> New Vacation
              </Button>
            </Row>
          </div>
        )}
        {store.getState().authState.user.Role === "User" && (
          <div>
            <Row xs="auto" className="g-8 justify-content-center">
              <Button
                variant="light"
                onClick={() => {
                  const newList = vacations.filter(
                    (vacation) => vacation.isFollowing > 0
                  );
                  setVacations(newList);
                }}
              >
                My Vacations only
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  followersVacationsService
                    .getAllVacationsByFollowers(
                      store.getState().authState.user.userId
                    )
                    .then((vacations) => setVacations(vacations))
                    .catch((err) => console.log(err.message));
                }}
              >
                All Vacations
              </Button>
            </Row>
          </div>
        )}
      </div>
      <br />
      <div>
        <CardGroup>
          <Row xs="auto" className="g-8 justify-content-center">
            {vacations.map((v) => (
              <VacationCard
                key={v.vacationId}
                vacation={v}
                user={user}
                onFollow={followVacation}
                onUnFollow={unFollowVacation}
                onDelete={deleteVacation}
              />
            ))}
          </Row>
        </CardGroup>
      </div>
    </div>
  );
}

export default VacationsList;
