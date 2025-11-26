import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef } from "@mui/x-data-grid";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData, []);

  const fetchData = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data._embedded.customers))
  }

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Firstname", width: 150, sortable: true },
    { field: "lastname", headerName: "Lastname", width: 150, sortable: true },
    { field: "streetaddress", headerName: "Address", width: 200, sortable: true },
    { field: "postcode", headerName: "Postcode", width: 100, sortable: true },
    { field: "city", headerName: "City", width: 150, sortable: true },
    { field: "email", headerName: "Email", width: 200, sortable: true },
    { field: "phone", headerName: "Number", width: 150 , sortable: true},

  ];

  return (
    <div style={{ width: '90%', height: 500, margin: 'auto' }}>
      <DataGrid
        rows={customers}
        columns={columns}
        getRowId={row => row._links.self.href}
        autoPageSize
      />
    </div>
  );
}

export default CustomerList;