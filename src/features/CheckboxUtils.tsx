import {Employees} from "../entities/Employees";
import React from "react";

export const handleCheckboxChange = (
    employeeIndex: number,
    day: string,
    isFullTime: boolean,
    tempFullTimeEmployees: Employees[],
    tempPartTimeEmployees: Employees[],
    setTempFullTimeEmployees: React.Dispatch<React.SetStateAction<Employees[]>>,
    setTempPartTimeEmployees: React.Dispatch<React.SetStateAction<Employees[]>>
) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
        const { checked } = event.target as HTMLInputElement;

        const updateEmployeeAvailability = (employees: Employees[]) => {
            return employees.map((emp, index) => {
                if (index === employeeIndex) {
                    const updatedDate = checked
                        ? [...emp.availableDay, day]
                        : emp.availableDay.filter(d => d !== day);

                    return { ...emp, availableDay: updatedDate };
                }
                return emp;
            });
        };

        if (isFullTime) {
            const updatedFullTimeEmployees = updateEmployeeAvailability(tempFullTimeEmployees);
            setTempFullTimeEmployees(updatedFullTimeEmployees);
            localStorage.setItem("FullTimeEmployees", JSON.stringify(updatedFullTimeEmployees));
        } else {
            const updatedPartTimeEmployees = updateEmployeeAvailability(tempPartTimeEmployees);
            setTempPartTimeEmployees(updatedPartTimeEmployees);
            localStorage.setItem("PartTimeEmployees", JSON.stringify(updatedPartTimeEmployees));
        }
    }
}

export const handleNameSave = (
    empIndex: number,
    isFullTime: boolean,
    tempFullTimeEmployees: Employees[],
    tempPartTimeEmployees: Employees[],
    setTempFullTimeEmployees: React.Dispatch<React.SetStateAction<Employees[]>>,
    setTempPartTimeEmployees: React.Dispatch<React.SetStateAction<Employees[]>>,
    setEditingIndex: React.Dispatch<React.SetStateAction<{ fullTime: number | null, partTime: number | null }>>
) => {
    const newName = prompt("Enter new name: ");

    if (newName !== null && newName.trim() !== "") {
        const updateEmployeeName = (employees: Employees[]) => {
            return employees.map((emp, index) => {
                if (index === empIndex) {
                    return {...emp, name: newName.toUpperCase()};
                }
                return emp;
            });
        };

        if (isFullTime) {
            const updatedFullTimeEmployees = updateEmployeeName(tempFullTimeEmployees);
            setTempFullTimeEmployees(updatedFullTimeEmployees);
            localStorage.setItem("FullTimeEmployees", JSON.stringify(updatedFullTimeEmployees));
        } else {
            const updatedPartTimeEmployees = updateEmployeeName(tempPartTimeEmployees);
            setTempPartTimeEmployees(updatedPartTimeEmployees);
            localStorage.setItem("PartTimeEmployees", JSON.stringify(updatedPartTimeEmployees));
        }

        setEditingIndex({ fullTime: null, partTime: null });
    }
};

export const getEmployeeName = (empName: string, isFullTime: boolean): string => {
    const savedEmployees = localStorage.getItem(isFullTime ? "FullTimeEmployees" : "PartTimeEmployees");

    if (savedEmployees) {
        const employees = JSON.parse(savedEmployees) as Employees[];
        const employee = employees.find(emp => emp.name === empName);

        if (employee) {
            return employee.name;
        }
    }
    return empName;
}

export const handleSubmit = (
    tempFullTimeEmployees: Employees[],
    tempPartTimeEmployees: Employees[],
    onAvailabilityChange: (updatedFullTimeEmployees: Employees[], updatedPartTimeEmployees: Employees[]) => void
) => {
    onAvailabilityChange(tempFullTimeEmployees, tempPartTimeEmployees);
};