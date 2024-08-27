import { getAllUser } from "../services/processApi.js";

const renderUser = async () => {
  try {
    const users = await getAllUser();

    const divElements = users.map(user => `
      <div>
        ${user.firstname}
      </div>
    `);

    // Trả về chuỗi div từ hàm
    return divElements.join("");

  } catch (error) {
    console.error("Error when get data", error);

    return "Get error";
  }
};

export default { renderUser };