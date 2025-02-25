"use client";

import React from "react";
import { usePrefecturePopulationContext } from "@/context/PrefecturePopulationContext";
import style from "./index.module.scss";

/**
 * PopulationListコンポーネント
 * 人口種別のラジオボタンリストを表示する
 *
 * @returns {JSX.Element} 人口種別リストコンポーネント
 */
const PopulationList: React.FC = () => {
  const { selectedPopulation, setSelectedPopulation } =
    usePrefecturePopulationContext();

  /**
   * ラジオボタンの状態が変わったときに呼び出される関数
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - ラジオボタンの変更イベント
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPopulation(Number(event.target.value));
  };

  return (
    <div>
      <p className={style.title}>人口種別</p>
      <div className={style.list}>
        <label className={selectedPopulation === 0 ? style.active : ""}>
          <input
            type="radio"
            value={0}
            checked={selectedPopulation === 0}
            onChange={handleChange}
          />
          総人口
        </label>
        <label className={selectedPopulation === 1 ? style.active : ""}>
          <input
            type="radio"
            value={1}
            checked={selectedPopulation === 1}
            onChange={handleChange}
          />
          年少人口
        </label>
        <label className={selectedPopulation === 2 ? style.active : ""}>
          <input
            type="radio"
            value={2}
            checked={selectedPopulation === 2}
            onChange={handleChange}
          />
          生産年齢人口
        </label>
        <label className={selectedPopulation === 3 ? style.active : ""}>
          <input
            type="radio"
            value={3}
            checked={selectedPopulation === 3}
            onChange={handleChange}
          />
          老年人口
        </label>
      </div>
    </div>
  );
};

export default PopulationList;
