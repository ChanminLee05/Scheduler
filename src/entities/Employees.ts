export interface Employees {
    name: string;
    availableDate: string[];
    availableTime: string[];
    availablePosition: string[];
    maxShifts: number;
}

export const fulltimeEmployeeSchedule: Employees[] = [
    { name: "WILL", availableDate: ["SUN", "MON", "TUE", "WED", "OFF", "FRI", "OFF"], availableTime: ["DAY", "NIGHT"], availablePosition: ["Manager", "HOST"], maxShifts: 5},
    { name: "HYOBIN", availableDate: ["SUN", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 5},
    { name: "YUNSEON", availableDate: ["SUN", "MON", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 5},
]
export const employeeSchedule: Employees[] =[
    { name: "LEO", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "NAEUN", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "CHANMIN", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "KEVIN", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "JUDE", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "CHAEA", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "AMANDA", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "KITTY", availableDate: ["MON", "FRI"], availableTime: ["NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 2},
    { name: "EUNVIN", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "JUHEON", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "SIMON", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "DAVID", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "EDDIE", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 3},
    { name: "ANGELINA", availableDate: ["MON", "TUE", "WED", "THU"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 2},
    { name: "GRACE", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR"], maxShifts: 3},
    { name: "HAN", availableDate: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], availableTime: ["DAY", "NIGHT"], availablePosition : ["A", "B", "BAR", "HOST"], maxShifts: 2}
]
