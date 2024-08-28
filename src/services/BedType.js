import { ApiEndPoints, NetworkManager } from "../network";

export class BedTypeServices {
  static getAllBedTypes = (page = 1, limit = 10, pages = 3) => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.getAllBedType,
      params: { page, pages, limit },
    });
  };

  static updateBedType = (id, bedType) => {
    return NetworkManager.getInstance().appRequest({
      method: "put",
      url: ApiEndPoints.editBedType,
      data: { ...id, ...bedType },
    });
  };

  static deleteBedType = (id) => {
    return NetworkManager.getInstance().appRequest({
      method: "delete",
      url: ApiEndPoints.deleteBedType + "/" + id,
      data: { ...id },
    });
  };

  static addBedType = (bedType) => {
    console.log(bedType);
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.addBedType,
      data: { ...bedType },
    });
  };
}
