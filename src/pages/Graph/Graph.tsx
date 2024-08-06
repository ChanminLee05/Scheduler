import React, {useState} from 'react';
import "./Graph.css";
import {Employees} from "../../entities/Employees";
import {days} from "../../entities/Date";
import {getDate, formatDay, isHoliday} from "../../features/TimeController";
import {useEditSchedule} from "../../features/EditSchedule";
import {assignToSchedule} from "../../features/AssignSchedule";

interface GraphProps {
    startDate: string | null;
    employees: Employees[];
    fulltimeEmployees: Employees[];
}
const Graph: React.FC<GraphProps> = ({ startDate, employees, fulltimeEmployees }) => {
    const [isEditing, setIsEditing] = useState<{ rowIndex: number, cellIndex: number} | null>(null);
    const [data, setData] = useState<{ [key: number]: string[] }>({});

    const dates = startDate ? getDate(startDate) : [];

    const getFulltimeEmployeeName = (name: string) => {
        return fulltimeEmployees.find(fulltimeEmployee => fulltimeEmployee.name === name);
    }
    const manager = getFulltimeEmployeeName("WILL");
    const hyobin = getFulltimeEmployeeName("HYOBIN");
    const yunseon = getFulltimeEmployeeName("YUNSEON");

    const {
        renderCell,
        generateCells,
        generateDynamicCells
    } = useEditSchedule({ data, setData, isEditing, setIsEditing});

    return (
        <div className="schedule-graph">
            <table id="schedule-table">
                <tbody>
                    <tr className="head-row">
                        <th></th>
                        <th></th>
                        <th></th>
                        {days.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        {dates && dates.map((date, index) => (
                            <td key={index} style={{ color: isHoliday(date) ? 'red' : 'black'}}>
                                {formatDay(date)}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        {generateCells(1,1,4, () => manager?.name || '')}
                        <td className="schedule editable">{renderCell(1,5,'OFF')}</td>
                        <td className="schedule editable">{renderCell(1,6,manager?.name || '')}</td>
                        <td className="schedule editable">{renderCell(1,7,'OFF')}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>FULL TIME</td>
                        <td className="time-slot">{hyobin?.name}</td>
                        <td className="schedule">11:00-8:00</td>
                        <td className="schedule">OFF</td>
                        <td className="schedule">OFF</td>
                        <td className="schedule">3:30-STAY</td>
                        <td className="schedule">3:30-STAY</td>
                        <td className="schedule">3:30-LC</td>
                        <td className="schedule">11:00-8:00</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>FULL TIME</td>
                        <td className="time-slot">{yunseon?.name}</td>
                        <td className="schedule">11:00-CUT</td>
                        <td className="schedule">3:30-STAY</td>
                        <td className="schedule">OFF</td>
                        <td className="schedule">OFF</td>
                        <td className="schedule">3:30-STAY</td>
                        <td className="schedule">3:30-CUT</td>
                        <td className="schedule">11:00-CUT</td>
                    </tr>
                    <tr>
                        <th rowSpan={6}>Lunch</th>
                        <td className="side">A</td>
                        <td>11:00-3:30</td>
                        <td className="schedule editable">{renderCell(2,1,yunseon?.name + "(D)" || '')}</td>
                        {generateCells(2,2,6, () => '')}
                        <td className="schedule editable">{renderCell(2,7,hyobin?.name  + "(D)"|| '')}</td>
                    </tr>
                    <tr>
                        <td className="side">B</td>
                        <td>11:00-3:30</td>
                        {generateDynamicCells(3,1,1, "DAY",'B')}
                        {generateCells(3,2,6, () => '')}
                        {generateDynamicCells(3,6,6, "DAY",'B')}
                    </tr>
                    <tr>
                        <td className="side">BAR</td>
                        <td>11:00-3:30</td>
                        <td className="schedule editable">{renderCell(4,1,hyobin?.name + "(D)" || '')}</td>
                        {generateCells(4,2,6, () => '')}
                        <td className="schedule editable">{renderCell(4,7,yunseon?.name + "(D)" || '')}</td>
                    </tr>
                    <tr>
                        <td className="side">A</td>
                        <td>12:30-4:30</td>
                        {generateCells(5,1,7, () => '')}
                    </tr>
                    <tr>
                        <td className="side">B</td>
                        <td>12:30-4:30</td>
                        {generateCells(6,1,7, () => '')}
                    </tr>
                    <tr>
                        <td className="side">BAR</td>
                        <td>12:30-4:30</td>
                        {generateCells(7,1,7, () => '')}
                    </tr>
                    <tr className="row-break">
                        <td colSpan={days.length + 3}></td>
                    </tr>
                    {/*dinner*/}
                    <tr>
                        <th rowSpan={11}>Dinner</th>
                        <td className="side">A</td>
                        <td>3:30-1st CUT</td>
                        <td className="schedule editable">{renderCell(9,1,yunseon?.name + "(D)" || '')}</td>
                        {generateDynamicCells(9,2,6, "NIGHT", 'A')}
                        <td className="schedule editable">{renderCell(9,7,hyobin?.name + "(D)" || '')}</td>
                    </tr>
                    <tr>
                        <td className="side">B</td>
                        <td>3:30-1st CUT</td>
                        {generateDynamicCells(10,1,7, "NIGHT",'B')}
                    </tr>
                    <tr>
                        <td className="side">BAR</td>
                        <td>3:30-1st CUT</td>
                        <td className="schedule editable">{renderCell(11,1,hyobin?.name + "(D)" || '')}</td>
                        {generateDynamicCells(11,2,6, "NIGHT",'BAR')}
                        <td className="schedule editable">{renderCell(11,7,yunseon?.name + "(D)" || '')}</td>
                    </tr>
                    <tr>
                        <td className="side">A</td>
                        <td>4:30-2nd CUT</td>
                        {generateDynamicCells(12,1,7, "NIGHT",'A')}
                    </tr>
                    <tr>
                        <td className="side">B</td>
                        <td>4:30-2nd CUT</td>
                        {generateDynamicCells(13,1,7, "NIGHT",'B')}
                    </tr>
                    <tr>
                        <td className="side">BAR</td>
                        <td>4:30-2nd CUT</td>
                        {generateDynamicCells(14,1,7, "NIGHT",'BAR')}
                    </tr>
                    <tr>
                        <td className="side">A</td>
                        <td>5:30-STAY</td>
                        {generateDynamicCells(15,1,7, "NIGHT",'A')}
                    </tr>
                    <tr>
                        <td className="side">B</td>
                        <td>5:30-STAY</td>
                        {generateDynamicCells(16,1,7, "NIGHT",'B')}
                    </tr>
                    <tr>
                        <td className="side">BAR</td>
                        <td>5:30-STAY</td>
                        {generateDynamicCells(17,1,7, "NIGHT",'BAR')}
                    </tr>
                    <tr className="row-break">
                        <td colSpan={days.length + 2}></td>
                    </tr>
                    <tr>
                        <td className="side">HOST</td>
                        <td>4:00-LC</td>
                        {generateDynamicCells(19,1,7, "NIGHT",'HOST')}
                    </tr>
                    <tr>
                        <td className="row-break" colSpan={10}></td>
                    </tr>
                {/*Training*/}
                    <tr>
                        <th rowSpan={3}>TRAINEE</th>
                        <td className="side">SERVER</td>
                        <td>3:30-STAY</td>
                        {generateCells(20,1,7, () => '')}
                    </tr>
                    <tr>
                        <td className="side">HOST</td>
                        <td>4:00-LC</td>
                        {generateCells(21,1,7, () => '')}
                    </tr>
                    <tr>
                        <td className="side">BAR</td>
                        <td>3:30-STAY</td>
                        {generateCells(22,1,7, () => '')}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Graph;
