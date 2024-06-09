export interface PostRequest {
  id?: string;
  status?: string;
  content?: string;
  mediaIds?: Array<number>;
  ownerId?: string;
}