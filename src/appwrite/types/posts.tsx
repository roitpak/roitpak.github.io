export interface Post {
  $id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: File;
  status: string;
  userId: string;
  category: string[];
  tags: string[];
  date: string;
  shareUrl: string;
  comments?: [];
  tldr: string;
  likes?: number;
  githubUrl?: string;
  videoUrl?: string;
  uploadedBy: string;
}
