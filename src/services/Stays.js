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
  static addAccomodationTypes = (data) => {
    console.log(data);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addAccomodationTypes,
      data: data,
    });
  };
  static addAmenity = (data) => {
    console.log(data);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addAmenity,
      data: data,
    });
  };
  static addActivity = (data) => {
    console.log(data);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addActivity,
      data: data,
    });
  };
  static addFacility = (data) => {
    console.log(data);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addFacility,
      data: data,
    });
  };
  static addNearByPlaces = (data) => {
    console.log(data);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addNearByPlaces,
      data: data,
    });
  };
  static addImage = (data) => {
    console.log(data);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addImage,
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
  static deleteAmenity = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteAmenity + id,
      data: { ...id },
    });
  };
  static deleteActivity = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteActivity + id,
      data: { ...id },
    });
  };
  static deleteFacility = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteFacility + id,
      data: { ...id },
    });
  };
  static deleteNearByPlaces = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteNearByPlaces + id,
      data: { ...id },
    });
  };
  static deleteAccomodationTypes = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteAccomodationTypes + id,
      data: { ...id },
    });
  };
  static deleteImage = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteImage + id,
      data: { ...id },
    });
  };

  static updateBasicDetails = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editBasicDetails,
      data: data,
    });
  };
  static updateHousePolicy = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editHousePolicy,
      data: data,
    });
  };
  static updateAmenity = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editAmenity,
      data: data,
    });
  };
  static updateActivity = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editActivity,
      data: data,
    });
  };
  static updateFacility = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editFacility,
      data: data,
    });
  };
  static updateNearByPlaces = (data) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editNearByPlaces,
      data: data,
    });
  };
}
