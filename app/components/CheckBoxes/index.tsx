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
    const { value, checked } = event.target;
    setSelectedPrefectures((prev) =>
      checked ? [...prev, value] : prev.filter((pref) => pref !== value),
    );
  };

  return (
    <div>
      <div>
        <p className={style.title}>都道府県</p>
      </div>
      <div className={style.prefectures}>
        {prefectures.map((prefecture) => (
          <CheckBox
            key={prefecture.prefCode}
            prefCode={prefecture.prefCode}
            prefName={prefecture.prefName}
            isChecked={selectedPrefectures.includes(
              prefecture.prefCode.toString(),
            )}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckBoxs;
