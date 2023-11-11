export interface SignupFields {
  fullname: string | undefined;
  email: string | undefined;
  password: string | undefined;
}
export type  FetchErrorResponse = {
  error: boolean;
  [x: string]: any;
};
