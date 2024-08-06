import React, {useState} from 'react';
import "./Main.css";
import Graph from "./Graph/Graph";
import {employeeSchedule, fulltimeEmployeeSchedule} from "../entities/Employees";
import Checkbox from "./Checkbox/Checkbox";


const Main: React.FC = () => {
    const [startDate, setStartDate] = useState<string | null>("N/A");
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    }

    return (
        <div className="main-page">
            <h1>Baekjeong Scheduler</h1>
            <Checkbox />
            <p>Select Start Date</p><input type="date" id="date-input" onChange={handleDate}/>
            <Graph startDate={startDate} employees={employeeSchedule} fulltimeEmployees={fulltimeEmployeeSchedule}/>
        </div>
    );
};

export default Main;
