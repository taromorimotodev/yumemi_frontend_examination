'use client';

import { useEffect, useState } from 'react';
import { fetchPrefectures } from '@/utils/api';
import { prefecture } from '@/types/prefecture';

/**
 * usePrefectureフック
 * 都道府県データを取得するカスタムフック
 * 
 * @returns {{ data: prefecture | null, error: string | null }} 都道府県データとエラーメッセージ
 */
const usePrefecture = () => {
  const [data, setData] = useState<prefecture | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * データを取得する非同期関数
     * 都道府県データを取得し、状態を更新する
     */
    const getData = async () => {
      try {
        const result = await fetchPrefectures();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    getData();
  }, []);
  return { data, error };
};

export default usePrefecture;
