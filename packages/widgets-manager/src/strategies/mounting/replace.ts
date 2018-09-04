import { App, AddAppsStrategy } from "../../types";

export class ReplaceAppStrategy implements AddAppsStrategy {
  public add(app: App): App[] {
    const newApps = [app];
    return newApps;
  }
}