import { ApiEndPoints, NetworkManager } from "../network";

export class UsersService {
  static getAllUsers = (page = 1, limit = 10, pages = 1) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.users,
      params: { page, pages, limit },
    });
  };

  static addUsers = (name, email, password, roleId) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.users,
      data: { ...name, ...email, ...password, ...roleId },
    });
  };

  static geUsersById = (id) => {
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
