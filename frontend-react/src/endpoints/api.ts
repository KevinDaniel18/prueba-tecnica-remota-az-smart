import axios from "axios";

//reemplaza la URL http://192.168.1.11 por tu IP local
const instance = axios.create({ baseURL: "http://192.168.1.11:8000" });

export function getDevices() {
  return instance.get("/devices");
}

export function postDevice(devices: {
  id: number;
  name: string;
  status: string;
}) {
  return instance.post("/devices", devices);
}
