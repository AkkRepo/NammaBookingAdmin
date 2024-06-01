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
}
