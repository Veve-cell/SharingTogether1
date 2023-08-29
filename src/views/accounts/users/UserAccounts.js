/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { useState, useEffect } from 'react'
import accountApi from 'src/api/accountApi';
import {
  Stack,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
// components
import Iconify from '../../../components/iconify'
import Label from '../../../components/label';
import TextField from '@mui/material/TextField';

function EditToolbar(props) {
  const { setAccounts, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setAccounts((oldAccounts) => [
      ...oldAccounts,
      {
        id,
        fullName: '',
        studentCode: '',
        phoneNumber: '',
        email: '',
        classCode: '',
        name: 'Thẩm định giá và Kinh doanh bất động sản',
      }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'fullName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
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


export default function UserAccount() {
  const [accounts, setAccounts] = useState([]); // Thêm state để lưu trữ danh sách tài khoản user
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [updatedRow, setUpdatedRow] = React.useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách tài khoản user từ Server
    const fetchAccounts = async () => {
      try {
        const response = await accountApi.getAllUser();
        console.log('API response: ', response);
        const accountData = response.account; // Extract the account array
        setAccounts(accountData); //Lưu kết quả vào state
        // setAccountsLoaded(true); // Đánh dấu rằng dữ liệu đã được tải
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };
    // if (!accountsLoaded) {
    fetchAccounts(); // Chỉ gọi API khi dữ liệu chưa được tải
    // }
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await accountApi.remove(id); // Gọi phương thức remove với tham số id
      setAccounts(accounts.filter((row) => row.id !== id));
      console.log('thanhcong');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  // hàm arrow function nhận tham số id và trả về một hàm arrow function khác (một closure). Điều này cho phép bạn truyền id vào hàm xử lý sự kiện mà không cần gọi trực tiếp.
  //Mình đang sử dụng một kỹ thuật gọi là "currying" (tách hàm) bằng cách sử dụng các hàm arrow function liên tiếp.

  //tương tự như cách viết sau
  // const handleDeleteClick = (id) => {
  //   return () => {
  //     const updatedAccounts = accounts.filter((row) => row.id !== id);
  //     setAccounts(updatedAccounts);
  //   };
  // };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = accounts.find((row) => row.id === id);
    if (editedRow.isNew) {
      setAccounts(accounts.filter((row) => row.id !== id));
    }
  };

  // const processRowUpdate = (newRow) => {
  //   const updatedRow = { ...newRow, isNew: false };
  //   console.log('updatedRow:', updatedRow);
  //   setAccounts(accounts.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   setUpdatedRow(updatedRow); // Cập nhật updatedRow vào trạng thái
  //   return updatedRow;
  // };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log('updatedRow:', updatedRow);
    // Chuyển đổi giá trị từ chữ sang số tùy theo tùy chọn đã chọn
    const facultyValueMap = {
      'Thẩm định giá và Kinh doanh bất động sản': 1,
      'Quản trị kinh doanh': 2,
      'Marketing': 3,
      'Tài chính - ngân hàng': 4,
      'Thuế và Hải quan': 5,
      'Kế toán - Kiểm toán': 6,
      'Công nghệ thông tin': 7,
      'Du lịch': 8,
      'Thương mại': 9,
      'Ngoại ngữ': 10,
      'Kinh tế - Luật': 11
    }

    const facultyValue = facultyValueMap[updatedRow.name] || 0; // 0 hoặc giá trị mặc định

    if (updatedRow.isNew) {
      const apiData = {
        Name: updatedRow.fullName,
        Email: updatedRow.email,
        Phone: updatedRow.phoneNumber,
        StudentCode: updatedRow.studentCode,
        Class: updatedRow.classCode,
        Password: updatedRow.studentCode,
        RepeatPassword: updatedRow.studentCode,
        Faculty: facultyValue
        // Các thuộc tính khác tùy theo cấu trúc yêu cầu
      };
      try {
        await accountApi.addUser(apiData); // Gọi API addUser tại đây
        setAccounts(accounts.map((row) => (row.id === newRow.id ? updatedRow : row)));
        setUpdatedRow(updatedRow);
        return updatedRow;
      } catch (error) {
        console.error('Error adding user:', error);
        // Xử lý lỗi nếu cần
        return newRow;
      }
    }
    else {
      const apiData = {
        Id: updatedRow.id,
        Email: updatedRow.email,
        Phone: updatedRow.phoneNumber,
        FullName: updatedRow.fullName,
        StudentCode: updatedRow.studentCode,
        FacultyId: facultyValue,
        Class: updatedRow.classCode,
        // Password: updatedRow.studentCode,
        // RepeatPassword: updatedRow.studentCode,
        // Các thuộc tính khác tùy theo cấu trúc yêu cầu
      };

      try {
        await accountApi.update(apiData);
        setAccounts(accounts.map((row) => (row.id === newRow.id ? updatedRow : row)));
        setUpdatedRow(updatedRow);
        return updatedRow;
      } catch (error) {
        console.error('Error update user:', error);
        // Xử lý lỗi nếu cần
        return newRow;
      }
    }

  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 180,
      editable: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={params.row.fullName} src={params.row.urlAvatar} />
            <Typography variant="subtitle2" noWrap>
              {params.row.fullName}
            </Typography>
          </Stack>
        );
      }
    },
    { field: 'studentCode', headerName: 'Student Code', width: 180, editable: true },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180, editable: true },
    { field: 'email', headerName: 'Email', width: 180, editable: true },
    { field: 'classCode', headerName: 'Class', width: 180, editable: true },
    {
      field: 'isOnline',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => (
        <Label color={params.value ? 'success' : 'banned' && 'error'}>
          {params.value ? 'Online' : 'Offline'}
        </Label>
      )
    },
    {
      field: 'name',
      headerName: 'Faculty',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Thẩm định giá và Kinh doanh bất động sản',
        'Quản trị kinh doanh',
        'Marketing',
        'Tài chính - ngân hàng',
        'Thuế và Hải quan',
        'Kế toán - Kiểm toán',
        'Công nghệ thông tin',
        'Thương mại',
        'Ngoại ngữ',
        'Kinh tế - Luật'
      ],
    },
    {
      field: 'isActive',
      headerName: 'isActive',
      width: 180,
      renderCell: (params) => (
        <Label color={params.value === 'True' ? 'success' : 'error'}>
          {params.value === 'True' ? 'True' : 'False'}
        </Label>
      ),
      editable: true,
      type: 'singleSelect',
      valueOptions: ['True', 'False']
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (

    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <div style={{ height: 400, width: '100%' }} className='custom-data-grid'>
        <DataGrid
          rows={accounts}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          classes={{
            root: 'hide-default-export-button', // Thêm lớp ẩn nút export mặc định
          }}
          enableRowSelection
          slots={{
            toolbar: (props) => (
              <React.Fragment>
                <EditToolbar {...props} />
                <CustomToolbar />
              </React.Fragment>
            ),
          }}
          slotProps={{
            toolbar: { setAccounts, setRowModesModel },
          }}
        />
      </div>
    </Box>
  );
}
