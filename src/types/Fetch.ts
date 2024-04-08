/**
 *  @author : Hrishikesh Rajan
 *
 *  Type predicates for Fetch API
 */

import { StatusCodes } from 'http-status-codes';

/**
 * predicate
 */
export interface FetchApiResponse<T> {
  message:T
  statusCode: number;
  success: boolean;
}

/**
 * Provide the neccessary object to function as generic
 *
 * @param response
 * @returns the response as passed type
 */

export function hasRequestSucceeded<T>(
  response: FetchApiResponse<T> | ErrorResponse | null,
): response is FetchApiResponse<T> {
  return response !== null && ((response !== null && 'message' in response)
   && (response !== null && response.success === true));
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
export interface Http429 extends IErrorResponse {
  statusCode: 429
}

export type ErrorResponse = Http400 | Http401 | Http404 | Http422 | Http429 | Http500;

export function isFetchNotFoundError(response: ErrorResponse): response is Http404 {
  return ((response !== null && response !== undefined && 'error' in response) && (response as Http404).statusCode === StatusCodes.NOT_FOUND);
}

export function isFetchBadRequestError(response: ErrorResponse): response is Http400 {
  return ((response !== null && response !== undefined && 'error' in response) && (response as Http400).statusCode === StatusCodes.BAD_REQUEST);
}

export function isFetchUnauthorizedError(response: ErrorResponse): response is Http401 {
  return ((response !== null && response !== undefined && 'error' in response) && (response as Http401).statusCode === StatusCodes.UNAUTHORIZED);
}

export function isFetchUnprocessableEntityError(response: ErrorResponse): response is Http422 {
  return ((response !== null && response !== undefined && 'error' in response) && (response as Http422).statusCode === StatusCodes.UNPROCESSABLE_ENTITY);
}

export function isFetchInternalServerError(response: ErrorResponse): response is Http500 {
  return ((response !== null && response !== undefined && 'error' in response) && (response as Http500).statusCode === StatusCodes.INTERNAL_SERVER_ERROR);
}
export function isFetchTooManyRequests(response: ErrorResponse): response is Http429 {
  return ((response !== null && response !== undefined && 'error' in response) && (response as Http429).statusCode === StatusCodes.TOO_MANY_REQUESTS);
}

export function isNull(x: unknown): x is null {
  return x === null;
}

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

export function hasFetchSucceeded(
  response: SuccessResponse | ErrorResponse | null,
): response is SuccessResponse {
  return ((response !== null && response !== undefined && 'message' in response) && (response !== null && response !== undefined && response.statusCode === StatusCodes.OK));
}
