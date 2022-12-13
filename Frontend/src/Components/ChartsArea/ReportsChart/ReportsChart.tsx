import "./ReportsChart.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import VacationModel from "../../../Models/VacationModel";
import { Bar } from "react-chartjs-2";
import followersVacationsService from "../../../Services/FollowersService";
import store from "../../../Redux/Store";
import Button from "react-bootstrap/Button";

function ReportsChart(): JSX.Element {
  const navigate = useNavigate();
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    // Get vacations from backend:
    followersVacationsService
      .getAllVacationsByFollowers(store.getState().authState.user.userId)
      .then((vacations) => {
        // filtering vacations with no followers:
        const chartsVacations = vacations.filter(
          (vacation) => vacation.followersCount > 0
        );
        setVacations(chartsVacations);
      })
      .catch((err) => console.log(err.message));

    // Subscribe for redux changes:
    const unsubscribe = store.subscribe(() => {
      const dup = [...store.getState().vacationsState.vacations];
      setVacations(dup);
    });

    // Stop listening and unsubscribe:
    return () => {
      unsubscribe();
    };
  }, []);

  const data = {
    labels: vacations.map((vacations) => vacations.destination),
    datasets: [
      {
        label: "Followers",
        data: vacations.map((vacation) => vacation.followersCount),
        backgroundColor: randomColors(vacations),
      },
    ],
  };

  function randomColors(array: VacationModel[]) {
    let colors = [];
    for (let i = 0; i < array.length; i++) {
      let red = Math.floor(Math.random() * 256); // range is 0-255
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      let rgb = `rgb(${red}, ${green}, ${blue})`;
      colors.push(rgb);
    }
    return colors;
  }

  return (
    <div className="ReportsChart">
      <Button variant="light" onClick={() => navigate("/vacations")}>
        Back to list
      </Button>
      <br />
      <div className="ChartStyle">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default ReportsChart;
