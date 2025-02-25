export interface population {
  year: number;
  message: string;
  result: {
    boundaryYear: number;
    data: Array<{
      label: string;
      data: Array<{
        year: number;
        value: number;
      }>;
    }>;
  };
}
