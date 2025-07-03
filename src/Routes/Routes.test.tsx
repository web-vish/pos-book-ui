import {describe, expect, it, vi} from 'vitest';
import { screen, render } from '@testing-library/react';
import AppRoutes from '.';
import { BrowserRouter } from 'react-router';

describe('Routes test Suite', () => { 
    vi.mock('../pages/Summary', () => ({
        default: () => <div>Mocked Position Summary</div>,
    }));
    vi.mock('../pages/Events', () => ({
        default: () => <div>Mocked Events</div>,
    }));
    vi.mock('../pages/Events/Buy', () => ({
        default: () => <div>Mocked Buy Events</div>,
    }));
    vi.mock('../pages/Events/Sell', () => ({
        default: () => <div>Mocked Sell Events</div>,
    }));
    vi.mock('../pages/Events/Cancel', () => ({
        default: () => <div>Mocked Cancel Events</div>,
    }));
    it('should render AppRoutes with Position Summary and Events', () => {
        render(<BrowserRouter><AppRoutes /></BrowserRouter>);
        expect(screen.getByText('Mocked Position Summary')).toBeInTheDocument();
    });
}); 