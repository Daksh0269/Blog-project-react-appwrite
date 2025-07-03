import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class AppwriteService {
    client = new Client();
    Databases;
    bucket;

    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID

        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        console.log({ title, slug, content, featuredImage, status, userId });
        try {
            return this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        }
        catch (error) {
            console.error("Error creating post:", error);

        }
    }

    async updateDocument(slug, { title, content, featuredImage, status }) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        }
        catch (error) {
            console.error("Error updating document:", error);
        }


    }
    async getPosts() {
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status', ['public','Active'])
                   
                ]
            );

        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    async getPost(slug) {
    try {
        return await this.Databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

    // file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
    // delete file service

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId

            )
            return true
        } catch (error) {
            console.error("Error deleting file:", error);
            return false
        }

    }
// delete post method
async deletePost(postId) {
    try {
        return await this.Databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            postId
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
}
    // get file preview 

    async getFilePreview(fileId) {
        return await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
            300, // width
            300, // height
        )
    }
    async getFileview(fileId) {
        return this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    );
    }
    // Save a post
async savePost(userId, postId) {
  return this.Databases.createDocument(
    conf.appwriteDatabaseId,
    conf.appwriteSavedCollectionId,
    ID.unique(),
    { userId, postId }
  );
}

// Get saved posts for a user
async getSavedPosts(userId) {
  return this.Databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteSavedCollectionId,
    [Query.equal("userId", userId)]
  );
}

// Delete a saved post (pass saved document ID)
async deleteSavedPost(docId) {
  return this.Databases.deleteDocument(
    conf.appwriteDatabaseId,
    conf.appwriteSavedCollectionId,
    docId
  );
}
    
}


const Service = new AppwriteService();

export default Service