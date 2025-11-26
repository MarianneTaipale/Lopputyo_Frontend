import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
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
        { field: 'date', headerName: 'Date' },
        { field: 'duration', headerName: 'Duration' },
        { field: 'activity', headerName: 'Activity' }
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