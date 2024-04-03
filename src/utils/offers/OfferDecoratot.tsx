import React from 'react';

export type Offer = {
  children: React.ReactNode
  offer:boolean
};

export function OfferDecorator({ children, offer }:Offer) {
  if (offer) {
    return (
      <div className="bg-red-500">
        {children}
      </div>
    );
  }
  return children;
}
