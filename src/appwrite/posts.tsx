import {Client, Databases, Storage, Query, ID} from 'appwrite';
import {Post} from './types/posts';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';

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
      throw error;
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
      throw error;
    }
  }

  async getPosts(isAdmin?: boolean) {
    const queries = isAdmin
      ? [Query.limit(10), Query.offset(0)]
      : [Query.equal('status', 'published'), Query.limit(10), Query.offset(0)];
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
      throw error;
    }
  }

  async createPost(data: Post) {
    try {
      // if (featuredImage instanceof File) {
      //   await this.uploadFile(featuredImage)
      //     .then(response => {
      //       if (typeof response === 'object' && '$id' in response) {
      //         imageID = response?.$id;
      //       }
      //     })
      //     .catch(err => {
      //       throw err;
      //     });
      // }
      return await this.databases.createDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_POSTS_COLLECTION,
        data?.slug,
        data,
      );
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  // storage service

  async uploadFile(file: File | Asset | null | undefined) {
    if (!file) {
      throw new Error('File not found');
    }
    if (file instanceof File) {
      try {
        return await this.bucket.createFile(
          myConfig.REACT_APP_POSTS_BUCKET,
          ID.unique(),
          file,
        );
      } catch (error) {
        throw error;
      }
      // } else if (file.uri && file.fileName && file.type) {
      //   let filename = file.uri.split('/').pop();

      //   // Infer the type of the image
      //   let match = /\.(\w+)$/.exec(file.uri);
      //   let type = match ? `image/${match[1]}` : 'image';

      //   console.log('_--------------------------------------_', {
      //     uri: file.uri,
      //     name: filename,
      //     type,
      //   });
      //   let formData = new FormData();
      //   formData.append('fileId', 'unique()');
      //   formData.append('file', {
      //     uri: file.uri,
      //     name: filename,
      //     type,
      //   });

      //   console.log('formData', formData);
      //   try {
      //     console.log(' I am here and posting--->');
      //     const response = await fetch(
      //       `${myConfig.REACT_APP_ENDPOINT}/storage/buckets/${myConfig.REACT_APP_POSTS_BUCKET}/files/`,
      //       {
      //         method: 'POST',
      //         headers: {
      //           'content-type': 'multipart/form-data',
      //           'X-Appwrite-Project': myConfig.REACT_APP_PROJECT_ID,
      //           'x-sdk-version': 'appwrite:web:10.2.0',
      //         },
      //         body: formData,
      //         credentials: 'include',
      //       },
      //     );
      //     console.log('Response--->>', response);
      //   } catch (e) {
      //     console.log('Error--->', e);
      //   }
    }
  }

  async deleteFile(fileId: string) {
    try {
      return await this.bucket.deleteFile(
        myConfig.REACT_APP_POSTS_BUCKET,
        fileId,
      );
    } catch (error) {
      throw false;
    }
  }

  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(myConfig.REACT_APP_POSTS_BUCKET, fileId)
      .href;
  }
}

const postService = new PostService();
export default postService;
