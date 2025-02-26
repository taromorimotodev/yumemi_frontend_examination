import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PrefecturePopulationProvider } from "@/context/PrefecturePopulationContext";
import CheckBoxes from "./index";

const mockPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森" },
];

describe("CheckBoxes", () => {
  it("renders checkboxes correctly", () => {
    render(
      <PrefecturePopulationProvider>
        <CheckBoxes prefectures={mockPrefectures} />
      </PrefecturePopulationProvider>
    );

    expect(screen.getByLabelText("北海道")).toBeInTheDocument();
    expect(screen.getByLabelText("青森")).toBeInTheDocument();
  });

  it("updates selected prefectures when checkbox is clicked", () => {
    render(
      <PrefecturePopulationProvider>
        <CheckBoxes prefectures={mockPrefectures} />
      </PrefecturePopulationProvider>
    );

    const hokkaidoCheckbox = screen.getByLabelText("北海道");
    fireEvent.click(hokkaidoCheckbox);
    expect(hokkaidoCheckbox).toBeChecked();

    const aomoriCheckbox = screen.getByLabelText("青森");
    fireEvent.click(aomoriCheckbox);
    expect(aomoriCheckbox).toBeChecked();

    fireEvent.click(hokkaidoCheckbox);
    expect(hokkaidoCheckbox).not.toBeChecked();
  });
});