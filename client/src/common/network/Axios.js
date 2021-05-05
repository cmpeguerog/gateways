import Axios from "axios-observable";

export const url = `${window.location.protocol}//${`${
  window.location.hostname
}:3000/api/v1/`.replace("//", "/")}`;

const axios = Axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios;
