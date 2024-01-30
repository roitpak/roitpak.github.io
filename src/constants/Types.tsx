import {Asset} from 'react-native-image-picker';

export interface User {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: [string];
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: {};
  registration: string;
  status: boolean;
}

export interface PostContent {
  title: string;
  subtitle: string;
  content_type: 'code' | 'text';
  image_id?: string;
  image?: File | Asset | null | undefined;
  content: string;
  postID: string;
}
