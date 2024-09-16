export type AvatarType = {
  fullName?: string | null | undefined;
  image?: string | null | undefined;
};

export type UserContentType = {
  [key: PropertyKey]: string | null | undefined;
};
