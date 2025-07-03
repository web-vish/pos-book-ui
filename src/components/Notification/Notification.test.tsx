import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Notification from '.';
import { NotificationContext } from '../../context/notificationContext';

describe('Notification Component test Suites', () => {
  it('renders notification when id is present', () => {
    const value = {
      notifications: { id: '1', message: 'Test message', type: 'info' },
      pushNotification: vi.fn()
    };
    render(
      <NotificationContext.Provider value={value}>
        <Notification />
      </NotificationContext.Provider>
    );
    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});