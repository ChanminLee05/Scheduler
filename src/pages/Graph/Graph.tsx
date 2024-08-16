import React, {useState} from 'react';
import "./Graph.css";
import {Employees} from "../../entities/Employees";
import {days} from "../../entities/Date";
import {getDate, formatDay, isHoliday} from "../../features/TimeController";
import {useEditName} from "../../features/UseEditName";
import {generateCells, generateDynamicCells } from "../../features/CellUtills";
import {lunchShift, dinnerShift, trainingShift, hostShift} from "../../entities/Shifts";
import html2canvas from "html2canvas";

interface GraphProps {
    startDate: string | null;
    fullTimeEmployees: Employees[];
    partTimeEmployees: Employees[];
}
const Graph: React.FC<GraphProps> = ({ startDate, fullTimeEmployees, partTimeEmployees}) => {
    const [data, setData] = useState<{ [key: number]: string[] }>({});

    const dates = startDate ? getDate(startDate) : [];

    const usedEmployees: Record<number, Set<string>> = {};

    const getFulltimeEmployeeName = (name: string) => {
        return fullTimeEmployees.find(fullTimeEmployee => fullTimeEmployee.name === name);
    }

    const manager = getFulltimeEmployeeName("WILL");
    const hyobin = getFulltimeEmployeeName("HYOBIN");
    const yunseon = getFulltimeEmployeeName("YUNSEON");

    const { editName } = useEditName({ data, setData});

    const handleSave = () => {
        const element = document.getElementById("schedule-table");
        if (element) {
            const confirm = window.confirm("Are you sure to save this image?");
            if (confirm) {
                html2canvas(element).then(canvas => {
                    const link = document.createElement("a");
                    link.download = "baekjeong-schedule.png";
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                })
            }
        }
    }

    return (
        <>
            <button type="button" className="save-btn" onClick={handleSave}><i className="fa-solid fa-share-from-square"></i></button>
            <div className="schedule-graph">
                <table id="schedule-table">
                    <tbody>
                    <tr className="head-row">
                        <th></th>
                        <th></th>
                        <th></th>
                        {days.map((day, index) => (
                            <th key={index} className="day-head">{day}</th>
                        ))}
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        {dates && dates.map((date, index) => (
                            <td key={index} className="day-row" style={{ color: isHoliday(date) ? 'red' : 'black'}}>
                                {formatDay(date)}
                            </td>
                        ))}
                    </tr>
                    <tr className="manager-row">
                        <td></td>
                        <td></td>
                        <td></td>
                        {generateCells(3, 1, 4, () => manager?.name || '', editName)}
                        <td className="schedule editable">{editName(1,5,'OFF')}</td>
                        <td className="schedule editable">{editName(1,6,manager?.name || '')}</td>
                        <td className="schedule editable">{editName(1,7,'OFF')}</td>
                    </tr>
                    <tr>
                        <td className="full-time-txt" colSpan={2}>FULL TIME</td>
                        <td className="time-slot">{hyobin?.name}</td>
                        <td className="schedule time-slot">11:00-8:00</td>
                        <td className="schedule time-slot">OFF</td>
                        <td className="schedule time-slot">OFF</td>
                        <td className="schedule time-slot">3:30-STAY</td>
                        <td className="schedule time-slot">3:30-STAY</td>
                        <td className="schedule time-slot">3:30-LC</td>
                        <td className="schedule time-slot">11:00-8:00</td>
                    </tr>
                    <tr>
                        <td className="full-time-txt" colSpan={2}>FULL TIME</td>
                        <td className="time-slot">{yunseon?.name}</td>
                        <td className="schedule time-slot">11:00-CUT</td>
                        <td className="schedule time-slot">3:30-STAY</td>
                        <td className="schedule time-slot">OFF</td>
                        <td className="schedule time-slot">OFF</td>
                        <td className="schedule time-slot">3:30-STAY</td>
                        <td className="schedule time-slot">3:30-CUT</td>
                        <td className="schedule time-slot">11:00-CUT</td>
                    </tr>

                    {/*Lunch*/}
                    {lunchShift.map((shift, lunchIndex) => (
                        <React.Fragment key={lunchIndex}>
                            {shift.position.map((position, posIndex) => (
                                <tr key={`${lunchIndex}-${posIndex}-1`} className="side-row" >
                                    {posIndex === 0 && <th rowSpan={6}>{shift.shift}</th>}
                                    <td className="side">{position}</td>
                                    <td className="shift-time">{shift.shiftTime[0]}</td>
                                    {posIndex === 0 && (
                                        <>
                                            {generateCells(6,1,1, () => shift.employees[0] || '', editName)}
                                            {generateCells(6,2,6, () => '', editName)}
                                            {generateCells(6,7,7, () => shift.employees[1] || '', editName)}
                                        </>
                                    )}
                                    {posIndex === 1 && (
                                        <>
                                            {generateDynamicCells(editName, 7,1,1, usedEmployees, "DAY",'B') }
                                            {generateCells(7,2,6, () => '', editName)}
                                            {generateDynamicCells(editName, 7,7,7, usedEmployees, "DAY",'B') }
                                        </>
                                    )}
                                    {posIndex === 2 && (
                                        <>
                                            {generateCells(8,1,1, () => shift.employees[1] || '', editName)}
                                            {generateCells(8,2,6, () => '', editName)}
                                            {generateCells(8,7,7, () => shift.employees[0] || '', editName)}
                                        </>
                                    )}
                                </tr>
                            ))}
                            {shift.position.map((position, posIndex) => (
                                <tr key={`${lunchIndex}-${posIndex}-2`}>
                                    <td className="side">{position}</td>
                                    <td className="shift-time">{shift.shiftTime[1]}</td>
                                    {generateCells(9,1,7, () => '', editName)}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}

                    <tr className="row-break">
                        <td colSpan={days.length + 3}></td>
                    </tr>

                    {/*dinner*/}
                    {dinnerShift.map((shift, dinnerIndex) => (
                        <React.Fragment key={dinnerIndex}>
                            {shift.position.map((position, posIndex) => (
                                <tr key={`${dinnerIndex}-${posIndex}-1`} className="side-row">
                                    {posIndex === 0 && <th rowSpan={11}>{shift.shift}</th>}
                                    <td className="side">{position}</td>
                                    <td className="shift-time">{shift.shiftTime[0]}</td>
                                    {posIndex === 0 && (
                                        <>
                                            {generateCells(13,1,1, () => shift.employees[0] || '', editName)}
                                            {generateDynamicCells(editName, 13,2,4, usedEmployees, "NIGHT",'A') }
                                            {generateCells(13,5,5, () => shift.employees[3] || '', editName)}
                                            {generateDynamicCells(editName, 13,6,6, usedEmployees, "NIGHT",'A') }
                                            {generateCells(13,7,7, () => shift.employees[1] || '', editName)}
                                        </>
                                    )}
                                    {posIndex === 1 && (
                                        <>
                                            {generateDynamicCells(editName, 14,1,1, usedEmployees, "NIGHT",'B') }
                                            {generateCells(14,2,2, () => shift.employees[2] || '', editName)}
                                            {generateDynamicCells(editName, 14,3,5, usedEmployees, "NIGHT",'B') }
                                            {generateCells(14,6,6, () => shift.employees[2] || '', editName)}
                                            {generateDynamicCells(editName, 14,7,7, usedEmployees, "NIGHT",'B') }
                                        </>
                                    )}
                                    {posIndex === 2 && (
                                        <>
                                            {generateCells(15,1,1, () => shift.employees[1] || '', editName)}
                                            {generateDynamicCells(editName, 15,2,3, usedEmployees, "NIGHT",'BAR') }
                                            {generateCells(15,4,4, () => shift.employees[3] || '', editName)}
                                            {generateCells(15,5,5, () => shift.employees[2] || '', editName)}
                                            {generateCells(15,6,6, () => shift.employees[3] || '', editName)}
                                            {generateCells(15,7,7, () => shift.employees[0] || '', editName)}
                                        </>
                                    )}
                                </tr>
                            ))}
                            {shift.position.map((position, posIndex) => (
                                <tr key={`${dinnerIndex}-${posIndex}-2`} className="side-row">
                                    <td className="side">{position}</td>
                                    <td className="shift-time">{shift.shiftTime[1]}</td>
                                    {posIndex === 0 && (
                                        <>
                                            {generateDynamicCells(editName, 16,1,1, usedEmployees, "NIGHT",'A')}
                                            {generateCells(16,2,4, () => 'X', editName)}
                                            {generateDynamicCells(editName, 16,5,7, usedEmployees, "NIGHT",'A')}
                                        </>
                                    )}
                                    {posIndex === 1 && (
                                        <>
                                            {generateDynamicCells(editName, 17,1,7, usedEmployees, "NIGHT",'B')}
                                        </>
                                    )}
                                    {posIndex === 2 && (
                                        <>
                                            {generateDynamicCells(editName, 18,1,7, usedEmployees, "NIGHT",'BAR')}
                                        </>
                                    )}
                                </tr>
                            ))}
                            {shift.position.map((position, posIndex) => (
                                <tr key={`${dinnerIndex}-${posIndex}-2`} className="side-row">
                                    <td className="side">{position}</td>
                                    <td className="shift-time">{shift.shiftTime[2]}</td>
                                    {posIndex === 0 && (
                                        <>
                                            {generateDynamicCells(editName, 19,1,4, usedEmployees, "NIGHT",'A')}
                                            {generateCells(19,5,5, () => 'X', editName)}
                                            {generateDynamicCells(editName, 19,6,7, usedEmployees, "NIGHT",'A')}
                                        </>
                                    )}
                                    {posIndex === 1 && (
                                        <>
                                            {generateDynamicCells(editName, 20,1,1, usedEmployees, "NIGHT",'B')}
                                            {generateCells(20,2,5, () => 'X', editName)}
                                            {generateDynamicCells(editName, 20,6,7, usedEmployees, "NIGHT",'B')}
                                        </>
                                    )}
                                    {posIndex === 2 && (
                                        <>
                                            {generateDynamicCells(editName, 21,1,1, usedEmployees, "NIGHT",'BAR')}
                                            {generateCells(21,2,5, () => 'X', editName)}
                                            {generateDynamicCells(editName, 21,6,7, usedEmployees, "NIGHT",'BAR')}
                                        </>
                                    )}
                                </tr>

                            ))}

                            <tr className="row-break">
                                <td colSpan={days.length + 2}></td>
                            </tr>

                            {/*Host*/}
                            {hostShift.map((shift, hostIndex) => (
                                <React.Fragment key={hostIndex}>
                                    {shift.position.map((position, posIndex) => (
                                        <tr key={`${hostIndex}-${posIndex}-1`} className="side-row">
                                            <td className="side">{position}</td>
                                            <td className="shift-time">{shift.shiftTime[0]}</td>
                                            {posIndex === 0 && (
                                                <>
                                                    {generateDynamicCells(editName, 23,1,7, usedEmployees, "NIGHT",'HOST')}
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}

                    <tr className="row-break">
                        <td colSpan={days.length + 3}></td>
                    </tr>
                    {/*Training*/}
                    {trainingShift.map((shift, trainingIndex) => (
                        <React.Fragment key={trainingIndex}>
                            {shift.position.map((position, posIndex) => (
                                <tr key={`${trainingIndex}-${posIndex}-1`} className="side-row">
                                    {posIndex === 0 && <th rowSpan={3}>{shift.shift}</th>}
                                    <td className="side">{position}</td>
                                    <td className="shift-time">{shift.shiftTime[0]}</td>
                                    {posIndex === 0 && (
                                        <>
                                            {generateCells(25,1,7, () => '', editName)}
                                        </>
                                    )}
                                    {posIndex === 1 && (
                                        <>
                                            {generateCells(25,1,7, () => '', editName)}
                                        </>
                                    )}
                                    {posIndex === 2 && (
                                        <>
                                            {generateCells(25,1,7, () => '', editName)}
                                        </>
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default Graph;
