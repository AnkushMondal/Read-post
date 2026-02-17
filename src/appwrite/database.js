import config from "../config/config";
import { Client, ID, TablesDB,Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  database;


  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.database = new TablesDB(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {//slug is the id
    try {
      return await this.database.createRow(
        config.appwriteDatabaseId,
        config.appwriteTablesId,
        slug, // row ID
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log("Create Post Error:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateRow(
        config.appwriteDatabaseId,
        config.appwriteTablesId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Update Post Error:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteRow(
        config.appwriteDatabaseId,
        config.appwriteTablesId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Delete Post Error:", error);
      throw error;
      
    }
  }
  async getPost(slug) {
    try {
      return await this.database.getRow(
        config.appwriteDatabaseId,
        config.appwriteTablesId,
        slug,
      );
    } catch (error) {
      console.log("Get Post Error:", error);
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listRows(
        config.appwriteDatabaseId,
        config.appwriteTablesId,
        queries,
      );
    } catch (error) {
      console.log("Get Posts Error:", error);
      throw error;
    }
  }
}

  const databaseService = new DatabaseService();

  export default databaseService;


