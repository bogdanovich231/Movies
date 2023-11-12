import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import '@testing-library/jest-dom';

test('renders 404 page for unknown route', () => {
  render(
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );

  const notFoundText = screen.getByText('Not Found');
  expect(notFoundText).toBeInTheDocument();
});
