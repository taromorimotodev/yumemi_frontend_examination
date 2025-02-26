import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chart from "@/components/Chart";
import { usePrefecturePopulationContext } from "@/context/PrefecturePopulationContext";
import { fetchPopulations } from "@/utils/api";

// usePrefecturePopulationContext をモック
jest.mock("@/context/PrefecturePopulationContext", () => ({
  usePrefecturePopulationContext: jest.fn(),
}));

// fetchPopulations をモック
jest.mock("@/utils/api", () => ({
  fetchPopulations: jest.fn(),
}));

// ResizeObserverをモック
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// グローバルにResizeObserverを設定
global.ResizeObserver = ResizeObserver;

describe("Chart Component", () => {
  it("都道府県が未選択の場合、注意メッセージを表示する", () => {
    // モック: 都道府県が未選択
    (usePrefecturePopulationContext as jest.Mock).mockReturnValue({
      selectedPrefectures: [],
      selectedPopulation: 0,
    });

    // Chartコンポーネントをレンダリング
    render(<Chart />);

    // 注意メッセージが表示されていることを確認
    expect(
      screen.getByText("都道府県を選択してください")
    ).toBeInTheDocument();
  });

  it("選択された都道府県のデータを取得し、グラフを表示する", async () => {
    // モックデータ: 選択された都道府県
    const mockPrefectures = [{ prefCode: 1, prefName: "北海道" }];
    // モックデータ: 人口データ
    const mockPopulationData = [
      {
        label: "総人口",
        data: [
          { year: 2000, value: 1000000 },
          { year: 2005, value: 1100000 },
        ],
      },
    ];

    // モック: usePrefecturePopulationContextの戻り値
    (usePrefecturePopulationContext as jest.Mock).mockReturnValue({
      selectedPrefectures: mockPrefectures,
      selectedPopulation: 0,
    });

    // モック: fetchPopulationsの戻り値
    (fetchPopulations as jest.Mock).mockResolvedValue(mockPopulationData);

    // Chartコンポーネントをレンダリング
    render(<Chart />);

    // データ取得を待つ
    await waitFor(() =>
      expect(fetchPopulations).toHaveBeenCalledWith(1)
    );

  });
});