// This is configuration of api admin account

import axios from "axios";

import { API_ENDPOINTS } from "./config.js";

async function getAuthUser(url) {
  try {

    const response = await axios.get(url);
    return response.data;

  } catch (error) {

    console.log(error);
    throw error;

  }
}

export const authUsersApi = axios.create({
  baseURL: API_ENDPOINTS.AUTH_USERS
});

export { getAuthUser };