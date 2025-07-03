import { describe, expect, it, vi } from "vitest";
import Navigation from ".";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Navigation Component Test Suite", () => {
  it("should render Top Navigation with Links", () => {
    render(<Navigation>
        <a href="/">Home</a>
        <a href="/positions">Positions</a>
    </Navigation>);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
  });

  it("should render Top Navigation with Links", () => {
    render(<Navigation type="aside">
        <a href="/">Home</a>
        <a href="/positions">Positions</a>
    </Navigation>);
    const homeLink = screen.getByText("Home");
    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);
    expect(homeLink).toBeInTheDocument();
  });
});
