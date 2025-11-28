import { useEffect, useState } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings))
    }

    const deleteTraining = (url:string) => {
        return fetch(url, {method: "DELETE"})
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure you want to delete?")){
            deleteTraining(url)
            .then(() => fetchData())
        }
    }

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 200, sortable: true },
        { field: 'duration', headerName: 'Duration', width: 200, sortable: true },
        { field: 'activity', headerName: 'Activity', width: 200, sortable: true },
        {
            field: 'firstname',
            headerName: 'Customer',
            width: 200,
            sortable: true
        },

        {
            headerName: "",
            sortable: false,
            filterable: false,
            field: '_links.self.href',
            renderCell: (params: GridRenderCellParams)=>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        }
    ]

    return (
        <div style={{ width: '100%', height: 500, margin: 'auto' }}>
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