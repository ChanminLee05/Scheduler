import {days} from "../entities/Date";
import {assignToSchedule} from "./AssignSchedule";
import React, {useState} from "react";
export const generateCells = (
    rowIndex: number,
    startCellIndex: number,
    endCellIndex: number,
    getText: (cellIndex: number) => string,
    editName: (
        rowIndex: number,
        cellIndex: number,
        value: string
    ) => JSX.Element
) => {
    return Array.from({ length: endCellIndex - startCellIndex + 1 }, (_, i) => {
        const cellIndex = startCellIndex + i;
        const [value, setValue] = useState(getText(cellIndex));

        const handleClick = () => {
            const newValue = prompt("Enter new name:", value);
            if (newValue) {
                setValue(newValue.toUpperCase());
                editName(rowIndex, cellIndex, newValue);
            }
        };

        return (
            <td key={cellIndex} className="schedule editable" onClick={handleClick}>
                {value}
            </td>
        );
    });
}

const getDayOfWeek = (index: number) => {
    if (index < 1 || index > days.length) {
        return '';
    }
    return days[index - 1];
}

export const generateDynamicCells = (
    editName: (rowIndex: number, cellIndex: number, value: string) => JSX.Element,
    rowIndex: number,
    startCellIndex: number,
    endCellIndex: number,
    usedEmployees: Record<string, number>,
    timeOfDay?: "DAY" | "NIGHT",
    position?: string
) => {
    const assignedEmployees: Record<string, Set<string>> = {};

    const getEmployeeNameForCell = (cellIndex: number): string => {
        const dayOfWeek = getDayOfWeek(cellIndex);
        if (!dayOfWeek) {
            return "Invalid day";
        }
        if (!timeOfDay) {
            return "Invalid time of day";
        }

        return assignToSchedule(dayOfWeek, timeOfDay, usedEmployees, assignedEmployees, position);
    };

    return generateCells(rowIndex, startCellIndex, endCellIndex, getEmployeeNameForCell, editName);
}