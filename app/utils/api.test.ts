import { fetchPrefectures, fetchPopulations } from './api';

/**
 * モックデータ
 * 都道府県データと人口データのモックレスポンス
 */
const mockPrefecturesResponse = {
  result: [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森' },
  ],
};

const mockPopulationsResponse = {
  result: {
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

// グローバルfetch関数をモック
global.fetch = jest.fn();

describe('fetchPrefectures', () => {
  /**
   * 正常に都道府県データを取得できることをテスト
   */
  it('fetches prefectures successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPrefecturesResponse,
    });

    const data = await fetchPrefectures();
    expect(data).toEqual(mockPrefecturesResponse);
  });

  /**
   * レスポンスが正常でない場合にエラーをスローすることをテスト
   */
  it('throws an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchPrefectures()).rejects.toThrow('Error: 500');
  });
});

describe('fetchPopulations', () => {
  /**
   * 正常に人口データを取得できることをテスト
   */
  it('fetches populations successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPopulationsResponse,
    });

    const data = await fetchPopulations(1);
    expect(data).toEqual(mockPopulationsResponse.result.data);
  });

  /**
   * レスポンスが正常でない場合にエラーをスローすることをテスト
   */
  it('throws an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchPopulations(1)).rejects.toThrow('Error: 500');
  });
});