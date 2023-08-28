'use client';

import Search from './search/Search';
import withAuth from './withAuth';

function App() {
  return <Search />;
}

export default withAuth(App);
