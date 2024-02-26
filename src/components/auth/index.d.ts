/**
 *  Represents the input fields required for user registration
 */
export interface SignupProps {
  fullname: string
  email: string
  password: string
}
export type FetchErrorResponse = {
  error: boolean
  [x: string]: any
};

export type ProtectedRouteProps = {
  authenticationPath: string
  outlet: JSX.Element
};

export type IsLoggedIn = {
  outlet: JSX.Element
};

export interface Index {
  index: number
}

/**
 * Use to type the fetch api response for formik status
 */
type Status = { success:true, message:string } | { success:false, message:string };
