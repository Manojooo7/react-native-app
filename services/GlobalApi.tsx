import axios from "axios";

const APIEKEY = process.env.EXPO_PUBLIC_STRAPI_API_KEY;
if (!APIEKEY) {
  console.log("APIKEY NOT CONFIGURED");
}

export const axiosClinet = axios.create({
  baseURL: "http://192.168.0.104:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${APIEKEY}`,
  },
});
