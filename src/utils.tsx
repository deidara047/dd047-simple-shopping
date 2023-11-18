import * as Realm from "realm-web";

const REALM_APP_ID = "devicesync-cgspw"; // e.g. myapp-abcde
export const realmApp = new Realm.App({ id: REALM_APP_ID });
export const appUrl = "http://localhost:3000";
export type ConfirmResult = "pending" | "success" | "error";
export function capitalizeFirstLetter(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}