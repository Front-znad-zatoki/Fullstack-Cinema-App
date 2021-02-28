import { render, screen } from '@testing-library/react';
import LinkAsButton from '.';

test('renders learn react link', () => {
  render(<LinkAsButton />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
