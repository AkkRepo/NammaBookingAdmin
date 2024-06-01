import { ApiEndPoints, NetworkManager } from "../network";

export class LocationsService {
  static getAllLocations = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.locations + "/getAll",
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
}
