import {Asset} from 'react-native-image-picker';

export interface Sizes {
  extra_extra_small: number;
  extra_small: number;
  small: number;
  medium: number;
  large: number;
  extra_large: number;
  extra_extra_large: number;
}

export interface Colors {
  background_color: string;
  text_color: string;
  headers: string;
  button_text: string;
  button_background: string;
  button_border: string;
  button_disabled: string;
  links: string;
  accent_color: string;
}
export interface Theme {
  sizes: Sizes;
  colors: Colors;
}
export type ThemeMode = 'light' | 'dark';

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
