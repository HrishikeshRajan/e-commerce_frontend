export interface SignupFields {
  fullname: string | undefined;
  email: string | undefined;
  password: string | undefined;
}
export type FetchErrorResponse = {
  error: boolean;
  [x: string]: any;
};

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export type IsLoggedIn = {
  outlet: JSX.Element;
};

export interface Index {
  index: number
}
