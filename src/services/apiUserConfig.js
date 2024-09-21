// This is configuration of api admin account

import axios from "axios";

const urlAuthUsers = "https://my-json-server.typicode.com/bunwg29/PRACTICE-JS/auth_users";
//https://my-json-server.typicode.com/bunwg29/PRACTICE-JS/auth_users
//http://localhost:3000/auth_users

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