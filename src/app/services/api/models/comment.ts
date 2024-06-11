import { Media } from "./media";
import { Profile } from "./profile";

export interface Comment {
  id?: number;
  content?: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
  medias?: Array<Media>;
  postId?: number;
  user?: Profile
}