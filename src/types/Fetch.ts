/**
 *  Author : Hrishikesh Rajan
 *
 *  Type predicates for Fetch API
 */

export interface IResponse {
  statuCode: number;
  success: boolean;
}
export type ErrorMessage = { error: boolean; message: string };

export interface SuccessResponse {
  message: any;
  statusCode: number;
  success: boolean;
}

export type FetchResponse = SuccessResponse | ErrorResponse;
/**
 *
 * @param response
 * @returns response of type Success
 */
export function isFetchSuccess(
  response: FetchResponse,
): response is SuccessResponse {
  return (response as SuccessResponse).message !== undefined;
}

export interface IErrorResponse {
  error: any;
  success: false;
}
export interface Http404 extends IErrorResponse {
  statusCode: 404
}
export interface Http500 extends IErrorResponse {
  statusCode: 500
}
export interface Http400 extends IErrorResponse {
  statusCode: 400
}
export interface Http422 extends IErrorResponse {
  statusCode: 422
}
export interface Http401 extends IErrorResponse {
  statusCode: 401
}

export type ErrorResponse = Http400 | Http401 | Http404 | Http422 | Http500;

export function isFetchError404(response: ErrorResponse): response is Http404 {
  return (response as Http404).statusCode === 404;
}

export function isFetchError400(response: ErrorResponse): response is Http400 {
  return (response as Http400).statusCode === 400;
}

export function isFetchError401(response: ErrorResponse): response is Http401 {
  return (response as Http401).statusCode === 401;
}

export function isFetchError422(response: ErrorResponse): response is Http422 {
  return (response as Http422).statusCode === 422;
}

export function isFetchError500(response: ErrorResponse): response is Http500 {
  return (response as Http500).statusCode === 500;
}
