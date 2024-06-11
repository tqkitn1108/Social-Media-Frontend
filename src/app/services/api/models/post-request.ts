export interface PostRequest {
  id?: number;
  status?: string;
  content?: string;
  mediaIds?: Array<number>;
  ownerId?: string;
}