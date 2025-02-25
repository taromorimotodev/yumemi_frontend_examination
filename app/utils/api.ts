const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
import { population } from '@/types/population';

/**
 * 都道府県データを取得する関数
 * 
 * @returns {Promise<{ result: { prefCode: number; prefName: string; }[] }>} 都道府県データのPromise
 * @throws {Error} レスポンスが正常でない場合にエラーをスロー
 */
export const fetchPrefectures = async () => {
  const endpoint = '/api/v1/prefectures';
  const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
    headers: {
      'X-API-KEY': API_KEY || '',
    } as HeadersInit,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

/**
 * 指定された都道府県コードに基づいて人口データを取得する関数
 * 
 * @param {number} prefCode - 都道府県コード
 * @returns {Promise<population[]>} 人口データのPromise
 * @throws {Error} レスポンスが正常でない場合にエラーをスロー
 */
export const fetchPopulations = async (prefCode: number) => {
  const endpoint = '/api/v1/population/composition/perYear?prefCode=' + prefCode;
  const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
    headers: {
      'X-API-KEY': API_KEY || '',
    } as HeadersInit,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  const datasets = data.result.data;
  datasets.forEach((dataset: { label: string; data: population[] }) => {
    dataset.data = dataset.data.filter((item) => item.year >= 1980 && item.year <= 2020);
  });
  return datasets;
};
