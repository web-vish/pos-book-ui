import {screen, render} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import App from "./App";
import { BrowserRouter } from "react-router";

describe("App Component", () => {
  it("should render App component with Navigation", () => {
    vi.mock("@tanstack/react-query", () => ({
      QueryClient: class {},
      QueryClientProvider: ({children}: {children: React.ReactNode}) => <div>{children}</div>,
    }));
    vi.mock("./components/Navigation", () => ({
      default: () => <div>Mocked Navigation</div>,
    }));
    vi.mock("./Routes", () => ({
      default: () => <div>Mocked Routes</div>,
    }));
    render(<BrowserRouter><App /></BrowserRouter>);

    expect(screen.getByTestId("app-container")).toBeInTheDocument();
  });
});