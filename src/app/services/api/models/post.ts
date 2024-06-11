import { Profile } from "./profile";

export interface Post {
  id?: number;
  content?: string;
  reacted?: boolean;
  medias?: any[];
  createdAt?: Date;
  lastModifiedAt?: Date;
  reactsCount?: number;
  commentsCount?: number;
  user?: Profile;
}