import { DatabaseColumnType } from "./common.types";

export type UserType = Omit<DatabaseColumnType, "state"> & {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type CommentType = DatabaseColumnType & {
  user: UserType;
  content: string;
};

export type PublicationType = DatabaseColumnType & {
  user: UserType;
  image: string;
  comments: CommentType[];
  likes: number;
  shares: number;
};