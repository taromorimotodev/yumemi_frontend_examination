"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import style from "./index.module.scss";
import { usePrefecturePopulationContext } from "@/context/PrefecturePopulationContext";
import { fetchPopulations, fetchPrefectures } from "@/utils/api";
import colors from "@/utils/colors";

interface PopulationDataPoint {
  year: number;
  value: number;
}

interface PopulationResult {
  label: string;
  data: PopulationDataPoint[];
}

/**
 * Chartコンポーネント
 * 都道府県ごとの人口データを表示するグラフを描画する
 */
const Chart: React.FC = () => {
  // コンテキストから選択された都道府県と人口データを取得
  const { selectedPrefectures, selectedPopulation } =
    usePrefecturePopulationContext();
  // 人口データを保持する状態
  const [populationData, setPopulationData] = useState<
    { year: number; [key: string]: number }[]
  >([]);
  // 都道府県の名前を保持する状態
  const [prefectureNames, setPrefectureNames] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    /**
     * データを取得する非同期関数
     * 都道府県の名前と人口データを取得し、状態を更新する
     */
    const fetchData = async () => {
      // 都道府県の名前を取得
      const prefectures = await fetchPrefectures();
      const names: { [key: number]: string } = {};
      selectedPrefectures.forEach((prefCode) => {
        const prefecture = prefectures.result.find(
          (item: { prefCode: number }) => item.prefCode === Number(prefCode),
        );
        if (prefecture) {
          names[Number(prefCode)] = prefecture.prefName;
        }
      });
      setPrefectureNames(names);

      // 人口データを取得
      const dataPromises = selectedPrefectures.map((prefCode) =>
        fetchPopulations(Number(prefCode)),
      );
      const results = await Promise.all(dataPromises);
      const combinedData: {
        [year: number]: { year: number; [key: string]: number };
      } = {};

      // 各都道府県の人口データを結合
      results.forEach((result: PopulationResult[], index) => {
        const populationData = result[selectedPopulation].data;
        populationData.forEach((dataPoint: PopulationDataPoint) => {
          if (!combinedData[dataPoint.year]) {
            combinedData[dataPoint.year] = { year: dataPoint.year };
          }
          combinedData[dataPoint.year][`value${index + 1}`] = dataPoint.value;
        });
      });

      // 結合したデータを配列に変換して状態を更新
      const newPopulationData = Object.values(combinedData);
      setPopulationData(newPopulationData);
    };

    // 選択された都道府県がある場合にデータを取得
    if (selectedPrefectures.length > 0) {
      fetchData();
    } else {
      setPopulationData([]);
    }
  }, [selectedPrefectures, selectedPopulation]);

  /**
   * 都道府県コードに基づいて色を取得する関数
   * @param {number} num - 都道府県コード
   * @returns {string} 16進数カラーコード
   */
  const getPrefColor = (num: number): string => {
    return colors[num] || "#000000"; // デフォルトの色を黒に設定
  };

  return (
    <div className={style.chart}>
      {selectedPrefectures.length === 0 ? (
        <p className={style.attention}>都道府県を選択してください</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={populationData}
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend layout="horizontal" align="center" verticalAlign="top" />
            {selectedPrefectures.map((prefCode, index) => (
              <Line
                key={prefCode}
                type="monotone"
                dataKey={`value${index + 1}`}
                name={prefectureNames[Number(prefCode)]}
                stroke={getPrefColor(Number(prefCode))}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
