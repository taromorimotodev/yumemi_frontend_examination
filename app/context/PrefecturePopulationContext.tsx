import React, { createContext, useContext, useState } from "react";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefectureContextProps {
  selectedPrefectures: Prefecture[];
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
  selectedPopulation: number;
  setSelectedPopulation: React.Dispatch<React.SetStateAction<number>>;
}

const PrefecturePopulationContext = createContext<
  PrefectureContextProps | undefined
>(undefined);

/**
 * PrefecturePopulationProviderコンポーネント
 * 都道府県と人口種別の選択状態を管理するコンテキストプロバイダー
 *
 * @param {React.ReactNode} children - 子コンポーネント
 * @returns {JSX.Element} コンテキストプロバイダーコンポーネント
 */
export const PrefecturePopulationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    [],
  );
  const [selectedPopulation, setSelectedPopulation] = useState<number>(0);

  return (
    <PrefecturePopulationContext.Provider
      value={{
        selectedPrefectures,
        setSelectedPrefectures,
        selectedPopulation,
        setSelectedPopulation,
      }}
    >
      {children}
    </PrefecturePopulationContext.Provider>
  );
};

/**
 * usePrefecturePopulationContextフック
 * PrefecturePopulationContextの値を取得するカスタムフック
 *
 * @returns {PrefectureContextProps} コンテキストの値
 * @throws {Error} コンテキストがプロバイダー内で使用されていない場合にエラーをスロー
 */
export const usePrefecturePopulationContext = () => {
  const context = useContext(PrefecturePopulationContext);
  if (!context) {
    throw new Error(
      "usePrefecturePopulationContext must be used within a PrefectureProvider",
    );
  }
  return context;
};
