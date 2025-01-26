import Elysia, { t } from "elysia";
import FileService from "./service";

const fileApi = new Elysia({ prefix: "/file" })
  .post("/", ({ body: { file, ...data } }) => FileService.upload(file, data), {
    body: t.Object({
      fileName: t.String(),
      folderName: t.String(),
      file: t.File()
    }),
  })
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
