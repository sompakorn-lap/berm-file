import { valibotResolver } from "@hookform/resolvers/valibot";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const fileSchema = v.object({
  fileName: v.pipe(v.string(), v.minLength(1, "fileName is required.")),
  folderName: v.pipe(v.string(), v.minLength(1, "folderName is required.")),
  file: v.pipe(
    v.instance(FileList),
    v.transform((files) => files[0])
  ),
});

type FileType = v.InferOutput<typeof fileSchema>;

function FileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FileType>({
    resolver: valibotResolver(fileSchema),
  });

  async function uploadFile(data: FileType) {
    const formData = Object.entries(data).reduce(
      (res, [key, value]) => (res.append(key, value), res),
      new FormData()
    );

    await axios.post("/api/file", formData);

    reset();
  }

  return (
    <form onSubmit={handleSubmit(uploadFile)}>
      <div>
        <label>fileName</label>
        <input type="text" {...register("fileName")} />
        <span>{errors.fileName?.message}</span>
      </div>
      <div>
        <label>folderName</label>
        <input type="text" {...register("folderName")} />
        <span>{errors.folderName?.message}</span>
      </div>
      <div>
        <label>file</label>
        <input type="file" {...register("file")} />
        <span>{errors.file?.message}</span>
      </div>

      <button type="submit">submit</button>
    </form>
  );
}

export default FileForm;
