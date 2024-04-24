import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";
import InputIcon from "react-multi-date-picker/components/input_icon";


export default function DataPicker({value, changeDate, preDate}){
    return(
        <>
        <DatePicker
        selected={value}
        onChange={(value) => changeDate(value)}
        render={<InputIcon />}
        className="custom-calendar teal date-picker w-full "
        format="YYYY-MM-DD HH:mm:ss"
        plugins={[<TimePicker position="bottom" hStep={2} mStep={3} sStep={4}/>]}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={preDate}

      />
        </>
    )
}