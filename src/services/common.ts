import { getCookie } from "../utils";

export const API_HOST = "https://dldausnagar.com/api";

export const apiService = async (
  endpoint: string,
  method: string,
  body?: any
) => {
  const payload: any = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  };
  if (body) {
    payload.body = JSON.stringify(body);
  }
  const response = await fetch(`${API_HOST}${endpoint}`, payload);
  return response.json();
};
