export interface Post {
  $id?: string;
  title: string;
  slug: string;
  featuredImage?: string;
  status?: string;
  category: string[];
  uploadedBy?: string;
  content?: string[];
}
