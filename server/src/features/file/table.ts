import { model, Schema } from "mongoose";

const fileTable = model(
  "file",
  new Schema<{
    fileId: string;
    fileName: string;
    folderName: string;
  }>({
    fileId: {
      type: String,
      require: true,
      unique: true,
    },
    fileName: {
      type: String,
      require: true,
      unique: true,
    },
    folderName: {
      type: String,
      require: true,
    },
  })
);

export default fileTable;
