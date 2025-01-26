import { Readable } from "stream";
import { ggdrive } from "@/libs/google/config";
import fileTable from "./table";
import { error } from "elysia";
import folderTable from "../folder/table";

class FileService {
  static async list() {
    const fileList = await fileTable.find().lean().exec();
    return fileList;
  }

  static async upload(
    file: File,
    uploadData: {
      fileName: string;
      folderName: string;
    }
  ) {
    const { fileName, folderName } = uploadData;

    const duplicatedFile = await fileTable.findOne({ fileName }).lean().exec();
    if (duplicatedFile) throw error("Conflict");

    const availableFolder = await folderTable.findOne({ folderName }).lean().exec();
    if(!availableFolder) throw error("Not Found");

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const { folderId } = availableFolder;
    const { data } = await ggdrive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        body: stream,
        mimeType: file.type,
      },
    });

    await fileTable.create({
      fileId: data.id,
      ...uploadData,
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

    await fileTable.findOneAndDelete({ fileId }).lean().exec();
  }
}

export default FileService;
