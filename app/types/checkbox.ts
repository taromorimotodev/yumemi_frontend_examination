export interface checkbox {
    prefCode: number;
    prefName: string;
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 }
 