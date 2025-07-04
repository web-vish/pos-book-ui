import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, type Mock } from "vitest";
import EventsForm from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "../../context/notificationContext";
import { AppProvider } from "../../context/appContext";
import { useMutation } from "@tanstack/react-query";

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

const mockMutateFn = vi.fn();

vi.mock("@tanstack/react-query", async () => {
  const originalModule = await vi.importActual("@tanstack/react-query");
  return {
    ...originalModule,
    useMutation: vi.fn(),
  };
});

describe("EventsForm Component Test Suites", () => {
  beforeEach(() => {
    (useMutation as Mock).mockImplementation(() => ({
      mutate: mockMutateFn,
      data: { Positions: mockPositions },
      isSuccess: true,
      isError: false,
      isLoading: false,
      isIdle: false,
    }));
  });

  it("should render the form with correct title and button text", () => {
    render(
      <EventsForm title="Test Event Form" buttonText="Buy" pageType="Buy" />
    );

    expect(screen.getByText("Test Event Form")).toBeInTheDocument();
    expect(screen.getByText("Buy")).toBeInTheDocument();
  });

  it("should render the form with correct title without button type and for Cancel", () => {
    render(<EventsForm title="Test Event Form" pageType="Cancel" />);

    expect(screen.getByText("Test Event Form")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should be able to submit the form with test data", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <AppProvider>
          <NotificationProvider>
            <EventsForm
              title="Test Event Form"
              buttonText="Submit"
              pageType="Buy"
            />
          </NotificationProvider>
        </AppProvider>
      </QueryClientProvider>
    );
    const accountInput = screen.getByPlaceholderText("Account");
    const securityInput = screen.getByPlaceholderText("Security");
    const quantityInput = screen.getByPlaceholderText("Quantity");
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.change(accountInput, { target: { value: "Test Account" } });
    fireEvent.change(securityInput, { target: { value: "Test Security" } });
    fireEvent.change(quantityInput, { target: { value: "100" } });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(mockMutateFn).toHaveBeenCalledWith({
        Events: [
          {
            Action: "Buy",
            ID: 1,
            Account: "Test Account",
            Security: "Test Security",
            Quantity: 100,
          },
        ],
      });
    });
  });

  it("should be able to trigger Error with form submit test data", async () => {
    (useMutation as Mock).mockImplementation(() => ({
      mutate: mockMutateFn,
      data: { Positions: [] },
      isSuccess: false,
      isError: true,
      isLoading: false,
      isIdle: false,
    }));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <AppProvider>
          <NotificationProvider>
            <EventsForm
              title="Test Event Form"
              buttonText="Submit"
              pageType="Buy"
            />
          </NotificationProvider>
        </AppProvider>
      </QueryClientProvider>
    );
    const accountInput = screen.getByPlaceholderText("Account");
    const securityInput = screen.getByPlaceholderText("Security");
    const quantityInput = screen.getByPlaceholderText("Quantity");
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.change(accountInput, { target: { value: "Test Account" } });
    fireEvent.change(securityInput, { target: { value: "Test Security" } });
    fireEvent.change(quantityInput, { target: { value: "100" } });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(mockMutateFn).toHaveBeenCalledWith({
        Events: [
          {
            Action: "Buy",
            ID: 1,
            Account: "Test Account",
            Security: "Test Security",
            Quantity: 100,
          },
        ],
      });
    });
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
    const addButton = screen.getByTestId("remove-security-button");
    const removeButton = screen.getByTestId("remove-security-button");
    fireEvent.click(addButton);
    waitFor(() => {
      expect(screen.getAllByRole("textbox").length).toBe(6);
    });
    fireEvent.click(removeButton);
    waitFor(() => {
      expect(screen.getAllByRole("textbox").length).toBe(3); // One for account and one for security
    });
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
