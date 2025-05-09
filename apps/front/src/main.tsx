import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { getQueryClient } from './utils/getQueryClient';

import '@fortawesome/fontawesome-free/css/all.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-phone-input-2/lib/style.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'aos/dist/aos.css';

import './index.css';
import '../src/style/icon/tabler-icons/webfont/tabler-icons.css';
import '../src/style/icon/feather/css/iconfont.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={getQueryClient()}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
