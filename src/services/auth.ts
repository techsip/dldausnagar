import apiendpoins from "../constants/apiendpoins";
import { apiService } from "./common";

export const login = (body: any) => {
  return apiService(apiendpoins.login, "POST", body);
};

export const checkAuthorisation = () => {
  return apiService(apiendpoins.authorised, "GET");
};
