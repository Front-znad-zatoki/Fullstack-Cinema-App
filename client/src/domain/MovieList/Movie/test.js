import { render, screen } from '@testing-library/react';
import Movie from '.';

test('renders learn react link', () => {
  render(<Movie />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
