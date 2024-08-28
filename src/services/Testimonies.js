import { ApiEndPoints, NetworkManager } from "../network";

export class TestimoniesServices {
  static getAllTestimonies = (page = 1, limit = 10, pages = 1) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getAllTestimonies,
      params: { page, pages, limit },
    });
  };
  static getTestimoniesById = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getTestimoniesById + id,
      data: { ...id },
    });
  };

  static addTestimonies = (name, testimony) => {
    console.log(name + " " + testimony);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addTestimonies,
      data: { ...name, ...testimony },
    });
  };
  static updateTestimonies = (id, name, testimony) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editTestimonies,
      data: { ...id, ...name, ...testimony },
    });
  };
  static deleteTestimonies = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteTestimony + id,
      data: { ...id },
    });
  };
}
