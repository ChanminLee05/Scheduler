import React, {useState} from 'react';
import "./Main.css";
import Graph from "./Graph/Graph";
import {Employees, partTimeEmployeeSchedule, fulltimeEmployeeSchedule} from "../entities/Employees";
import Checkbox from "./Checkbox/Checkbox";
import Baekjeong from "../assets/baekjeong.png";


const Main: React.FC = () => {
    const [startDate, setStartDate] = useState<string | null>("N/A");
    const [fullTimeEmployees, setFullTimeEmployees] = useState(fulltimeEmployeeSchedule);
    const [partTimeEmployees, setPartTimeEmployees] = useState(partTimeEmployeeSchedule);
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    }

    const handleEmployeeAvailabilityChange = (updatedFullTimeEmployees: Employees[], updatedPartTimeEmployees: Employees[]) => {
        setFullTimeEmployees(updatedFullTimeEmployees);
        setPartTimeEmployees(updatedPartTimeEmployees);
    };

    return (
        <div className="main-page">
            <img src={Baekjeong} alt={Baekjeong} className="baekjeong-img"/>
            <h1>Baekjeong Scheduler</h1>
            <Checkbox
                fullTimeEmployees={fullTimeEmployees}
                partTimeEmployees={partTimeEmployees}
                onAvailabilityChange={handleEmployeeAvailabilityChange}
            />
            <p>Select Start Date</p>
            <input type="date" id="date-input" onChange={handleDate}/>
            <Graph
                startDate={startDate}
                fullTimeEmployees={fullTimeEmployees}
                partTimeEmployees={partTimeEmployees}
            />
        </div>
    );
};

export default Main;
