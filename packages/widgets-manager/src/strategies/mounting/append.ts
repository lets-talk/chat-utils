import { App, AddAppsStrategy } from "../../types";

export class AppendAppStrategy implements AddAppsStrategy {
  public add(app: App, apps: App[]): App[] {
    const newApps = [...apps, app];
    return newApps;
  }
}
