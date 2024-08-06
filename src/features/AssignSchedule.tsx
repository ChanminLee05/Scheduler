import {Employees, employeeSchedule, fulltimeEmployeeSchedule} from "../entities/Employees";

const getEmployeeAvailableDay = (day: string) => {
    const partTimeEmployees = employeeSchedule.filter(employee => employee.availableDay.includes(day));
    const fullTimeEmployees = fulltimeEmployeeSchedule.filter(fullTimeEmployee => fullTimeEmployee.availableDay.includes(day));
    return [...partTimeEmployees, ...fullTimeEmployees];
};

const getEmployeeAvailableTime = (employees: Employees[], timeOfDay: "DAY" | "NIGHT") => {
    return employees.filter(employee => employee.availableTime.includes(timeOfDay));
};

export const assignToSchedule = (day: string, timeOfDay: "DAY" | "NIGHT", position?: string): string => {
    const availableEmployeesOnDay = getEmployeeAvailableDay(day);
    let availableEmployees: Employees[] = getEmployeeAvailableTime(availableEmployeesOnDay, timeOfDay);

    if (position) {
        availableEmployees = availableEmployees.filter(employee => employee.availablePosition.includes(position));
    }

    if (availableEmployees.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableEmployees.length);
        const selectedEmployee = availableEmployees[randomIndex];

        if (selectedEmployee && selectedEmployee.name) {
            return selectedEmployee.name;
        } else {
            return 'No valid employee available';
        }
    } else {
        return 'No employees available';
    }
}



// export const assignToWeekend = (timeOfDay: "DAY" | "NIGHT", position?: string): string => {
//     let availableEmployees: Employees[] = [];
//
//     if (timeOfDay === "DAY") {
//         availableEmployees = getEmployeeAvailableDay;
//     } else if (timeOfDay === "NIGHT") {
//         availableEmployees = getEmployeeAvailableNight;
//     }
//
//     if (position) {
//         availableEmployees = availableEmployees.filter(employee => employee.availablePosition.includes(position));
//     }
//
//     if (availableEmployees.length > 0) {
//         const randomIndex = Math.floor(Math.random() * availableEmployees.length);
//         const selectedEmployee = availableEmployees[randomIndex];
//
//         if (selectedEmployee && selectedEmployee.name) {
//             return selectedEmployee.name;
//         } else {
//             return 'No valid employee available';
//         }
//     } else {
//         return 'No employees available';
//     }
// }

