import { Readable } from "stream";
import { ggdrive } from "@/libs/google/config";
import fileTable from "./table";
import { error } from "elysia";

const folders = JSON.parse(process.env.GGDRIVE_FOLDERS as string);

class FileService {
  static async list() {
    const fileList = await fileTable.find().lean().exec();
    return fileList;
  }

  static async upload(file: File, fileName: string, folder: string) {
    const duplicatedFile = await fileTable.findOne({ fileName }).lean().exec();
    if (duplicatedFile) throw error("Conflict");

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const { data } = await ggdrive.files.create({
      requestBody: {
        name: fileName,
        parents: [folders[folder]],
      },
      media: {
        body: stream,
        mimeType: file.type,
      },
    });

    await fileTable.create({
      fileId: data.id,
      fileName,
    });

    return fileName;
  }

  static async view(fileName: string) {
    const availableFile = await fileTable.findOne({ fileName }).lean().exec();
    if (!availableFile) throw error("Not Found");

    const { fileId } = availableFile;
    const { data } = await ggdrive.files.get(
      {
        fileId,
        alt: "media",
        fields: "mimeType",
      },
      {
        responseType: "stream",
      }
    );

    return data;
  }

  static async update(fileName: string, file: File) {
    const availableFile = await fileTable.findOne({ fileName }).lean().exec();
    if (!availableFile) throw error("Not Found");

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const { fileId } = availableFile;
    await ggdrive.files.update({
      fileId,
      media: {
        body: stream,
        mimeType: file.type,
      },
    });
  }

  static async delete(fileName: string) {
    const availableFile = await fileTable.findOne({ fileName }).lean().exec();
    if (!availableFile) throw error("Not Found");

    const { fileId } = availableFile;
    await ggdrive.files.delete({ fileId });

    await fileTable.deleteOne({ fileId });
  }
}

export default FileService;
