import React, {useState} from "react";

interface EditScheduleProps {
    data: { [key: number]: string[] };
    setData: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
    isEditing: { rowIndex: number; cellIndex: number } | null;
    setIsEditing: React.Dispatch<React.SetStateAction<{ rowIndex: number; cellIndex: number } | null>>;
}

export const useEditSchedule = ({ data, setData, isEditing, setIsEditing}: EditScheduleProps) => {
    const [cellValue, setCellValue] = useState<string>('');

    const handleEditClick = (rowIndex: number, cellIndex: number, value: string) => {
        setIsEditing({ rowIndex, cellIndex });
        setCellValue(value || '');
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCellValue(e.target.value);
    }

    const handleBlur = () => {
        if (isEditing) {
            const { rowIndex, cellIndex } = isEditing;
            const newData = { ...data };
            if (!newData[rowIndex]) newData[rowIndex] = [];
            newData[rowIndex][cellIndex] = cellValue;
            setData(newData);
        }
        setIsEditing(null);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    }
    const renderCell = (rowIndex: number, cellIndex: number, value: string) => {
        const currentValue = data[rowIndex]?.[cellIndex] ?? value;

        if (isEditing && isEditing.rowIndex === rowIndex && isEditing.cellIndex === cellIndex) {
            return (
                <input
                    type="text"
                    value={cellValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                />
            )
        }
        return (
            <div onClick={() => handleEditClick(rowIndex, cellIndex, currentValue)}>
                {currentValue.toUpperCase() || '\u200B'}
            </div>
        )
    }

    const generateCells = (rowIndex: number, startCellIndex: number, endCellIndex: number, defaultValue: string) => {
        const cells = [];
        for (let i = startCellIndex; i <= endCellIndex; i++) {
            cells.push(
                <td key={i} className="schedule editable">
                    {renderCell(rowIndex ,i, defaultValue)}
                </td>
            )
        }
        return cells;
    }

    return {
        handleEditClick,
        handleInputChange,
        handleBlur,
        handleKeyDown,
        renderCell,
        generateCells
    }
}

