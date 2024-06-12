export interface Profile {
  id?: string;
  fullName?: string;
  avatarUrl?: string;
  friendsCount?: number;
  followersCount?: number;
  followingsCount?: number;
  follower?: boolean;
  following?: boolean;
  friend?: boolean;
}