import { render, screen } from '@testing-library/react';
import Ticket from '.';

test('renders learn react link', () => {
  render(<Ticket />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
