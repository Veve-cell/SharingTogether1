/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// Import các thư viện và hooks cần thiết
import React, { useState, useEffect } from 'react';
import {
    DataGrid,
    GridToolbar,
    useGridApiContext,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarContainer } from '@mui/x-data-grid';
import registrationApi from 'src/api/registrationApi'; // Giả sử import API để lấy dữ liệu từ server
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select'; // Add this line
import _ from "lodash";

// Component để hiển thị trạng thái có thể chỉnh sửa
const EditableStatusCell = ({ id, field, value }) => {
  // Sử dụng useState hook để quản lý trạng thái "đang chỉnh sửa"
  const [isEditMode, setIsEditMode] = useState(false);

  // Sử dụng useState hook để quản lý giá trị option hiện tại
  const [currentValue, setCurrentValue] = useState(value);

  // Sử dụng useGridApiContext hook để lấy API context của DataGrid
  const apiRef = useGridApiContext();

  // Hàm xử lý khi người dùng chuyển đổi giữa chế độ chỉnh sửa và xem thông tin
  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  // Hàm xử lý khi giá trị trạng thái thay đổi
  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  // Hàm xử lý khi người dùng kết thúc chỉnh sửa
  const handleBlur = async () => {
    try {
      // Gọi API để cập nhật trạng thái mới lên máy chủ
      const response = await registrationApi.update({ id, status: currentValue });

      console.log('response: ', response);
      // Nếu cập nhật thành công, dừng chế độ chỉnh sửa của ô và cập nhật giá trị trên giao diện
      if (response) {
        apiRef.current.setEditCellValue({ id, field, value: currentValue });
        apiRef.current.stopCellEditMode({ id, field });
      } else {
        console.error('Failed to update status:', response);
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
    setIsEditMode(false);
  };

  // Trả về giao diện của ô dựa vào chế độ chỉnh sửa
  return isEditMode ? (
    // Nếu đang trong chế độ chỉnh sửa, hiển thị dropdown Select cho phép người dùng chọn trạng thái
    <StatusSelect value={currentValue} onChange={handleChange} onBlur={handleBlur} />
  ) : (
    // Nếu không, hiển thị trạng thái hiện tại trong một Chip có màu sắc phù hợp
    <StatusChip value={currentValue} onClick={handleEditModeToggle} />
  );
};

// Component hiển thị dropdown Select cho phép người dùng chọn trạng thái
const StatusSelect = ({ value, onChange, onBlur, isEditMode }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
      onBlur={onBlur}
      >
      <option value="Confirming">Confirming</option>
      <option value="Accepted">Accepted</option>
      <option value="Disapproved">Disapproved</option>
      <option value="Received">Received</option>
    </Select>
  )
}

// Component hiển thị trạng thái trong một Chip có màu sắc phù hợp
const StatusChip = ({ value, onClick }) => {
  // Hàm lấy màu sắc phù hợp dựa vào giá trị trạng thái
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

  // Trả về Chip hiển thị giá trị trạng thái với màu sắc phù hợp
  return <Chip label={_.startCase(value)} color={getStatusColor(value)} onClick={onClick} />
}

// Component dùng để hiển thị trạng thái trong DataGrid
const StatusCell = ({ id, field, value }) => {
  // Sử dụng EditableStatusCell để hiển thị trạng thái có thể chỉnh sửa
  return <EditableStatusCell id={id} field={field} value={value} />
}

// Định nghĩa các cột hiển thị trong DataGrid
const VISIBLE_FIELDS = [
  { field: 'id', headerName: 'ID', width: 10 },
  { field: 'fullName', headerName: 'Register', width: 200 },
  { field: 'studentCode', headerName: 'Student Code', width: 150 },
  { field: 'title', headerName: 'Item Name', width: 200 },
  { field: 'createdDate', headerName: 'Registration Date', width: 200 },
  { field: 'content', headerName: 'Register Content', width: 150 },
  // Định nghĩa cột 'status', sử dụng StatusCell để hiển thị giá trị và cho phép chỉnh sửa
  { field: 'status', headerName: 'Registration Status', width: 150, renderCell: StatusCell, editable: true },
  { field: 'approvalDate', headerName: 'Approval Date', width: 150 },
];

// Component chính của ứng dụng
export default function SharingActivities() {
  // Sử dụng useState để quản lý dữ liệu của DataGrid
  const [data, setData] = useState([]);

  // Sử dụng useEffect để gọi API và lấy dữ liệu từ server khi component được tạo
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

    // Gọi hàm để lấy dữ liệu đăng ký từ server
    fetchRegistrations();
  }, []);

  // Trả về giao diện của ứng dụng, bao gồm DataGrid hiển thị dữ liệu đã lấy từ server
  return (
    <div style={{ height: 400, width: '100%' }} className='custom-data-grid'>
      <DataGrid rows={data} columns={VISIBLE_FIELDS} rowKey={(row) => row.id} slots={{ toolbar: CustomToolbar }} />
    </div>
  );
}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbar/> */}
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}
