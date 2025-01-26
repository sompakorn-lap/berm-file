import folderTable from "./table";
import { error } from "elysia";

class FolderService {
  static async create(data: { folderId: string; folderName: string }){
    const { folderName } = data;
    
    const duplicateFolder = await folderTable.findOne({ folderName }).lean().exec();
    if(duplicateFolder) throw error("Conflict");

    await folderTable.create(data);
  }

  static async delete(folderName: string){
    const availableFolder = await folderTable.findOne({ folderName }).lean().exec();
    if (!availableFolder) throw error("Not Found");

    await folderTable.findOneAndDelete({ folderName }).lean().exec();
  }

  static async find(folderName: string){
    const availableFolder = await folderTable.findOne({ folderName }).lean().exec();
    if(!availableFolder) throw error("Not Found");

    return availableFolder;
  }

  static async list(){
    const folderList = await folderTable.find().lean().exec();
    return folderList;
  }
}

export default FolderService;
