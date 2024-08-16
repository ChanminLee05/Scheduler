export interface Shift {
    shift: string;
    position: string[];
    shiftTime: string[];
    employees: string[];
}

export const lunchShift: Shift[] = [
    {
        shift: 'LUNCH',
        position: ['A', 'B', 'BAR'],
        shiftTime: ['11:00-3:30', '12:30-4:30'],
        employees: ["YUNSEON(D)", "HYOBIN(D)", "YUNSEON", "HYOBIN"]
    }
]

export const dinnerShift: Shift[] = [
    {
        shift: 'DINNER',
        position: ['A', 'B', 'BAR'],
        shiftTime: ['3:30-1st CUT', '4:30-2nd CUT', '5:30-STAY'],
        employees: ["YUNSEON(D)", "HYOBIN(D)", "YUNSEON", "HYOBIN"]
    }
]

export const hostShift: Omit<Shift, "employees" | "shift">[] = [
    {
        position: ['HOST'],
        shiftTime: ['4:00-LastCall']
    }
]

export const trainingShift: Omit<Shift, "employees">[] = [
    {
        shift: 'TRAINEE',
        position: ['SERVER', 'HOST', 'BAR'],
        shiftTime: ['3:30-STAY', '4:00-LC'],
    }
]