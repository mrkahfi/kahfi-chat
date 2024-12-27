import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import MobileLayout from './MobileLayout';
import { AppRoutes } from '../routes/AppRoutes';

it('should render children components in the main view when not in chat mode', () => {
  const testContent = <div>Chats</div>;

  render(<AppRoutes>
    
  </AppRoutes>);

  const mainView = screen.getByText('Chats');
  expect(mainView).toBeInTheDocument();
  expect(mainView.parentElement).toHaveClass('translate-x-0');
  expect(mainView.parentElement).not.toHaveClass('-translate-x-full');
});
