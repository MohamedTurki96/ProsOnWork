import { Outlet } from 'react-router-dom';
import { Footer } from './footer';
import { Header } from './header';
import { useEffect } from 'react';

export function ClientLayout() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    import('../../../style/scss/main.scss');
  }, []);

  return (
    <div className={`body-two home-page-five`}>
      <div className={`main-wrapper`}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
