import { Outlet } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

type PublicLayoutProps = {
  noFooter?: boolean
}

export function PublicLayout(props: PublicLayoutProps) {
  return (
    <div className={`body-two home-page-five`}>
      <div className={`main-wrapper`}>
        <Header />
        <Outlet />
        {!props.noFooter && <Footer />}
      </div>
    </div>
  );
}
