import { useState, useEffect } from 'react';

export const useInitialLoading = (loadingDelay = 300) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDelay);

    if (document.readyState === 'complete') {
      setIsLoading(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [loadingDelay]);

  return { isLoading, isMounted };
}; 