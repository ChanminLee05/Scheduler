export interface Shift {
    label: string;
    sideLabels: string[];
    shifts: string[];
    editableCells: number[];
}
export const rows: Shift[] = [
    {
        label: 'Lunch',
        sideLabels: ['A', 'B', 'BAR'],
        shifts: ['11:00-3:30', '12:30-4:30'],
        editableCells: Array.from({ length: 7 }, (_, i) => i + 1)
    },
    {
        label: 'Dinner',
        sideLabels: ['A', 'B', 'BAR'],
        shifts: ['3:30-1st CUT', '4:30-2nd CUT', '5:30-STAY'],
        editableCells: Array.from({ length: 7 }, (_, i) => i + 1)
    },
    {
        label: 'Training',
        sideLabels: ['SERVER', 'HOST', 'BAR'],
        shifts: ['3:30-STAY', '4:00-LC'],
        editableCells: Array.from({ length: 7 }, (_, i) => i + 1)
    }
];