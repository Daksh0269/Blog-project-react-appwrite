import React from 'react';

function PageWrapper({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;
