import Elysia from "elysia";
import fileApi from "./features/file/api";
import folderApi from "./features/folder/api";

const api = new Elysia({ prefix: "/api" }).use(fileApi).use(folderApi);
export default api;
