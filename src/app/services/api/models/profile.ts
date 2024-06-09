export interface Profile {
  id?: string;
  fullName?: string;
  avatarUrl?: string;
  friendsCount?: number;
  followersCount?: number;
  followingsCount?: number;
  isFollower?: boolean;
  isFollowing?: boolean;
  isFriend?: boolean;
}