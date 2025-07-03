import { screen, render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import CancelEvents from ".";

vi.mock('../../../components/EventsForms', ()=>({
    default:()=><div>Mocked Child</div>
}));

describe("Buy Events Component", () => {
  it("Should Render the Buy Events", () => {
    
    render(<CancelEvents />);
    expect(screen.getByText('Mocked Child')).toBeInTheDocument();
  });
});