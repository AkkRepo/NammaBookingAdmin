import { ApiEndPoints, NetworkManager } from "../network";

export class AmenitiesService {
  static getAllAmenities = () => {
    return fetch(`http://test.ekathvainnovations.com:9097/api/amenities/getAll`)
      .then((response) => response.json())
      .then((data) => setStay(data))
      .catch((error) => console.log(error));
  };
}
