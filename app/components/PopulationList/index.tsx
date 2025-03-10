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
      <p className={style.title}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        人口種別
      </p>
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
