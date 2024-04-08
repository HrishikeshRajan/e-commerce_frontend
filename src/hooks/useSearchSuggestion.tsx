import { toggleSearchSuggstionList } from '@/utils/reduxSlice/productSlice';
import { useCallback, useState } from 'react';
import { ErrorResponse, FetchApiResponse, hasFetchSucceeded } from '@/types/Fetch';
import { useTypedDispatch } from './user/reduxHooks';

const fetchSearchSuggestions = async (word:string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/product/search/suggestions?name=${word}`);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Oops, something went wrong');
    }
  }
};

const useSearchSuggestion = (
  word:string,
) => {
  const [suggestionError, setSuggestionError] = useState<string>();
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  type Suggestion = { item:{ count:number, name:string }, refIndex:number };
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>();
  const dispatch = useTypedDispatch();
  const getSuggestions = useCallback(() => {
    if (word) {
      setSuggestionLoading(true);
      fetchSearchSuggestions(word)
        .then((result :FetchApiResponse<{ suggestions:Array<Suggestion> }> | ErrorResponse) => {
          setSuggestionLoading(false);
          if (hasFetchSucceeded(result)) {
            setSuggestions(result.message.suggestions);
            dispatch(toggleSearchSuggstionList(true));
          } else {
            dispatch(toggleSearchSuggstionList(false));
          }
        }).catch((e) => {
          setSuggestionLoading(false);
          dispatch(toggleSearchSuggstionList(true));
          setSuggestionError((e as Error).message);
        });
    } else {
      dispatch(toggleSearchSuggstionList(false));
    }
  }, [dispatch, word]);
  return {
    getSuggestions, suggestions, suggestionLoading, suggestionError,
  };
};

export default useSearchSuggestion;
