import React, {useEffect, useState} from 'react';
import "./Checkbox.css";
import {fulltimeEmployeeSchedule, partTimeEmployeeSchedule, Employees} from "../../entities/Employees";
import {days} from "../../entities/Date";
import {
    addEmployee,
    getEmployeeName,
    handleCheckboxChange,
    handleNameSave,
    handleSubmit,
    isDayChecked, removeEmployee
} from "../../features/CheckboxUtils";

interface CheckboxProps {
    fullTimeEmployees: Employees[];
    partTimeEmployees: Employees[];
    onAvailabilityChange: (updatedFullTimeEmployees: Employees[], updatedPartTimeEmployees: Employees[]) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ fullTimeEmployees, partTimeEmployees, onAvailabilityChange }) => {
    const [tempFullTimeEmployees, setTempFullTimeEmployees] = useState(fullTimeEmployees);
    const [tempPartTimeEmployees, setTempPartTimeEmployees] = useState(partTimeEmployees);
    const [editingIndex, setEditingIndex] = useState<{ fullTime: number | null, partTime: number | null }>({ fullTime: null, partTime: null });

    useEffect(() => {
        const savedFullTimeEmployees = localStorage.getItem("FullTimeEmployees");
        const savedPartTimeEmployees = localStorage.getItem("PartTimeEmployees");

        if (savedFullTimeEmployees) {
            setTempFullTimeEmployees(JSON.parse(savedFullTimeEmployees));
        }
        if (savedPartTimeEmployees) {
            setTempPartTimeEmployees(JSON.parse(savedPartTimeEmployees));
        }
    }, []);

    const handleRemoveEmployee = (empIndex: number, isFullTime: boolean) => {
        if (isFullTime) {
            removeEmployee(empIndex, tempFullTimeEmployees, setTempFullTimeEmployees, "FullTimeEmployees");
        } else {
            removeEmployee(empIndex, tempPartTimeEmployees, setTempPartTimeEmployees, "PartTimeEmployees");
        }
    };

    const handleAddEmployee = (isFullTime: boolean) => {
        const defaultEmployee: Employees = {
            name: "NEW EMPLOYEE",
            availableDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
            availableTime: ["DAY", "NIGHT"],
            availablePosition: ["A", "B", "BAR"],
            maxShifts: 2
        };

        if (isFullTime) {
            addEmployee(tempFullTimeEmployees, setTempFullTimeEmployees, "FullTimeEmployees", defaultEmployee);
        } else {
            addEmployee(tempPartTimeEmployees, setTempPartTimeEmployees, "PartTimeEmployees", defaultEmployee);
        }
    };

    return (
        <form className="checkbox-page" onSubmit={() => handleSubmit(tempFullTimeEmployees, tempPartTimeEmployees, onAvailabilityChange)}>
            <h2>Check available date for employees</h2>
            <table>
                <tbody>
                        <tr className="head-row">
                            <td></td>
                            {days.map((day, index) => (
                                <td key={index}>{day}</td>
                            ))}
                        </tr>
                        <tr>
                            <td colSpan={days.length + 1} className="part-time-text">
                                Full-Time Employees
                            </td>
                        </tr>
                        {tempFullTimeEmployees.map((fullTimeEmployee, empIndex) => (
                            <React.Fragment key={empIndex}>
                                <tr>
                                    <td>
                                        <div className="name-btn-container">
                                            <span className="emp-name" onClick={() => handleNameSave(empIndex, true, tempFullTimeEmployees, tempPartTimeEmployees, setTempFullTimeEmployees, setTempPartTimeEmployees, setEditingIndex)}>
                                                {getEmployeeName(fullTimeEmployee.name, true)}<i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <button type="button" className="remove-btn" onClick={() => handleRemoveEmployee(empIndex, true)}>
                                                <i className="fa-solid fa-circle-minus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    {days.map((day, dayIndex) => {
                                        const checkboxId = `cbx-46-${empIndex}-${dayIndex}`;
                                        return (
                                            <td key={dayIndex}>
                                                <div className="checkbox-wrapper-46">
                                                    <input className="inp-cbx"
                                                           id={checkboxId}
                                                           type="checkbox"
                                                           defaultChecked={isDayChecked(fullTimeEmployee.name, day, true)}
                                                           onChange={handleCheckboxChange(empIndex, day, true, tempFullTimeEmployees, tempPartTimeEmployees, setTempFullTimeEmployees, setTempPartTimeEmployees)}
                                                    />
                                                    <label className="cbx" htmlFor={checkboxId}>
                                                    <span>
                                                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                        </svg>
                                                    </span>
                                                    </label>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr className="row-break">
                                    <td colSpan={days.length + 1}></td>
                                </tr>
                            </React.Fragment>
                        ))}
                        <tr>
                            <td colSpan={days.length + 1}>
                                <button type="button" className="add-btn" onClick={() => handleAddEmployee(true)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={days.length + 1} className="part-time-text">
                                Part-Time Employees
                            </td>
                        </tr>
                        {tempPartTimeEmployees.map((partTimeEmployee, empIndex) => (
                            <React.Fragment key={empIndex}>
                                <tr>
                                    <td>
                                        <div className="name-btn-container">
                                            <span className="emp-name" onClick={() => handleNameSave(empIndex, false, tempFullTimeEmployees, tempPartTimeEmployees, setTempFullTimeEmployees, setTempPartTimeEmployees, setEditingIndex)}>
                                                {getEmployeeName(partTimeEmployee.name, true)}<i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <button type="button" className="remove-btn" onClick={() => handleRemoveEmployee(empIndex, false)}>
                                                <i className="fa-solid fa-circle-minus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    {days.map((day, dayIndex) => {
                                        const checkboxId = `cbx-47-${empIndex}-${dayIndex}`;
                                        return (
                                            <td key={dayIndex}>
                                                <div className="checkbox-wrapper-46">
                                                    <input className="inp-cbx"
                                                           id={checkboxId}
                                                           type="checkbox"
                                                           defaultChecked={isDayChecked(partTimeEmployee.name, day, false)}
                                                           onChange={handleCheckboxChange(empIndex, day, false, tempFullTimeEmployees, tempPartTimeEmployees, setTempFullTimeEmployees, setTempPartTimeEmployees)}
                                                    />
                                                    <label className="cbx" htmlFor={checkboxId}>
                                                    <span>
                                                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                        </svg>
                                                    </span>
                                                    </label>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr className="row-break">
                                    <td colSpan={days.length + 1}></td>
                                </tr>
                            </React.Fragment>
                        ))}
                        <tr>
                            <td colSpan={days.length + 1}>
                                <button type="button" className="add-btn" onClick={() => handleAddEmployee(false)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                </tbody>
            </table>
            <input type="submit" value="SAVE EMPLOYEE'S AVAILABLE DATE" id="save-availability-btn" />
        </form>
    );
};

export default Checkbox;
