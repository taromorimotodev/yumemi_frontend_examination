import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PrefecturePopulationProvider } from "@/context/PrefecturePopulationContext";
import PopulationList from "./index";

describe("PopulationList", () => {
  it("renders radio buttons correctly", () => {
    render(
      <PrefecturePopulationProvider>
        <PopulationList />
      </PrefecturePopulationProvider>,
    );

    expect(screen.getByLabelText("総人口")).toBeInTheDocument();
    expect(screen.getByLabelText("年少人口")).toBeInTheDocument();
    expect(screen.getByLabelText("生産年齢人口")).toBeInTheDocument();
    expect(screen.getByLabelText("老年人口")).toBeInTheDocument();
  });

  it("updates selected population when radio button is clicked", () => {
    render(
      <PrefecturePopulationProvider>
        <PopulationList />
      </PrefecturePopulationProvider>,
    );

    const totalPopulationRadio = screen.getByLabelText("総人口");
    const youngPopulationRadio = screen.getByLabelText("年少人口");
    const workingAgePopulationRadio = screen.getByLabelText("生産年齢人口");
    const elderlyPopulationRadio = screen.getByLabelText("老年人口");

    // 初期状態の確認
    expect(totalPopulationRadio).toBeChecked();
    expect(youngPopulationRadio).not.toBeChecked();
    expect(workingAgePopulationRadio).not.toBeChecked();
    expect(elderlyPopulationRadio).not.toBeChecked();

    // ラジオボタンをクリックして選択状態を変更
    fireEvent.click(youngPopulationRadio);
    expect(youngPopulationRadio).toBeChecked();

    fireEvent.click(workingAgePopulationRadio);
    expect(workingAgePopulationRadio).toBeChecked();

    fireEvent.click(elderlyPopulationRadio);
    expect(elderlyPopulationRadio).toBeChecked();
  });
});
