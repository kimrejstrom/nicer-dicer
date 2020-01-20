import React, { lazy, Suspense } from 'react';
import { importMDX } from 'mdx.macro';

const Content = lazy(() => importMDX('./About.mdx'));

export const About: React.FC = () => (
  <div className="container mx-auto mt-8 max-w-lg pt-4">
    <div className="mdx mb-6 rounded shadow bg-secondary-dark p-6">
      <Suspense fallback={<div className="spinner"></div>}>
        <Content />
      </Suspense>
    </div>
  </div>
);
