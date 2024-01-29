export interface Post {
  $id?: string;
  title: string;
  status?: string;
  category: string[];
  uploadedBy?: string;
  contents: string[];
  shareUrl?: URL;
  likes?: number;
  githubUrl?: URL;
  tldr?: string;
  videoUrl?: URL;
}
