import { ApiEndPoints, NetworkManager } from "../network";

export class TestimoniesServices {
  // List (server-side pagination supported by your API)
  static getAllTestimonies = (page = 1, limit = 10, pages = 1) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getAllTestimonies,
      params: { page, pages, limit },
    });
  };

  // Get by ID (no body for GET)
  static getTestimoniesById = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getTestimoniesById + id,
    });
  };

  // Add (accepts single payload object: { name, testimony, ... })
  static addTestimonies = (payload) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addTestimonies,
      data: { ...payload },
    });
  };

  // Update (accepts single payload object: { id, name, testimony, ... })
  static updateTestimonies = (payload) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editTestimonies,
      data: { ...payload },
    });
  };

  // Delete by ID
  static deleteTestimonies = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteTestimony + id,
    });
  };

  // NEW: Approve by ID
  static approveTestimony = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.approveTestimony + id,
    });
  };

  // NEW: Reject by ID
  static rejectTestimony = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.rejectTestimony + id,
    });
  };
}
