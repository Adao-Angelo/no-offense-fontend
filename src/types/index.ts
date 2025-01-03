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
  userId?: UserType;
  publicationId: string;
  text: string;
};

export type CommentResponseType = DatabaseColumnType & {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  content: string;
};

export type PublicationType = DatabaseColumnType & {
  userId?: string;
  imageUrl?: string;
  imageDescription?: string;
  text: string;
};

export type ResponsePublicationType = DatabaseColumnType & {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  userId?: string;
  imageUrl?: string;
  imageDescription?: string;
  text: string;
};
