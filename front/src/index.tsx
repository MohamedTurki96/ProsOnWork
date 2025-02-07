import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';
import store from './core/data/redux/store';
import { getQueryClient } from './utils/getQueryClient';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../src/style/icon/tabler-icons/webfont/tabler-icons.css';
import '../src/style/icon/feather/css/iconfont.css';
import 'aos/dist/aos.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={getQueryClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
