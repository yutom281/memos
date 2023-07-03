import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search bar', () => {
  render(<App />);
  const element = screen.getByTitle(/search bar/i);
  expect(element).toBeInTheDocument();
});
