export type CommentType = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
    image: string;
  };
};
