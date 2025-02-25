"use client";

import { useEffect, useState } from "react";
import { fetchPopulations } from "@/utils/api";
import { population } from "@/types/population";

/**
 * usePopulationsフック
 * 指定された都道府県コードに基づいて人口データを取得するカスタムフック
 *
 * @param {number} num - 都道府県コード
 * @returns {{ data: population | null, error: string | null }} 人口データとエラーメッセージ
 */
const usePopulations = (num: number) => {
  const [data, setData] = useState<population | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * データを取得する非同期関数
     * 指定された都道府県コードに基づいて人口データを取得し、状態を更新する
     */
    const getData = async () => {
      try {
        const result = await fetchPopulations(num);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    getData();
  }, [num]);

  return { data, error };
};

export default usePopulations;
