export interface Shift {
    shift: string;
    position: string[];
    shiftTime: string[];
    employees: string[][];
}

export const lunchShift: Shift[] = [
    {
        shift: 'Lunch',
        position: ['A', 'B', 'BAR'],
        shiftTime: ['11:00-3:30', '12:30-4:30'],
        employees: [["YUNSEON(D)", "HYOBIN(D)"], ["HYOBIN(D)", "YUNSEON(D)"]],
    }
]

export const dinnerShift: Omit<Shift, "employees">[] = [
    {
        shift: 'Dinner',
        position: ['A', 'B', 'BAR'],
        shiftTime: ['3:30-1st CUT', '4:30-2nd CUT', '5:30-STAY'],

    }
]

export const trainningShift: Omit<Shift, "employees">[] = [
    {
        shift: 'Training',
        position: ['SERVER', 'HOST', 'BAR'],
        shiftTime: ['3:30-STAY', '4:00-LC'],
    }
]