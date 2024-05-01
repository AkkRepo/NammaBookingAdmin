import { ApiEndPoints, NetworkManager } from "../network";

export class AuthService {
  static isLoggedin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "false");
    return user.accessToken ? true : false;
  };
  static login = (email, password) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.login,
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
