import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import InputForm from ".";

describe("InputForm", () => {
  it("renders correctly with default props", () => {
    render(<form><InputForm label="Test Label" type="text"/></form>);
    expect(screen.getByLabelText("Test Label :", {exact:false})).toBeInTheDocument();
  });

  it("renders with placeholder text", () => {
    render(<form><InputForm label="Test Label" type="text" placeholder="Enter text" /></form>);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });
});
