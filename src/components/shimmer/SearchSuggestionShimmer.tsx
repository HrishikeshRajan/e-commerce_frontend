import React from 'react';

export function SearchSuggestionShimmer() {
  return (
    <div className="p-1 bg-white  rounded-md w-full  max-w-md animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="flex justify-between w-full">
          <div className="h-4 bg-gray-200 rounded w-2/4 " />
          <div className="w-2 h-2 mt-1 bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div className="flex items-center space-x-4 pt-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="flex justify-between w-full">
          <div className="h-4 bg-gray-200 rounded w-3/4 " />
          <div className="w-2 h-2 mt-1 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
