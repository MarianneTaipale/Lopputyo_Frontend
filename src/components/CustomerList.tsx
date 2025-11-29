import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData, []);

  const fetchData = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data._embedded.customers))
  }

  const deleteCustomer = (url: string) => {
    return fetch(url, { method: "DELETE" });
  }

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteCustomer(url)
        .then(() => fetchData())
    }
  }

  const saveCustomer = (customer) => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchData())
      .catch(err => console.error(err))
  }

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.log(err))
  }

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Firstname", width: 150, sortable: true },
    { field: "lastname", headerName: "Lastname", width: 150, sortable: true },
    { field: "streetaddress", headerName: "Address", width: 200, sortable: true },
    { field: "postcode", headerName: "Postcode", width: 100, sortable: true },
    { field: "city", headerName: "City", width: 150, sortable: true },
    { field: "email", headerName: "Email", width: 200, sortable: true },
    { field: "phone", headerName: "Number", width: 150, sortable: true },
    {
      headerName: "",
      sortable: false,
      filterable: false,
      field: "edit",
      renderCell: (params: GridRenderCellParams) => (
        <EditCustomer customer={params.row} updateCustomer={updateCustomer}/>
      )
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
    },
  ];

  return (
    <div style={{ width: '105%', height: 500, margin: 'auto' }}>
      <AddCustomer saveCustomer={saveCustomer} />
      <DataGrid
        rows={customers}
        columns={columns}
        getRowId={row => row._links.self.href}
      />
    </div>
  );
}

export default CustomerList; 