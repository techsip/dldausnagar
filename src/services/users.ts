import apiendpoins from "../constants/apiendpoins";
import { apiService } from "./common";

export const getUsers = () => {
  return apiService(apiendpoins.fetchUsers, "GET");
};

export const addUser = (payload: any) => {
  return apiService(apiendpoins.addUser, "POST", payload);
};

export const updateUser = (payload: any) => {
  return apiService(apiendpoins.updateUser, "PUT", payload);
};

export const deleteUser = (id: string) => {
  return apiService(`${apiendpoins.deleteUser}?id=${id}`, "DELETE");
};

export const truncateUsers = () => {
  return apiService(`${apiendpoins.truncateUsers}`, "DELETE");
};
