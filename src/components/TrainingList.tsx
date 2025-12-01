import { useEffect, useState } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddTraining from "./AddTraining";

function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    const deleteTraining = (url: string) => {
        return fetch(url, { method: "DELETE" });
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteTraining(url)
                .then(() => fetchData())
        }
    }

    const saveTraining = (training) => {

        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }


    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 200, sortable: true },
        { field: 'duration', headerName: 'Duration', width: 200, sortable: true },
        { field: 'activity', headerName: 'Activity', width: 200, sortable: true },
        {
            field: 'customer',
            headerName: 'Customer',
            width: 200,
            sortable: true,
            renderCell: (params) => `${params.row.customer.firstname} ${params.row.customer.lastname}`
        },

        {
            headerName: "",
            sortable: false,
            filterable: false,
            field: '_links.self.href',
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        }
    ]

    return (
        <div style={{ width: '100%', height: 500, margin: 'auto' }}>
            <AddTraining saveTraining={saveTraining}/>
            <DataGrid
                rows={trainings}
                columns={columns}
            getRowId={(row) => "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/" + row.id}
                autoPageSize
            />
        </div>
    );
}

export default TrainingList;