import React from 'react';
import { Link } from 'react-router-dom';

function CompanyName({ className }:{ className:string }) {
  return (
    <Link to="/">
      <h2 className={className}>Wondercart</h2>
    </Link>

  );
}

export default CompanyName;
