import React from 'react';import {createRoot} from 'react-dom/client';import {Chart} from 'chart.js/auto';
import App from './App';import './index.css';
Chart.defaults.color='#94a3b8';Chart.defaults.borderColor='rgba(148,163,184,.15)';
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
