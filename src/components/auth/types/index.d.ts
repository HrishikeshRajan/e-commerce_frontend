/**
 *  Represents the input fields required for user registration
 */
export interface SignupProps {
  fullname: string
  email: string
  password: string
}

export interface SigninProps extends Omit<SignupProps, 'fullname'> {}
/**
 * Use to type the fetch api response for formik status
 */
type Status = { success:true, message:string } | { success:false, message:string };
