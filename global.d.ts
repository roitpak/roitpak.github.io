declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_PROJECT_ID: string;
    REACT_APP_ENDPOINT: string;
    REACT_APP_POSTS_DATABASE: string;
    REACT_APP_POSTS_COLLECTION: string;
    REACT_APP_POSTS_BUCKET: string;
  }
}
