import { render, screen } from '@testing-library/react';
import MovieList from '.';

test('renders learn react link', () => {
  render(<MovieList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
