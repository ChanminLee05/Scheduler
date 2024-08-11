import {Employees, employeeSchedule, fulltimeEmployeeSchedule} from "../entities/Employees";

const getRandomEmployeeName = (employees: Employees[], usedEmployees: Record<string, number>) => {
    const employeeArray: string[] = [];
    employees.forEach(employee => {
        const usedShifts = usedEmployees[employee.name] || 0;
        const remainingShifts = employee.maxShifts - usedShifts;

        for (let i = 0; i < remainingShifts; i++) {
            employeeArray.push(employee.name);
        }
    });

    if (employeeArray.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * employeeArray.length);
    const selectedEmployee = employeeArray[randomIndex];
    employeeArray.splice(randomIndex, 1);

    usedEmployees[selectedEmployee] = (usedEmployees[selectedEmployee] || 0) + 1;

    return selectedEmployee;

}

export const getEmployeeAvailableDay = (day: string) => {
    const fullTimeEmployees = fulltimeEmployeeSchedule.filter(employee => employee.availableDay.includes(day));
    const partTimeEmployees = employeeSchedule.filter(employee => employee.availableDay.includes(day));
    return [...fullTimeEmployees, ...partTimeEmployees];
};

const getEmployeeAvailableTime = (employees: Employees[], timeOfDay: "DAY" | "NIGHT") => {
    return employees.filter(employee => employee.availableTime.includes(timeOfDay));
};

export const assignToSchedule = (
    day: string,
    timeOfDay: "DAY" | "NIGHT",
    usedEmployees: Record<string, number>,
    assignedEmployees: Record<string, Set<string>>,
    position?: string,
): string => {
    const availableEmployeesOnDay = getEmployeeAvailableDay(day);
    let availableEmployees: Employees[] = getEmployeeAvailableTime(availableEmployeesOnDay, timeOfDay);

    if (position) {
        availableEmployees = availableEmployees.filter(employee => employee.availablePosition.includes(position));
    }

    availableEmployees = availableEmployees.filter(employee => !assignedEmployees[day]?.has(employee.name));

    if (availableEmployees.length > 0) {
        const selectedEmployeeName = getRandomEmployeeName(availableEmployees, usedEmployees);
        if (selectedEmployeeName) {
            assignedEmployees[day] = assignedEmployees[day] || new Set();
            assignedEmployees[day].add(selectedEmployeeName);
        }

        return selectedEmployeeName || 'No valid employee available';
    } else {
        return 'No employees available';
    }
};


