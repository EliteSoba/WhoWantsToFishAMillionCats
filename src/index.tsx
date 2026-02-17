import './styles.css';
import App from './components/App.tsx';

import React from 'react';
import { Container, createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

const node = document.getElementById('test');
const root = createRoot(node as Container);
root.render(<HashRouter><App /></HashRouter>);
