import { renderHook, waitFor } from "@testing-library/react";
import usePrefecture from "./usePrefecture";
import { fetchPrefectures } from "@/utils/api";

// モックデータ
const mockPrefecturesResponse = {
  result: [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森" },
  ],
};

// fetchPrefectures関数をモック
jest.mock("@/utils/api", () => ({
  fetchPrefectures: jest.fn(),
}));

describe("usePrefecture", () => {
  /**
   * 正常に都道府県データを取得できることをテスト
   */
  it("fetches prefectures successfully", async () => {
    (fetchPrefectures as jest.Mock).mockResolvedValueOnce(
      mockPrefecturesResponse,
    );

    const { result } = renderHook(() => usePrefecture());

    // 初期状態の確認
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // データの取得を待つ
    await waitFor(() => expect(result.current.data).not.toBeNull());

    // データ取得後の状態を確認
    expect(result.current.data).toEqual(mockPrefecturesResponse);
    expect(result.current.error).toBeNull();
  });

  /**
   * レスポンスが正常でない場合にエラーをスローすることをテスト
   */
  it("throws an error when the response is not ok", async () => {
    const errorMessage = "Error: 500";
    (fetchPrefectures as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    const { result } = renderHook(() => usePrefecture());

    // 初期状態の確認
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // データの取得を待つ
    await waitFor(() => expect(result.current.error).not.toBeNull());

    // エラー発生後の状態を確認
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });
});
