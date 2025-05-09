import AOS from 'aos';
import { useCallback, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { AppLoader } from './components/AppLoader';
import { useAppInit } from './hooks/useAppInit';
import { router } from './router';

export function App() {
  const content = useRoutes(router);
  const isInitialized = useAppInit();
  AOS.init();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleScroll = useCallback(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    import('./style/scss/main.scss');
  }, []);

  if (isInitialized) {
    return content;
  }

  return <AppLoader />;
}
