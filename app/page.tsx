"use client";

import usePrefecture from "@/hooks/usePrefecture";
import CheckBoxes from "@/components/CheckBoxes";
import { PrefecturePopulationProvider } from "@/context/PrefecturePopulationContext";
import PopulationList from "./components/PopulationList";

export default function Home() {
  const { data: prefecture, error: prefectureError } = usePrefecture();

  return (
    <PrefecturePopulationProvider>
      <div className="page">
        <header className="header">
          <h1>都道府県別の総人口推移グラフ</h1>
        </header>
        <div className="inner">
          {!prefecture ? (
            <div>Loading...</div>
          ) : (
            <CheckBoxes
              prefectures={
                Array.isArray(prefecture.result) ? prefecture.result : []
              }
            />
          )}
          <PopulationList />
        </div>
      </div>
    </PrefecturePopulationProvider>
  );
}
