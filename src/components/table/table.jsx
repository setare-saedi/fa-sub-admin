import React from "react";

export default function Table({ data, titles, caption }) {

    return (
        <table className="w-full table-auto bg-gray-50 border border-gray-300 border-separate">
            {
                caption && <caption className="caption-top mb-2 mt-1">
                    {caption}
                </caption>
            }

            <thead>
                <tr>
                    {
                        titles.map(title => <th key={title.id} className=" border border-slate-300"> {title.title}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(item =>
                        <tr key={item.id}>
                            <td className=" border border-slate-300">{item.text}</td>
                            <td className=" border border-slate-300">{item.date}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}