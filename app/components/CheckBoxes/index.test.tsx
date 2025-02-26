import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrefecturePopulationProvider } from '@/context/PrefecturePopulationContext';
import CheckBoxs from './index';

const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森' },
];

describe('CheckBoxs', () => {
  it('renders checkboxes correctly', () => {
    render(
      <PrefecturePopulationProvider>
        <CheckBoxs prefectures={mockPrefectures} />
      </PrefecturePopulationProvider>
    );

    expect(screen.getByLabelText('北海道')).toBeInTheDocument();
    expect(screen.getByLabelText('青森')).toBeInTheDocument();
  });

  it('updates selected prefectures when checkbox is clicked', () => {
    render(
      <PrefecturePopulationProvider>
        <CheckBoxs prefectures={mockPrefectures} />
      </PrefecturePopulationProvider>
    );

    const hokkaidoCheckbox = screen.getByLabelText('北海道');
    const aomoriCheckbox = screen.getByLabelText('青森');

    // 初期状態の確認
    expect(hokkaidoCheckbox).not.toBeChecked();
    expect(aomoriCheckbox).not.toBeChecked();

    // チェックボックスをクリックして選択状態を変更
    fireEvent.click(hokkaidoCheckbox);
    expect(hokkaidoCheckbox).toBeChecked();

    fireEvent.click(aomoriCheckbox);
    expect(aomoriCheckbox).toBeChecked();

    // チェックボックスを再度クリックして選択状態を解除
    fireEvent.click(hokkaidoCheckbox);
    expect(hokkaidoCheckbox).not.toBeChecked();
  });
});