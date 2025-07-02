import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { JwtPayload } from "jwt-decode";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

// get user info from local storage
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const decodedData: JwtPayload = decodedToken(authToken);
    return decodedData;
  }
};

// remove user info from local storage
export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
