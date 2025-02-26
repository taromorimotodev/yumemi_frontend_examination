"use client";
import React from "react";
import style from "./index.module.scss";

interface CheckBoxProps {
  prefCode: number;
  prefName: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CheckBoxコンポーネント
 * 都道府県のチェックボックスを表示する
 *
 * @param {number} prefCode - 都道府県コード
 * @param {string} prefName - 都道府県名
 * @param {boolean} isChecked - チェックボックスの選択状態
 * @param {function} onChange - チェックボックスの状態が変わったときに呼び出される関数
 * @returns {JSX.Element} チェックボックスコンポーネント
 */
const CheckBox: React.FC<CheckBoxProps> = ({
  prefCode,
  prefName,
  isChecked,
  onChange,
}) => {
  return (
    <div className={`${style.checkbox} ${isChecked ? style.active : ""}`}>
      <label htmlFor={`pref-${prefCode}`} className="">
        <input
          type="checkbox"
          id={`pref-${prefCode}`}
          name={prefName}
          value={prefCode.toString()}
          checked={isChecked}
          onChange={onChange}
        />
        {prefName}
      </label>
    </div>
  );
};
export default CheckBox;
