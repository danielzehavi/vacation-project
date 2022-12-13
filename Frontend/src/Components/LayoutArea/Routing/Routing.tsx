import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import ReportsChart from "../../ChartsArea/ReportsChart/ReportsChart";
import authService from "../../../Services/AuthService";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";

function Routing(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    // Load user when component starts:
    setUser(store.getState().authState.user);

    // Subscribe to changes - when user login/register/logout - reload again the user to the state:
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });

    return () => unsubscribe();
  }, []);

  if (!authService.isLoggedIn()) {
    return (
      <Routes>
        {/* Register: */}
        <Route path="/register" element={<Register />} />

        {/* Login: */}
        <Route path="/login" element={<Login />} />

        {/* Logout: */}
        <Route path="/logout" element={<Navigate to="/login" />} />

        {/* Default Route:  */}
        <Route path="" element={<Navigate to="/login" />} />

        {/* Page Not Found: */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }
  return (
    <div className="Routing">
      {/* All Routes Collection: */}
      <Routes>
        {/* Register: */}
        <Route path="/register" element={<Navigate to="/vacations" />} />

        {/* Login: */}
        <Route path="/login" element={<Navigate to="/vacations" />} />

        {/* Logout: */}
        <Route path="/logout" element={<Logout />} />

        {/* Vacations list: */}
        <Route path="/vacations" element={<VacationsList />} />

        {/* If admin can enter edit option, if not send to homepage */}
        {authService.isAdmin() ? (
          <Route
            path="/vacations/edit/:vacationId"
            element={<EditVacation />}
          />
        ) : (
          <Route
            path="/vacations/edit/:vacationId"
            element={<Navigate to="/vacations" />}
          />
        )}

        {/* Reports chart: */}
        {/* If admin can enter charts, if not send to homepage */}
        {authService.isAdmin() ? (
          <Route path="/charts" element={<ReportsChart />} />
        ) : (
          <Route path="/charts" element={<Navigate to="/vacations" />} />
        )}

        {/* Add new vacation: */}
        {/* If admin can add new vacation, if not send to homepage */}
        {authService.isAdmin() ? (
          <Route path="/vacations/new" element={<AddVacation />} />
        ) : (
          <Route path="/vacations/new" element={<Navigate to="/vacations" />} />
        )}

        {/* Default Route:  */}
        <Route path="" element={<Navigate to="/vacations" />} />

        {/* Page Not Found: */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
