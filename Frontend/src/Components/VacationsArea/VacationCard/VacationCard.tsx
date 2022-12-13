import "./VacationCard.css";
import VacationModel from "../../../Models/VacationModel";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BsFillPencilFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import Col from "react-bootstrap/Col";

interface VacationCardProps {
  vacation: VacationModel;
  onFollow: (vacationId: number) => void;
  onUnFollow: (vacationId: number) => void;
  onDelete: (vacationId: number) => void;
  user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  // function handel if user Follow/UnFollow vacation:
  function handleClickFollow() {
    props.onFollow(props.vacation.vacationId);
  }
  function handleClickUnFollow() {
    props.onUnFollow(props.vacation.vacationId);
  }

  // function handel for deleting vacation:
  function deleteVacationHandler() {
    try {
      props.onDelete(props.vacation.vacationId);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className="VacationCard">
      <Col>
        <Card id="cardStyle" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={"http://localhost:3001/images/" + props.vacation.imageName}
          />
          <Card.Body>
            <Card.Title>{props.vacation.destination}</Card.Title>
            <main>
              <Card.Text>{props.vacation.vacationInfo}</Card.Text>
            </main>
            <Card.Text>
              {props.vacation.fromDate.split("T")[0]} -{" "}
              {props.vacation.untilDate.split("T")[0]}
            </Card.Text>
            <Card.Text>Price: ${props.vacation.price}</Card.Text>
            <Card.Text>Followers: {props.vacation.followersCount}</Card.Text>
            {/* conditional rendering for User */}
            {props.user.Role === "User" && (
              <div>
                {/* If user follow this vacation, show him the first button, otherwise show the other one */}
                {props.vacation.isFollowing > 0 ? (
                  <Button variant="light" onClick={() => handleClickUnFollow()}>
                    <BsHeartFill />
                  </Button>
                ) : (
                  <Button variant="light" onClick={() => handleClickFollow()}>
                    <BsHeart />
                  </Button>
                )}
              </div>
            )}
            {/* conditional rendering for Admin */}
            {props.user.Role === "Admin" && (
              <div>
                <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>
                  <Button variant="light">
                    <BsFillPencilFill />
                  </Button>
                </NavLink>
                <Button variant="light" onClick={deleteVacationHandler}>
                  <BsTrash />
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default VacationCard;
