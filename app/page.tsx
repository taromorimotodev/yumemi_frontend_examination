'use client';

import usePrefecture from '@/hooks/usePrefecture';
import CheckBoxes from '@/components/CheckBoxes';
import { PrefecturePopulationProvider } from '@/context/PrefecturePopulationContext';
import style from './index.module.scss';

export default function Home() {
  
  const { data: prefecture, error: prefectureError } = usePrefecture();

  if (prefectureError) {
    return <div>Error: {prefectureError}</div>;
  }

  if (!prefecture) {
    return <div>Loading...</div>;
  }


  return (
    <PrefecturePopulationProvider>
    <div className={style.container}>
      <div className="inner">
        <CheckBoxes prefectures={Array.isArray(prefecture.result) ? prefecture.result : []} />
      </div>
    </div>
    </PrefecturePopulationProvider>
  );
}