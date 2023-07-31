/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import registrationApi from 'src/api/registrationApi';
import Chip from '@mui/material/Chip';
import _ from "lodash";

const StatusCell = ({ value }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'warning';
      case 'Disapproved':
        return 'error';
      case 'Received':
        return 'success';
      default:
        return 'default';
    }
  };
  return <Chip label={_.startCase(value)} color={getStatusColor(value)} />
}

const VISIBLE_FIELDS = [
  { field: 'id', headerName: 'ID', width: 10 },
  // { field: 'register', headerName: 'Register', width: 150 },
  { field: 'fullName', headerName: 'Register', width: 200 },
  { field: 'studentCode', headerName: 'Student Code', width: 150 },
  { field: 'title', headerName: 'Item Name', width: 200 },
  { field: 'createdDate', headerName: 'Registration Date', width: 200 },
  { field: 'content', headerName: 'Register Content', width: 150 },
  { field: 'status', headerName: 'Registration Status', width: 150, renderCell: StatusCell, editable: true},
  { field: 'approvalDate', headerName: 'Approval Date', width: 150 },
];

export default function SharingActivities() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh sách danh mục từ server
    const fetchRegistrations = async () => {
      try {
        const response = await registrationApi.getAll();
        setData(response); // Lưu kết quả vào state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRegistrations();
  }, []);

  
  return (
    <div style={{ height: 400, width: '100%' }} className='custom-data-grid'>
      <DataGrid rows={data} columns={VISIBLE_FIELDS} rowKey={(row) => row.id} slots={{ toolbar: GridToolbar }} />
    </div>
  );
}

