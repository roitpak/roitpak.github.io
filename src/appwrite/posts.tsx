import {Client, Databases, Storage, Query, ID} from 'appwrite';
import {Post} from './types/posts';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const myConfig = Platform.OS === 'web' ? process.env : Config;

export class PostService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(myConfig.REACT_APP_ENDPOINT)
      .setProject(myConfig.REACT_APP_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_COLLECTION,
        slug,
      );
    } catch (error) {
      console.log('Appwrite service :: getPost() :: ', error);
      return false;
    }
  }
  async getPostData(slug: string) {
    try {
      return await this.databases.getDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_DATA_COLLECTION,
        slug,
      );
    } catch (error) {
      console.log('Appwrite service :: getPost() :: ', error);
      return false;
    }
  }

  async getPosts(
    queries = [
      Query.equal('status', 'published'),
      Query.limit(10),
      Query.offset(0),
    ],
  ) {
    try {
      const response = await this.databases.listDocuments(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_COLLECTION,
        queries,
      );
      // to suppress typescript error
      const posts: Post[] = (response?.documents as unknown as Post[]) || [];
      return posts;
    } catch (error) {
      console.log('Appwrite service :: getPosts() :: ', error);
      return false;
    }
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    category,
    tags,
    date,
    shareUrl,
    tldr,
    githubUrl,
    videoUrl,
    uploadedBy,
  }: Post) {
    try {
      return await this.databases.createDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_COLLECTION,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          category,
          tags,
          date,
          shareUrl,
          tldr,
          githubUrl,
          videoUrl,
          uploadedBy,
        },
      );
    } catch (error) {
      console.log('Appwrite service :: createPost() :: ', error);
      return false;
    }
  }

  async updatePost(
    slug: string,
    {title, content, featuredImage, status}: Post,
  ) {
    try {
      return await this.databases.updateDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_COLLECTION,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log('Appwrite service :: updateDocument() :: ', error);
      return false;
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_DATABASE,
        slug,
      );
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteDocument() :: ', error);
      return false;
    }
  }

  // storage service

  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        myConfig.REACT_APP_POSTS_BUCKET,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log('Appwrite service :: uploadFile() :: ', error);
      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      return await this.bucket.deleteFile(
        myConfig.REACT_APP_POSTS_BUCKET,
        fileId,
      );
    } catch (error) {
      console.log('Appwrite service :: deleteFile() :: ', error);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(myConfig.REACT_APP_POSTS_BUCKET, fileId)
      .href;
  }
}

const postService = new PostService();
export default postService;
