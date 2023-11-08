import apiendpoins from "../constants/apiendpoins";
import { apiService } from "./common";

export const getFlats = () => {
  return apiService(apiendpoins.fetchFlats, "GET");
};

export const addFlat = (payload: any) => {
  return apiService(apiendpoins.addFlat, "POST", payload);
};

export const updateFlat = (payload: any) => {
  return apiService(apiendpoins.updateFlat, "PUT", payload);
};

export const deleteFlat = (id: any) => {
  return apiService(`${apiendpoins.deleteFlat}?id=${id}`, "DELETE");
};

export const removeAllotmentFlat = (id: any) => {
  return apiService(`${apiendpoins.removeAllotment}?flat_id=${id}`, "POST");
};

export const randomFlatAssignment = () => {
  return apiService(apiendpoins.flatsRandomAssignment, "POST");
};

export const assignFlatToUser = (paylod: any) => {
  return apiService(apiendpoins.assignFlatToUser, "PUT", paylod);
};

export const searchData = (data: any) => {
  return apiService(`${apiendpoins.searchData}?${data}`, "GET");
};

export const truncateFlats = () => {
  return apiService(`${apiendpoins.truncateFlats}`, "DELETE");
};

export const truncateFlatUserMapping = () => {
  return apiService(`${apiendpoins.truncateFlatUserMapping}`, "DELETE");
};
