import { ApiEndPoints, NetworkManager } from "../network";

export class CategoriesService {
  static getAllCategories = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.categories + "/getAll",
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
}
