import Elysia, { t } from "elysia";
import FileService from "./service";

const fileApi = new Elysia({ prefix: "/file" })
  .post(
    "/",
    ({ body: { file, fileName, folder } }) =>
      FileService.upload(file, fileName, folder),
    {
      body: t.Object({
        file: t.File(),
        fileName: t.String(),
        folder: t.String(),
      }),
    }
  )
  .get("/:fileName", ({ params: { fileName } }) => FileService.view(fileName))
  .patch(
    "/:fileName",
    ({ body: { file }, params: { fileName } }) =>
      FileService.update(fileName, file),
    {
      body: t.Object({
        file: t.File(),
      }),
    }
  )
  .delete("/:fileName", ({ params: { fileName } }) =>
    FileService.delete(fileName)
  )

  .get("/list", () => FileService.list());
export default fileApi;
