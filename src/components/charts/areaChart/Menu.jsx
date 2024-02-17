import React, { useState } from "react";





const dropdownCategories = [
    {
        key: 0,
        content: "یک هفته گذشته",
        value: "week",
    },
    {
        key: 1,
        content: "سی روز گذشته",
        value: "days",
    },
    {
        key: 2,
        content: "یک سال گذشته",
        value: "months",
    },
];

const DropdownSelector = ({ fetchCustomData }) => {

    const [activeTimeFrame, setActiveTimeFrame] = useState(2);

    const handleDataFetching = (items) => {
        let selected= dropdownCategories.filter( e => e.key == items)
        let key=selected[0].key;
        let value=selected[0].value;
        let content = selected[0].content;
        setActiveTimeFrame(key);
        fetchCustomData(value, content);

    };

    return (
        <div >
            <select className=" py-1 px-2 border outline-none border-gray-200 mb-6" onChange={(e) => handleDataFetching(e.target.value)}>
            {
                dropdownCategories.map(item => <option key={item.key} value={item.key}>
                    {item.content}
                </option>)
            }
            </select>
        </div>
    );
};
export default DropdownSelector