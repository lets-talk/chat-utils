export class SDK {

  /**
   * openApp
   * @param appNamespace The app namespace to execute the open
   */
  public openApp(appNamespace: string): Promise<any> {
    return new Promise((resolve) => resolve({}));
  }
  /**
   * closeApp
   * @param appNamespace The app namespace to execute the close
   */
  public closeApp(appNamespace: string): Promise<any> {
    return new Promise((resolve) => resolve({}));
  }
  /**
   * ExecuteAppMethod
   * @param appNamespace The app namespace to execute the executeAppMethod
   * @param data The data we want to pass to the function as arguments
   */
  public executeAppMethod(appNamespace: string, method: string, data: any): Promise<any> {
    return new Promise((resolve) => resolve(data));
  }
}