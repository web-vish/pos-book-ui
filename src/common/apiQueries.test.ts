import { getPositionSummary, submitEvents } from "./apiQueries";
import { describe, it, vi } from "vitest";

vi.mock("./axios", () => ({
  axiosInstance: {
    get: vi.fn(() => Promise.resolve({ data: { Positions: [] } })),
    post: vi.fn(() => Promise.resolve({ data: {Positions: []} })),
  },
}));

describe("API Queries", () => {
  it("should fetch position summary", async () => {
    const data = await getPositionSummary();
    expect(data).toEqual({ Positions: [] });
  });

 it("should submit events", async () => {
    const mockData = {Events:[
        {
          ID: 1,
        Account: "Test Account",
        Security: "Test Security",
        Quantity: 100,
        Action: "Buy",}
    ]};
    const response = await submitEvents(mockData);
    expect(response).toEqual({Positions: []});
  });
});

