export interface CommentRequest {
  id?: number;
  content?: string;
  mediaIds?: number[];
  postId?: number;
  userId?: string;
}