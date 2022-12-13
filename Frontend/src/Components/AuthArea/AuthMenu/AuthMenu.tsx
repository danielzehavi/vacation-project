import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import { BsBoxArrowRight } from "react-icons/bs";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    // Load user when component starts:
    setUser(store.getState().authState.user);

    // Subscribe to changes - when user login/register/logout - reload again the user to the state:
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });

    // Unsubscribe when component destroyed:
    return () => unsubscribe();
  }, []);

  return (
    <div className="AuthMenu">
      {user && (
        <span>
          Hello {user.firstName} |{" "}
          <NavLink to="/logout">
            <BsBoxArrowRight />
          </NavLink>{" "}
        </span>
      )}

      {!user && (
        <span>
          Hello Guest | <NavLink to="/login">Login</NavLink> 
        </span>
      )}
    </div>
  );
}

export default AuthMenu;
