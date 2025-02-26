import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "./index";
import "@testing-library/jest-dom";
import { checkbox } from "@/types/checkbox";

const mockOnChange = jest.fn();

const defaultProps: checkbox = {
  prefCode: 1,
  prefName: "北海道",
  isChecked: false,
  onChange: mockOnChange,
};

describe("CheckBox", () => {
  it("renders correctly", () => {
    render(<CheckBox {...defaultProps} />);
    expect(screen.getByLabelText("北海道")).toBeInTheDocument();
    expect(screen.getByLabelText("北海道")).not.toBeChecked();
  });

  it("renders as checked when isChecked is true", () => {
    render(<CheckBox {...defaultProps} isChecked={true} />);
    expect(screen.getByLabelText("北海道")).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    render(<CheckBox {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("北海道"));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
