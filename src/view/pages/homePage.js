import header from "../layouts/header";

class homePage {
   constructor() {

   };

   createHeader() {

      const rootElement = document.querySelector("#root");
      rootElement.innerHTML += header();
      return rootElement;
      
   }


}

export default homePage;