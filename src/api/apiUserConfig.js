// This is configuration of api admin account

import axios from "axios";

const urlAuthUsers = "https://js-server-pr.onrender.com/auth_users";

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
  baseURL: urlAuthUsers,
});

export { getAuthUser };