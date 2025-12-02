import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";


const locales = { fi };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export default function TrainingCalendar() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch(
            "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
        )
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map((t) => ({
                    title: `${t.activity} - ${t.customer.firstname} ${t.customer.lastname}`,
                    start: new Date(t.date),
                    end: new Date(new Date(t.date).getTime() + t.duration * 60000),
                }));
                setBookings(mapped);
            });
    };

    return (
<div style={{ padding: 20, marginTop: 64, height: "80vh" }}>
            <h2>Training Calender</h2>
            <BigCalendar
                localizer={localizer}
                events={bookings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                views={["month", "week", "day"]}
                defaultView="month"

            />
        </div>
    )
}