import Elysia from "elysia";
import fileApi from "./features/file/api";

const api = new Elysia({ prefix: "/api" }).use(fileApi);
export default api;
