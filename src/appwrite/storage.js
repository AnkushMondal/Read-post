import config from "../config/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  // Upload File
  async uploadFile(file) {
    try {
      if (!file) {
        throw new Error("File is required");
      }

      return await this.storage.createFile(
        config.appwriteBucketId, //  bucket ID
        ID.unique(),             // auto generate file ID
        file
      );
    } catch (error) {
      console.log("Upload File Error:", error);
      throw error;
    }
  }

  // Delete File
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      );

      return true;
    } catch (error) {
      console.log("Delete File Error:", error);
      throw error;
    }
  }

  // (Optional) Get File Preview URL
  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      config.appwriteBucketId,
      fileId
    );
  }
}

const storageService = new StorageService();
export default storageService;
