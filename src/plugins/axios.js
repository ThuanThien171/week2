import axios from "axios";

export default axios.create({
  baseURL: `https://thienproject-2a65d-default-rtdb.asia-southeast1.firebasedatabase.app/`,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
  },
});


