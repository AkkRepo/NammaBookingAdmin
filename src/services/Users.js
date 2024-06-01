import { ApiEndPoints, NetworkManager } from "../network";

export class UsersService {
  static getAllUsers = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.users,
    });
  };

  static addUsers = (name, email, password, roleId) => {
    console.log(name + " " + email + " " + password + " " + roleId);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.users,
      data: { ...name, ...email, ...password, ...roleId },
    });
  };

  static geUsersById = (id) => {
    console.log("Im here");
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.users + "/" + id,
      data: { ...id },
    });
  };

  static updateUsers = (name, email, password, roleId, id) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.users,
      data: { ...name, ...email, ...password, ...roleId, ...id },
    });
  };

  static deleteUsers = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.users + "/" + id,
      data: { ...id },
    });
  };
}
