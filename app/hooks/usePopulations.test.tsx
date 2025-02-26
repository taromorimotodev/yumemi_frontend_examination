import { renderHook, waitFor } from '@testing-library/react';
import usePopulations from './usePopulations';
import { fetchPopulations } from '@/utils/api';
import { population } from '@/types/population';

// モックデータ
const mockPopulationsResponse: population = {
  year: 2020,
  message: '',
  result: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 1980, value: 1000000 },
          { year: 2020, value: 900000 },
        ],
      },
    ],
  },
};

// fetchPopulations関数をモック
jest.mock('@/utils/api', () => ({
  fetchPopulations: jest.fn(),
}));

describe('usePopulations', () => {
  /**
   * 正常に人口データを取得できることをテスト
   */
  it('fetches populations successfully', async () => {
    (fetchPopulations as jest.Mock).mockResolvedValueOnce(mockPopulationsResponse);

    const { result } = renderHook(() => usePopulations(1));

    // 初期状態の確認
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // データの取得を待つ
    await waitFor(() => expect(result.current.data).not.toBeNull());

    // データ取得後の状態を確認
    expect(result.current.data).toEqual(mockPopulationsResponse);
    expect(result.current.error).toBeNull();
  });

  /**
   * レスポンスが正常でない場合にエラーをスローすることをテスト
   */
  it('throws an error when the response is not ok', async () => {
    const errorMessage = 'Error: 500';
    (fetchPopulations as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => usePopulations(1));

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