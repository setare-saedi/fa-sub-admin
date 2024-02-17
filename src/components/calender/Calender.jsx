import React from "react";
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import "react-multi-date-picker/styles/colors/teal.css"

export default function Calender() {

    return (
        <>
            <Calendar
                className="teal custom-calendar"
                plugins={[weekends([6])]}
                calendar={persian}
                locale={persian_fa}
            />
        </>
    )
}