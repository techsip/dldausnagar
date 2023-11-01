import apiendpoins from "../constants/apiendpoins";
import { apiService } from "./common";

export const getAdmins = () => {
  return apiService(apiendpoins.fetchAdmins, "GET");
};

export const addAdmin = (payload: any) => {
  return apiService(apiendpoins.addAdmin, "POST", payload);
};

export const updateAdmin = (payload: any) => {
  return apiService(apiendpoins.updateAdmin, "PUT", payload);
};

export const deleteAdmin = (payload: any) => {
  return apiService(apiendpoins.deleteAdmin, "DELETE", payload);
};
