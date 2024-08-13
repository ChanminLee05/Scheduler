import React, {useState} from 'react';
import "./Checkbox.css";
import {fulltimeEmployeeSchedule, partTimeEmployeeSchedule, Employees} from "../../entities/Employees";
import {days} from "../../entities/Date";

interface CheckboxProps {
    fullTimeEmployees: Employees[];
    partTimeEmployees: Employees[];
    onAvailabilityChange: (updatedFullTimeEmployees: Employees[], updatedPartTimeEmployees: Employees[]) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ fullTimeEmployees, partTimeEmployees, onAvailabilityChange }) => {
    const [tempFullTimeEmployees, setTempFullTimeEmployees] = useState(fullTimeEmployees);
    const [tempPartTimeEmployees, setTempPartTimeEmployees] = useState(partTimeEmployees);

    const handleCheckboxChange = (employeeIndex: number, day: string, isFullTime: boolean) => (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        if (event) {
            const { checked } = event.target as HTMLInputElement;

            const updateEmployeeAvailability = (employees: typeof fulltimeEmployeeSchedule | typeof partTimeEmployeeSchedule) => {
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

    const handleSubmit = () => {
        onAvailabilityChange(tempFullTimeEmployees, tempPartTimeEmployees);
    }

    return (
        <form className="checkbox-page" onSubmit={handleSubmit}>
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
                                            <span className="emp-name">
                                                {fullTimeEmployee.name}<i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <button type="button" className="remove-btn">
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
                                                           defaultChecked={
                                                               (() => {
                                                                   const savedFullTimeEmployees = localStorage.getItem("FullTimeEmployees");

                                                                   if (savedFullTimeEmployees) {
                                                                       const fullTimeEmployees = JSON.parse(savedFullTimeEmployees) as typeof fulltimeEmployeeSchedule;
                                                                       const employee = fullTimeEmployees.find(emp => emp.name === fullTimeEmployee.name);

                                                                       if (employee) {
                                                                           return employee.availableDay.includes(day)
                                                                       }
                                                                   }
                                                                   return fullTimeEmployee.availableDay.includes(day);
                                                               })()
                                                           }
                                                           onChange={handleCheckboxChange(empIndex, day, true)}
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
                                <button type="button" className="add-btn">
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
                                            <span className="emp-name">
                                                {partTimeEmployee.name}<i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <button type="button" className="remove-btn">
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
                                                           defaultChecked={
                                                               (() => {
                                                                   const savedPartTimeEmployees = localStorage.getItem("PartTimeEmployees");

                                                                   if (savedPartTimeEmployees) {
                                                                       const partTimeEmployees = JSON.parse(savedPartTimeEmployees) as typeof partTimeEmployeeSchedule;
                                                                       const employee = partTimeEmployees.find(emp => emp.name === partTimeEmployee.name);

                                                                       if (employee) {
                                                                           return employee.availableDay.includes(day)
                                                                       }
                                                                   }
                                                                   return partTimeEmployee.availableDay.includes(day);
                                                               })()
                                                           }
                                                           onChange={handleCheckboxChange(empIndex, day, false)}
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
                                <button type="button" className="add-btn">
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
