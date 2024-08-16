import {Employees} from "../entities/Employees";

const getAvailableEmployees = (
    day: string,
    timeOfDay: "DAY" | "NIGHT",
    position?: string
): Employees[] => {
    const fullTimeEmployees = JSON.parse(localStorage.getItem("FullTimeEmployees") || '[]') as Employees[];
    const partTimeEmployees = JSON.parse(localStorage.getItem("PartTimeEmployees") || '[]') as Employees[];

    const availableFullTimeEmployees = fullTimeEmployees.filter(employee => employee.availableDay.includes(day));
    const availablePartTimeEmployees = partTimeEmployees.filter(employee => employee.availableDay.includes(day));

    let availableEmployees = [...availableFullTimeEmployees, ...availablePartTimeEmployees];

    if (position) {
        availableEmployees = availableEmployees.filter(employee => employee.availablePosition.includes(position));
    }

    return availableEmployees.filter(employee => employee.availableTime.includes(timeOfDay));
};

const getRandomEmployee = (employees: Employees[], usedEmployees: Set<string>): string | null => {
    const filteredEmployees = employees.filter(employee => !usedEmployees.has(employee.name));

    if (filteredEmployees.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredEmployees.length);
    return filteredEmployees[randomIndex].name;
};

export const assignToSchedule = (
    day: string,
    timeOfDay: "DAY" | "NIGHT",
    usedEmployees: Record<number, Set<string>>,
    position?: string,
    columnIndex?: number
): string => {
    const excludeFullTimeNames = ["YUNSEON", "HYOBIN", "WILL"];

    const availableEmployees = getAvailableEmployees(day, timeOfDay, position);

    const availableEmployeesForColumn = columnIndex && columnIndex >= 1 && columnIndex <= 7
        ? availableEmployees.filter(employee => !excludeFullTimeNames.includes(employee.name))
        : availableEmployees;

    const columnUsedEmployees = usedEmployees[columnIndex || 0] || new Set<string>();

    const selectedEmployeeName = getRandomEmployee(availableEmployeesForColumn, columnUsedEmployees);

    if (selectedEmployeeName) {
        // Update used employees for the column
        usedEmployees[columnIndex || 0] = columnUsedEmployees;
        columnUsedEmployees.add(selectedEmployeeName);
        return selectedEmployeeName;
    } else {
        return 'No valid employee available';
    }
};


