import { PermissionsAndroid } from "react-native";

export const requestNativeStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("Storage permission granted");
      return true;
    } else {
      console.warn("Storage permission denied");
      return false;
    }
  } catch (err) {
    console.error("Permission request error:", err);
    return false;
  }
};
