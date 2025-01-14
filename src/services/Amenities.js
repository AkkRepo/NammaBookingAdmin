import { ApiEndPoints, NetworkManager } from "../network";

export class AmenitiesService {
  static getAllAmenities = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.amenities + "/getAll",
    });
  };
  static addAmenities = (amenity) => {
    return NetworkManager.getInstance().appRequest({
      method: "post",
      url: ApiEndPoints.amenities + "/add",
      data: { ...amenity },
    });
  };
}
