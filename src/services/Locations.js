import { ApiEndPoints, NetworkManager } from "../network";

export class LocationsService {
  static getAllLocations = (page = 1, limit = 10, pages = 1) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getLocation,
      params: { page, pages, limit },
    });
  };

  static addLocations = (location, imageUrl) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.adminAddLocation,
      data: { ...location, ...imageUrl },
    });
  };

  static deleteLocations = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteLocation + id,
      data: { ...id },
    });
  };
  static getLocationsById = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getLocationById + id,
      data: { ...id },
    });
  };
  static updateLocations = (id, location, imageUrl) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.updateLocation,
      data: { ...id, ...location, ...imageUrl },
    });
  };
  static addAddMoreInfoData = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addNewReadMoreDetails,
      data: data,
    });
  };
  static updateReadMoreDetails = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.updateReadMoreDetails,
      data: data,
    });
  };
  static deleteReadMore = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteReadMore + id,
      data: { ...id },
    });
  };
}
