import {BottomTypes} from './Types';

export const DARK_MODE = 'dark';
export const LIGHT_MODE = 'light';

export const ADMIN_LABEL = 'admin';

export const POST_STATUS = {
  pending: 'pending',
  future: 'future',
  expired: 'expired',
  unpublished: 'unpublished',
  published: 'published',
};

export const CODE_POST_TYPE = 'code';
export const TEXT_POST_TYPE = 'text';

export const BUTTON_TYPES: Record<BottomTypes, BottomTypes> = {
  filled: 'filled',
  outlined: 'outlined',
  text: 'text',
};

export const POST_CONTENT_KEYS = {
  title: 'title',
  subtitle: 'subtitle',
  content_type: 'content_type',
  imageID: 'imageID',
  image: 'image',
  content: 'content',
};
