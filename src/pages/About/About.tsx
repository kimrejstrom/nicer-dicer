import React, { lazy, Suspense } from 'react';
import { importMDX } from 'mdx.macro';

const Content = lazy(() => importMDX('./About.mdx'));

export const About: React.FC = () => (
  <div className="container mx-auto max-w-lg p-4">
    <div className="mdx mb-6 rounded shadow bg-secondary-dark p-10">
      <Suspense fallback={<div className="spinner"></div>}>
        <Content />
      </Suspense>
    </div>
  </div>
);
