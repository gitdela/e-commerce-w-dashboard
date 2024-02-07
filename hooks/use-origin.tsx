// created this when i created the api alert component and added it to the Settings Page
// there we are trying to create a public api url that other frontend applications can easily connect to
// and the origin is the url of the frontend application
// on the server, it won't work because the url which is localhost is not available on the server
// so me must guard against that
// although i don't think it's necessary to guard against it since it's only used on the client side
// but it's here anyway. we'll see

import { useState, useEffect } from 'react';

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return origin;
};
