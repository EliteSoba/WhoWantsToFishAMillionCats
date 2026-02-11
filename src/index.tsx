import './styles.css';
import App from './components/App.tsx';

import React from 'react';
import { Container, createRoot } from 'react-dom/client';

const node = document.getElementById('test');
const root = createRoot(node as Container);
root.render(<App />);
