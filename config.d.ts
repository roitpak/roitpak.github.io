declare module 'react-native-config' {
  export interface NativeConfig {
    PROJECT_ID: string;
    ENDPOINT: string;
    POSTS_DATABASE: string;
    POSTS_COLLECTION: string;
    POSTS_BUCKET: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
