import Button from ".";
import { render} from '@testing-library/react'; 
import { describe, it, vi} from 'vitest'
describe('Button Test Suite', () => { 
    it('should render a button with the correct text', () => {
        const { getByText } = render(<Button text="Click Me" />);
        const buttonElement = getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
    }); 

    it('should render a button with the Secondary Button variant', () => {
        const { getByText } = render(<Button text="Click Me" option="secondary" />);
        const buttonElement = getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
    }); 

    it('should render a button with the Secondary Button variant with other Props', () => {
        const { getByText } = render(<Button text="Click Me" option="link" onClick={vi.fn()} />);
        const buttonElement = getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
    }); 
 })
