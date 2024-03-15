import { ErrorResponse, SuccessResponse } from '@/types/Fetch';

/**
 *
 * @param response
 * @returns response of type Success
 */
export function isFetchSuccess(
  response: SuccessResponse | ErrorResponse | null,
): response is SuccessResponse {
  return response !== null && 'message' in response;
}
