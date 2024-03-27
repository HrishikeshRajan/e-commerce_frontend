export const formattedAmount = (price:number) => {
  const formattedString = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
  const withoutTrailingZeros = formattedString.replace(/\.?0*$/, '');

  return withoutTrailingZeros;
};
