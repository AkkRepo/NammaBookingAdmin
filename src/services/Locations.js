import { ApiEndPoints, NetworkManager } from "../network";

export class LocationsService {
  static getAllLocations = (page = 1, limit = 10, pages = 1) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.locations + "/getAll",
      params: { page, pages, limit },
    });
  };

  static addLocations = (location, imageUrl) => {
    console.log(location + " " + imageUrl);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.adminAddLocation,
      data: { ...location, ...imageUrl },
    });
  };

  static deleteLocations = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.locations + "/admin/delete/" + id,
      data: { ...id },
    });
  };
  static updateLocations = (id, location, imageUrl) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.locations + "/admin/update",
      data: { ...id, ...location, ...imageUrl },
    });
  };
}
