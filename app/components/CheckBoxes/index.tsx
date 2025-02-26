"use client";

import React from "react";
import CheckBox from "../CheckBox";
import { usePrefecturePopulationContext } from "@/context/PrefecturePopulationContext";
import style from "./index.module.scss";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface CheckBoxsProps {
  prefectures: Prefecture[];
}

/**
 * CheckBoxsコンポーネント
 * 都道府県のチェックボックスリストを表示する
 *
 * @param {Prefecture[]} prefectures - 都道府県のリスト
 * @returns {JSX.Element} チェックボックスリストコンポーネント
 */
const CheckBoxs: React.FC<CheckBoxsProps> = ({ prefectures = [] }) => {
  const { selectedPrefectures, setSelectedPrefectures } =
    usePrefecturePopulationContext();

  /**
   * チェックボックスの状態が変わったときに呼び出される関数
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - チェックボックスの変更イベント
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setSelectedPrefectures((prev) =>
      checked
        ? [...prev, { prefCode: Number(value), prefName: name }]
        : prev.filter((pref) => pref.prefCode !== Number(value)),
    );
  };

  return (
    <div>
      <div>
        <p className={style.title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
            <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
            <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
          </svg>
          都道府県
        </p>
      </div>
      <div className={style.prefectures}>
        {prefectures.map((prefecture) => (
          <CheckBox
            key={prefecture.prefCode}
            prefCode={prefecture.prefCode}
            prefName={prefecture.prefName}
            isChecked={selectedPrefectures.some(
              (pref) => pref.prefCode === prefecture.prefCode,
            )}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckBoxs;