import axios from "axios";

const sendContactUsMessage = async (form) => {
  return axios.post("https://shopino.iran.liara.run/v1/contact-us/", form);
};

export default sendContactUsMessage;
