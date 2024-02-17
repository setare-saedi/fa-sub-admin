import React, { useState } from "react";
import MyGraph from "./Graph";
import DropdownSelector from "./Menu";
import dataSet from "./data";


function Analytics() {
  const [data, setData] = useState(dataSet.week);
  const [label, setLabel]=useState('یک هفته گذشته')
  const fetchCustomData = (key, content) => {
    setData(dataSet[key]);
    setLabel(content)
  };
  return (
    <div >
      <DropdownSelector fetchCustomData={fetchCustomData} />
      <MyGraph data={data} />
      <div className=" text-center mt-2 text-gray-900 font-light">
        دانلودهای {label}
      </div>
    </div>
  );
}
export default Analytics;