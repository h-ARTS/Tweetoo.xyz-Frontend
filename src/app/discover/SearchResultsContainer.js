import React from 'react';
import qs from 'querystring';
import { useLocation } from '@reach/router';

export default function SearchResultsContainer() {
  const location = useLocation();
  const parsedSearchTerm = qs.parse(location.search);
  return <div>Search results for: {parsedSearchTerm['?q']}</div>;
}
