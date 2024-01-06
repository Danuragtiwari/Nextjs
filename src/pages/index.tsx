// pages/index.js

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Link href="/display-products">
        View Products
      </Link>
    </div>
  );
};

export default HomePage;
