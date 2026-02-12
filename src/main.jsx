import React from 'react';
import ReactDOM from 'react-dom/client'; // لازم /client في React 18+
import App from './App';

// استيراد Bootstrap CSS وJS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// استيراد ملفات CSS الخاصة بالمشروع
import './index.css';

// تحديد العنصر اللي هنعمل له render
const rootElement = document.getElementById('root');

// إنشاء الـ root مع React 18
const root = ReactDOM.createRoot(rootElement);

// Render للتطبيق
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);