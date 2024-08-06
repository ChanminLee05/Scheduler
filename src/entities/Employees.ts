export interface Employees {
    name: string;
    availableDay: string[];
    availableTime: string[];
    availablePosition: string[];
    maxShifts: number;
}

export const fulltimeEmployeeSchedule: Employees[] = [
    { name: "WILL", availableDay: ["SUN", "MON", "TUE", "WED", "FRI"], availableTime: ["DAY", "NIGHT"], availablePosition: ["Manager", "HOST"], maxShifts: 5},
    { name: "HYOBIN", availableDay: ["SUN", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 5},
    { name: "YUNSEON", availableDay: ["SUN", "MON", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 5},
]
export const employeeSchedule: Employees[] =[
    { name: "LEO", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "NAEUN", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "CHANMIN", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "KEVIN", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "JUDE", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "CHAEA", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "AMANDA", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "KITTY", availableDay: ["MON", "FRI"], availableTime: ["NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 2},
    { name: "EUNVIN", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "JUHEON", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "SIMON", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "DAVID", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "EDDIE", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "ANGELINA", availableDay: ["MON", "TUE", "WED", "THU"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 2},
    { name: "GRACE", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "HAN", availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 2}
]
