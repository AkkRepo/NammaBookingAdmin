import { redirectDocument } from "react-router-dom";
import { ApiEndPoints, NetworkManager } from "../network";

export class CategoriesService {
  static getAllCategories = (page = 1, limit = 10, pages = 1) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.categories + "/getAll",
      params: { page, pages, limit },
    });
  };

  static addCategories = (category, imageUrl) => {
    console.log(category + " " + imageUrl);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.categories + "/admin/add",
      data: { ...category, ...imageUrl },
    });
  };

  static deleteCategory = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.categoriesDelete + "/" + id,
      data: { ...id },
    });
  };

  static getCategoriesById = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.categories + "/admin" + id,
      data: { ...id },
    });
  };

  static updateCategories = (id, category, imageUrl) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.categories + "/admin/update",
      data: { ...id, ...category, ...imageUrl },
    });
  };
}
