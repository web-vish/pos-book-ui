import { screen, render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import PositionSummary from ".";
import { AppProvider } from "../../context/appContext";

const mockPositions = [
  {
    id: "1",
    Account: "Test Account",
    Security: "Test Security",
    Quantity: 100,
  },
];

describe("PositionSummary Component", () => {
  it("should render PositionSummary with mocked data", () => {
    vi.mock("@tanstack/react-query", () => ({
      useQuery: () => ({
        isFetched: true,
        data: {
          Positions: mockPositions,
        },
      }),
    }));
    render(
      <AppProvider>
        <PositionSummary />
      </AppProvider>
    );
    expect(screen.getByText("Test Account")).toBeInTheDocument();
    expect(screen.getByText("Test Security")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
