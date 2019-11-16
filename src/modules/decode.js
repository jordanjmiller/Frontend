//import { decode } from "./components/modules/decode";

const jwtDecode = require('jwt-decode');

export const decode = (token) => jwtDecode(token);