import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PrefecturePopulationProvider, usePrefecturePopulationContext } from "@/context/PrefecturePopulationContext";
import Chart from "./index";
import { fetchPrefectures, fetchPopulations } from "@/utils/api";

// モックデータ
const mockPrefecturesResponse = {
  result: [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森" },
  ],
};

const mockPopulationsResponse = {
  result: [
    {
      label: "総人口",
      data: [
        { year: 1980, value: 1000000 },
        { year: 2020, value: 900000 },
      ],
    },
  ],
};

// fetchPrefecturesとfetchPopulationsをモック
jest.mock("@/utils/api", () => ({
  fetchPrefectures: jest.fn(),
  fetchPopulations: jest.fn(),
}));

// ResizeObserverをモック
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

const TestComponent: React.FC = () => {
  const { setSelectedPrefectures, setSelectedPopulation } = usePrefecturePopulationContext();

  React.useEffect(() => {
    setSelectedPrefectures([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森" },
    ]);
    setSelectedPopulation(0); // 総人口を選択
  }, [setSelectedPrefectures, setSelectedPopulation]);

  return <Chart />;
};

describe("Chart", () => {
  beforeEach(() => {
    (fetchPrefectures as jest.Mock).mockResolvedValue(mockPrefecturesResponse);
    (fetchPopulations as jest.Mock).mockResolvedValue(mockPopulationsResponse);
  });

  it("renders chart correctly with selected prefectures", async () => {
    await act(async () => {
      render(
        <PrefecturePopulationProvider>
          <TestComponent />
        </PrefecturePopulationProvider>
      );
    });

    // 都道府県が選択されていない場合のメッセージを確認
    expect(screen.getByText("都道府県を選択してください")).toBeInTheDocument();

    // 都道府県を選択
    await act(async () => {
      await waitFor(() => {
        expect(fetchPrefectures).toHaveBeenCalledTimes(1);
        expect(fetchPopulations).toHaveBeenCalledTimes(2);
      });
    });

    // チャートが正しくレンダリングされることを確認
    expect(screen.getByText("北海道")).toBeInTheDocument();
    expect(screen.getByText("青森")).toBeInTheDocument();
  });

  it("displays population data correctly", async () => {
    await act(async () => {
      render(
        <PrefecturePopulationProvider>
          <TestComponent />
        </PrefecturePopulationProvider>
      );
    });

    // 都道府県を選択
    await act(async () => {
      await waitFor(() => {
        expect(fetchPrefectures).toHaveBeenCalledTimes(1);
        expect(fetchPopulations).toHaveBeenCalledTimes(2);
      });
    });

    // 人口データが正しく表示されることを確認
    expect(screen.getByText("1980")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
  });
});