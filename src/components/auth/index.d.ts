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
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export interface Index {
  index: number
}
