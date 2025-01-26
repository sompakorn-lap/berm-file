import { model, Schema } from "mongoose";

const folderTable = model(
  "folder",
  new Schema<{
    folderId: string;
    folderName: string;
  }>({
    folderId: {
      type: String,
      require: true,
      unique: true,
    },
    folderName: {
      type: String,
      require: true,
      unique: true,
    },
  })
);

export default folderTable;
