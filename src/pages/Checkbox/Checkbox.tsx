import React, {useState} from 'react';
import "./Checkbox.css";
import {fulltimeEmployeeSchedule, employeeSchedule} from "../../entities/Employees";
import {days} from "../../entities/Date";

const Checkbox: React.FC = () => {
    const [fullTimeEmployees, setFullTimeEmployees] = useState(fulltimeEmployeeSchedule);
    const [partTimeEmployees, setPartTimeEmployees] = useState(employeeSchedule);
    const [tempFullTimeEmployees, setTempFullTimeEmployees] = useState(fulltimeEmployeeSchedule);
    const [tempPartTimeEmployees, setTempPartTimeEmployees] = useState(employeeSchedule);

    const handleCheckboxChange = (employeeIndex: number, day: string, isFullTime: boolean) => (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        if (event) {
            const { checked } = event.target as HTMLInputElement; // Type assertion

            const updateEmployeeAvailability = (employees: typeof fulltimeEmployeeSchedule | typeof employeeSchedule) => {
                return employees.map((emp, index) => {
                    if (index === employeeIndex) {
                        const updatedDate = checked
                            ? [...emp.availableDay, day]
                            : emp.availableDay.filter(d => d !== day);

                        return { ...emp, availableDate: updatedDate };
                    }
                    return emp;
                });
            };

            if (isFullTime) {
                setTempFullTimeEmployees(updateEmployeeAvailability(tempFullTimeEmployees));
            } else {
                setTempPartTimeEmployees(updateEmployeeAvailability(tempPartTimeEmployees));
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFullTimeEmployees(tempFullTimeEmployees);
        setPartTimeEmployees(tempPartTimeEmployees);
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
                        {fulltimeEmployeeSchedule.map((fullTimeEmployee, empIndex) => (
                            <React.Fragment key={empIndex}>
                                <tr>
                                    <td>{fullTimeEmployee.name}</td>
                                    {days.map((day, dayIndex) => {
                                        const checkboxId = `cbx-46-${empIndex}-${dayIndex}`;
                                        return (
                                            <td key={dayIndex}>
                                                <div className="checkbox-wrapper-46">
                                                    <input className="inp-cbx"
                                                           id={checkboxId}
                                                           type="checkbox"
                                                           defaultChecked={fullTimeEmployee.availableDay.includes(day)}
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
                            <td colSpan={days.length + 1} className="part-time-text">
                                Part-Time Employees
                            </td>
                        </tr>
                        {employeeSchedule.map((employee, empIndex) => (
                            <React.Fragment key={empIndex}>
                                <tr>
                                    <td>{employee.name}</td>
                                    {days.map((day, dayIndex) => {
                                        const checkboxId = `cbx-47-${empIndex}-${dayIndex}`;
                                        return (
                                            <td key={dayIndex}>
                                                <div className="checkbox-wrapper-46">
                                                    <input className="inp-cbx"
                                                           id={checkboxId}
                                                           type="checkbox"
                                                           defaultChecked={employee.availableDay.includes(day)}
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
                </tbody>
            </table>
            <input type="submit" value="SAVE EMPLOYEE'S AVAILABLE DATE" id="save-availability-btn" />
        </form>
    );
};

export default Checkbox;
