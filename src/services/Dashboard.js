import { ApiEndPoints, NetworkManager } from "../network";

export class DashboardService {
  static getDashboardCount = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.dashboardCount,
    });
  };
  static getDashboardLocation = () => {
    return NetworkManager.getInstance().appRequest({
      method: "get",
      url: ApiEndPoints.dashboardLocation,
    });
  };
}
