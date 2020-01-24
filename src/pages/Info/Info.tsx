import React, { lazy, Suspense } from 'react';
import { importMDX } from 'mdx.macro';
import { Loading } from 'components/Loading/Loading';

const Content = lazy(() => importMDX('./Info.mdx'));

export const Info: React.FC = () => (
  <div className="container mx-auto mt-8 max-w-md pt-4 mb-24">
    <div className="mdx mb-6 rounded shadow bg-secondary-dark p-6">
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </div>
  </div>
);
