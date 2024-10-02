// This is configuration of api interface data

import axios from "axios";
import { API_ENDPOINTS } from "./config.js";


async function getApi (url) {

   try {

      const response = await axios.get(url);
      return response.data;

   } catch (error) {

      console.log(error);
      throw error;

   }

}
export default axios.create({
   baseURL: API_ENDPOINTS.USER_DATA
});

export {getApi};
