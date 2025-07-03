import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import AppNavLink from ".";
import { BrowserRouter as Router } from "react-router";

describe("AppNavLink", () => {
  it("App Nav renders correctly", () => {
    render(
      <Router>
        <AppNavLink path={"/"} label={"Home"} />
      </Router>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  it("App Nav with IsEnd Prop renders correctly", () => {
    render(
      <Router>
        <AppNavLink path={"/"} label={"Home"} isEnd={true}/>
      </Router>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
