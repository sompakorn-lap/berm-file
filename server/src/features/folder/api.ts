import Elysia, { t } from "elysia";
import FolderService from "./service";

const folderApi = new Elysia({ prefix: "/folder" })
  .get("/list", () => FolderService.list())
  .post("/", ({ body }) => FolderService.create(body), {
    body: t.Object({
      folderId: t.String(),
      folderName: t.String(),
    }),
  })
  .delete("/:folderName", ({ params: { folderName } }) =>
    FolderService.delete(folderName)
  );

  export default folderApi;