import Status from '../../components/post/enum/PostStatusEnum';

export interface Post {
  $id?: string;
  title: string;
  status?: Status;
  category: string[];
  uploadedBy?: string;
  contents: string[];
  shareUrl?: URL;
  likes?: number;
  githubUrl?: URL;
  tldr?: string;
  videoUrl?: URL;
  $createdAt?: string;
}
