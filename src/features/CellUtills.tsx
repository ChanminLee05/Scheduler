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
        // console.log("index and value", `${cellIndex} and ${value}`)
        const handleClick = () => {
            const newValue = prompt("Enter new name:", value);
            if (newValue) {
                setValue(newValue.toUpperCase())
                editName(rowIndex, cellIndex, newValue.toUpperCase());
            }
        };

        return (
            <td key={cellIndex} className="schedule editable" onClick={handleClick}>
                {value}
            </td>
        );
    });
}

const getDayOfWeek = (index: number): string => {
    return index >= 1 && index <= days.length ? days[index - 1] : "Invalid day";
};

export const generateDynamicCells = (
    editName: (rowIndex: number, cellIndex: number, value: string) => JSX.Element,
    rowIndex: number,
    startCellIndex: number,
    endCellIndex: number,
    usedEmployees: Record<number, Set<string>>,
    timeOfDay?: "DAY" | "NIGHT",
    position?: string
) => {
    const getEmployeeNameForCell = (cellIndex: number): string => {
        const dayOfWeek = getDayOfWeek(cellIndex);
        if (dayOfWeek === "Invalid day" || !timeOfDay) {
            return "Invalid data";
        }

        return assignToSchedule(dayOfWeek, timeOfDay, usedEmployees, position, cellIndex);
    };

    return generateCells(rowIndex, startCellIndex, endCellIndex, getEmployeeNameForCell, editName);
}