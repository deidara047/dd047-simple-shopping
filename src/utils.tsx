import * as Realm from "realm-web";

const REALM_APP_ID = "devicesync-cgspw"; // e.g. myapp-abcde
export const realmApp = new Realm.App({ id: REALM_APP_ID });