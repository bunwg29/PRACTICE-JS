import axios from "axios";

const urlAPI = "http://localhost:3000/user_data";

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
   baseURL: urlAPI
});

export {getApi};
