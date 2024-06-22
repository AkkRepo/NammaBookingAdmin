import { ApiEndPoints, NetworkManager } from "../network";

export class StaysService {
  static addStays = (data) => {
    console.log(data);
    //console.log(name + " " + email + " " + password + " " + roleId);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.stays,
      data: data,
    });
  };
  static getAllStays = (page = 1, limit = 10, pages = 3) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.allStay,
      params: { page, pages, limit },
    });
  };
  static getStaysById = (id) => {
    //console.log("Im here");
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.stayById + "/" + id,
      data: { ...id },
    });
  };
  static deleteStays = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteStay + id,
      data: { ...id },
    });
  };
}
