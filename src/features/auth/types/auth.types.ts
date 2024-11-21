export type LoginDataDef = {
  email: string;
  password: string;
};

export type FromValue = {
  email: string;
  password: string;
};

export type RegisterFromValue = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  mobile: string;
};

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  isBlocked: boolean;
  mobile: string;
};

export type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  cartItemLength: number;
  wishlistItemLength: number;
  userInfo: User | null;
  userId: string;
};
