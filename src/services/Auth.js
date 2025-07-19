import { ApiEndPoints, NetworkManager } from "../network";

export class AuthService {
  static isLoggedin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "false");
    return user.accessToken ? true : false;
  };

  // --- ADD THIS FUNCTION ---
  static getToken = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      // The token is named accessToken in your user object
      return user.accessToken; 
    }
    // Return null if no user is logged in
    return null; 
  };
  // -------------------------

  static login = (email, password) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.login,
      data: { email, password },
    });
  };

  static resetPassword = (email, password) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.forgotPassword,
      data: { email, password },
    });
  };

  static setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  static logout = () => {
    localStorage.clear();
  };
}