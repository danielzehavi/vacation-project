import axios from "axios";
import store from "../Redux/Store";
import authService from "./AuthService";
import jwt from "jwt-decode";

class InterceptorService {
  public createInterceptors(): void {
    // checking if token exists in localStorage:
    let token = localStorage.getItem("token");
    if (token) {
      // decoding the token:
      let decodedToken = jwt(token) as any;
      let currentDate = new Date();

      // checking if token expired:
      // JWT exp is in seconds, checking if 2 hours have passed
      if (decodedToken.exp < currentDate.getTime() / 1000) {
        // remove from localStorage if expired:
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    // Send token for each request:
    axios.interceptors.request.use((request) => {
      if (authService.isLoggedIn()) {
        request.headers = {
          authorization: "Bearer " + store.getState().authState.token,
        };
      }
      return request;
    });
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;
