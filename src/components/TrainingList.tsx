import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings))
    }

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 200, sortable: true },
        { field: 'duration', headerName: 'Duration', width: 200, sortable: true },
        { field: 'activity', headerName: 'Activity', width: 200, sortable: true },
        {
            field: 'firstname',
            headerName: 'Firstname',
            width: 200,
            sortable: true
        },

        {
            field: 'lastname',
            headerName: 'Lastname',
            width: 200,
            sortable: true
        }
    ]

    return (
        <div style={{ width: '90%', height: 500, margin: 'auto' }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={row => row._links.self.href}
                autoPageSize
            />
        </div>
    );
}

export default TrainingList;