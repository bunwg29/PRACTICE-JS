import axios from "axios";


async function getApi (url) {

   try {

      const response = await axios.get(url);
      return response.data;

   } catch (error) {

      console.log(error);
      throw error;

   }

}

export {getApi};
