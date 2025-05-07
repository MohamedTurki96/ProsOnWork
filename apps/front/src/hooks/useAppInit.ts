import { useEffect, useMemo, useState } from 'react';

import { useConnectedUser } from './useAuth';

export function useAppInit() {
  const { isFetching, isLoading } = useConnectedUser();
  const [timeoutLoading, setTimeoutLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setTimeoutLoading(false), 2000);

    return () => clearTimeout(timeout);
  }, []);

  return useMemo(
    () => !timeoutLoading && (!isFetching || !isLoading),
    [timeoutLoading, isFetching, isLoading],
  );
}
