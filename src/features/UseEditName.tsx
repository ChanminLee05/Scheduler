import React, {useCallback} from "react";

interface EditNameProps {
    data: { [key: number]: string[] };
    setData: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
}

export const useEditName = ({ data, setData}: EditNameProps) => {
    const handleEditClick = useCallback((rowIndex: number, cellIndex: number) => {
        const currentValue = data[rowIndex]?.[cellIndex] || '';

        const newValue = prompt("Enter new name:", currentValue);
        if (newValue !== null) {
            setData(prevData => {
                const newData = { ...prevData };
                if (!newData[rowIndex]) newData[rowIndex] = [];
                newData[rowIndex][cellIndex] = newValue.toUpperCase();
                return newData;
            });
        }

    }, [data, setData]);

    const editName = useCallback((rowIndex: number, cellIndex: number, value: string) => {
        return (
            <div onClick={() => handleEditClick(rowIndex, cellIndex)}>
                {value.toUpperCase() || '\u200B'}
            </div>
        );
    }, [handleEditClick]);

    return { editName };

}

