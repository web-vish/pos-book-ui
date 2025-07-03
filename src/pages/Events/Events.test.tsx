import { screen, render } from "@testing-library/react";
import { describe, it } from "vitest";
import Events from ".";
import { BrowserRouter } from "react-router";

describe("Events Test Suites", () => {
  it("To Render Events Component", () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );
    expect(screen.getByTestId("events-page")).toBeInTheDocument();
  });
});
