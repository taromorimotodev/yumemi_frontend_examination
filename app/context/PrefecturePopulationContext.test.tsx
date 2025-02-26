import React from "react";
import { render, screen, act } from "@testing-library/react";
import {
  PrefecturePopulationProvider,
  usePrefecturePopulationContext,
} from "./PrefecturePopulationContext";

const TestComponent: React.FC = () => {
  const {
    selectedPrefectures,
    setSelectedPrefectures,
    selectedPopulation,
    setSelectedPopulation,
  } = usePrefecturePopulationContext();

  return (
    <div>
      <div data-testid="selectedPrefectures">
        {selectedPrefectures.map((pref) => pref.prefName).join(", ")}
      </div>
      <div data-testid="selectedPopulation">{selectedPopulation}</div>
      <button
        onClick={() =>
          setSelectedPrefectures([{ prefCode: 13, prefName: "東京" }])
        }
      >
        Set Prefectures
      </button>
      <button onClick={() => setSelectedPopulation(1000000)}>
        Set Population
      </button>
    </div>
  );
};

describe("PrefecturePopulationContext", () => {
  it("provides default values", () => {
    render(
      <PrefecturePopulationProvider>
        <TestComponent />
      </PrefecturePopulationProvider>,
    );

    expect(screen.getByTestId("selectedPrefectures").textContent).toBe("");
    expect(screen.getByTestId("selectedPopulation").textContent).toBe("0");
  });

  it("updates values correctly", () => {
    render(
      <PrefecturePopulationProvider>
        <TestComponent />
      </PrefecturePopulationProvider>,
    );

    act(() => {
      screen.getByText("Set Prefectures").click();
    });

    act(() => {
      screen.getByText("Set Population").click();
    });

    expect(screen.getByTestId("selectedPrefectures").textContent).toBe("東京");
    expect(screen.getByTestId("selectedPopulation").textContent).toBe(
      "1000000",
    );
  });

  it("throws error when used outside of provider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "usePrefecturePopulationContext must be used within a PrefectureProvider",
    );

    consoleError.mockRestore();
  });
});
