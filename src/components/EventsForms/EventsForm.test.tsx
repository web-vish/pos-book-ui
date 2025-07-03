import { screen, render, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EventsForm from ".";

const mockPositions = {
  ID: "1",
  ACCOUNT: "Test Account",
  SECURITY: "Test Security",
  QUANTITY: 100,
  Events: [
    {
      id: "1",
      Account: "Test Account",
      Security: "Test Security",
      Quantity: 100,
    },
  ],
};

const mockMutateFn = vi.fn().mockImplementation(() => ({
    success: true,
    Positions: mockPositions,
  }));

describe("EventsForm Component Test Suites", () => {
  
  vi.mock("@tanstack/react-query", () => ({
    useMutation: () => ({
      mutate: mockMutateFn,
    }),
  }));

  it("should render the form with correct title and button text", () => {
    render(
      <EventsForm title="Test Event Form" buttonText="Submit" pageType="Buy" />
    );

    expect(screen.getByText("Test Event Form")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should be able to submit the form with test data", () => {
    render(
      <EventsForm title="Test Event Form" buttonText="Submit" pageType="Buy" />
    );
    const accountInput = screen.getByPlaceholderText("Account");
    const securityInput = screen.getByPlaceholderText("Security");
    const quantityInput = screen.getByPlaceholderText("Quantity");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(accountInput, { target: { value: "Test Account" } });
    fireEvent.change(securityInput, { target: { value: "Test Security" } });
    fireEvent.change(quantityInput, { target: { value: "100" } });
    fireEvent.click(submitButton);
    expect(mockMutateFn).toHaveBeenCalledTimes(0);
  });
  it("should add a security when the add button is clicked", () => {
    render(
      <EventsForm title="Test Event Form" buttonText="Submit" pageType="Buy" />
    );

    const addButton = screen.getByTestId("add-security-button");
    fireEvent.click(addButton);

    expect(screen.getAllByRole("textbox").length).toBe(6); // One for account and one for security
  });
  it("should remove a security when the remove button is clicked", () => {
    render(
      <EventsForm title="Test Event Form" buttonText="Submit" pageType="Buy" />
    );

    const removeButton = screen.getByTestId("remove-security-button");
    fireEvent.click(removeButton);
    expect(screen.getAllByRole("textbox").length).toBe(3); // One for account and one for security
  });

  it("should not allow to add more than 10 security forms when the add button is clicked", () => {
    render(
      <EventsForm title="Test Event Form" buttonText="Submit" pageType="Buy" />
    );

    const addButton = screen.getByTestId("add-security-button");
    for (let i = 0; i <= 10; i++) {
      fireEvent.click(addButton);
    }
    expect(screen.getAllByRole("textbox").length).toBe(30);
  });
});
