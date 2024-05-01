import { ApiEndPoints, NetworkManager } from "../network";

export class AmenitiesService {
  static getAllAmenities = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.amenities,
    });
  };
}
