// components/DynamicClientOnly.tsx
import dynamic from 'next/dynamic';

const DynamicClientOnly = (Component) => {
  return dynamic(() => import(Component), { ssr: false });
};

export default DynamicClientOnly;
