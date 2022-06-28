import axios from "axios";
const baseUrl = "/api/users";
const signup = async (data) => {
  const response = await axios.post(baseUrl, data);
  console.log(response.data);
  return response.data;
};
export default { signup };
