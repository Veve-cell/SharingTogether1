/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { filter } from 'lodash'
import { sentenceCase } from 'change-case'
import { useState, useEffect } from 'react'
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material'
// components
import Label from '../../components/label'
import Iconify from '../../components/iconify'
import Scrollbar from '../../components/scrollbar'
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user'
// mock
//import USERLIST from '../../_mock/user'
import categoryApi from 'src/api/categoryApi'
//import {CRow } from '@coreui/react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
//const axios = window.axios; // Import axios for making API calls


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Category Name', alignRight: false },
  { id: 'lastModifiedDate', label: 'Update Date', alignRight: false },
  // { id: 'email', label: 'Email', alignRight: false },
  // { id: 'class', label: 'Class', alignRight: false },
  // { id: 'isOnline', label: 'Status', alignRight: false },
  { id: '' },
]
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}

export default function Category() {
  const [categories, setCategories] = useState([]); // Thêm state để lưu trữ danh sách danh mục

  const [createModalOpen, setCreateModalOpen] = useState(false); // Thêm state để kiểm soát việc hiển thị modal

  const [newCategory, setNewCategory] = useState({
    name: '',
    createdBy: 2,
  });

  //Tạo 1 state để lưu thời điểm bấm chuột
  const [mouseDown, setMouseDown] = useState(false);

  // tạo một hàm để xử lý sự kiện mousedown:
  const handleMouseDown = () => {
    setMouseDown(true);
  };

  //const [open, setOpen] = useState(null)
  const [open, setOpen] = useState({})

  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    const handleClickOutside = (event, id) => {
      console.log("Clicked outside");
      // Kiểm tra xem target của sự kiện click có thuộc về MenuItem không
      if (!event.target.closest(".MuiMenuItem-root")) {
        // Nếu không thuộc về MenuItem, đóng openMenu của item đang được chọn
        setOpen((prevState) => ({ ...prevState, [id]: null }));
      }
    };

    // Lặp qua mỗi cặp key-value trong open state
    Object.entries(open).forEach(([id, anchorEl]) => {
      if (anchorEl) {
        // Nếu anchorEl có giá trị, thêm sự kiện mousedown cho nó
        document.addEventListener("mousedown", (event) =>
          handleClickOutside(event, id)
        );
      }
    });

    // Cleanup: loại bỏ sự kiện mousedown khi component unmount
    return () => {
      Object.entries(open).forEach(([id, anchorEl]) => {
        if (anchorEl) {
          anchorEl.removeEventListener("mousedown", (event) =>
            handleClickOutside(event, id)
          );
        }
      });
    };
  }, [open]);


  const handleCreateOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleCreateCloseModal = () => {
    setCreateModalOpen(false);
  };

  //-----------------------------------Edit----------------------------------------------------------------

  const [openEditModal, setOpenEditModal] = useState(false);

  //Thêm state selectedCategory để lưu thông tin của item được chọn khi bấm vào MenuItem Edit:
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenEditModal = (category) => {
    //console.log("Selected Category:", category);
    console.log("Selected Category:");
    setSelectedCategory(category);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCategory(null);
    setOpenEditModal(false);
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSelectCategory = (event) => {
    const { name, value } = event.target;
    console.log(name)
    // name = 'select'
    setSelectedCategory((prevData) => ({
      ...prevData,
      name: value,
    }));
  }

  const handleSubmit = async () => {
    // console.log('Submit');
    // Xử lý logic khi người dùng nhấn nút "Save" trong form
    try {
      // Make the API call to save the new category
      const response = await categoryApi.add(newCategory);

      // Kiểm tra response.data có tồn tại và không phải là undefined hoặc null
      if (response) {
        // Handle the success scenario
        console.log('Category saved successfully:', response);

        // Update the categories state to include the new category
        setCategories((prevCategories) => [...prevCategories, response]);

        // Thêm các bước xử lý lưu dữ liệu vào API tại đây (sử dụng axios hoặc fetch)

        // Close the modal after successful submission
        handleCreateCloseModal();
      } else {
        // Handle the case when response.data is not valid
        console.error('Invalid response data:', response);
      }
    } catch (error) {
      // Handle the error scenario
      console.error('Error saving category:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        id: selectedCategory.id,
        name: selectedCategory.name,
        createdBy: 2,
      };

      // Thực hiện request PUT đến API để cập nhật thông tin bản ghi
      const response = await categoryApi.update(updatedData);
      //console.log('Category updated successfully:', response.content);


      // Kiểm tra response có tồn tại và không phải là undefined hoặc null
      if (response) {
        // Handle the success scenario
        console.log('Category updated successfully:', response);
        // Thực hiện các bước cập nhật trạng thái hoặc hiển thị thông báo thành công

        // Cập nhật lại danh sách categories trong trạng thái với dữ liệu đã cập nhật từ API
        setCategories((prevCategories) => {
          // Tìm index của selectedCategory trong danh sách categories
          const categoryIndex = prevCategories.findIndex(
            (category) => category.id === selectedCategory.id
          );

          // Nếu tìm thấy category trong danh sách, thực hiện cập nhật thông tin của category
          if (categoryIndex !== -1) {
            const updatedCategories = [...prevCategories];
            updatedCategories[categoryIndex] = response;
            return updatedCategories;
          } else {
            // Trường hợp không tìm thấy category trong danh sách, không thay đổi danh sách
            return prevCategories;
          }
        });

        // Đóng modal edit
        handleCloseEditModal();
      } else {
        // Handle the case when response.data is not valid
        console.error('Invalid response data:', response);
        // Hiển thị thông báo lỗi hoặc xử lý lỗi khác (nếu cần)
      }
    } catch (error) {
      // Handle the error scenario
      console.error('Error updating category:', error);
      // Hiển thị thông báo lỗi hoặc xử lý lỗi khác (nếu cần)
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      // Gọi API để đánh dấu isDeleted thành true cho danh mục có id tương ứng
      await categoryApi.remove(categoryId);

      // Nếu thành công, cập nhật lại danh sách danh mục bằng cách lọc ra những danh mục có isDeleted: false
      const updatedCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(updatedCategories);

      console.log('Category deleted successfully');

    } catch (error) {
      // Handle the error scenario
      console.error('Error deleting category:', error);
    }
  };

  const handleOpenMenu = (event, id) => {
    //setOpen(event.currentTarget)
    setOpen((prevState) => ({ ...prevState, [id]: event.currentTarget }));
  }

  const handleCloseMenu = (id) => {
    //setOpen(null)
    setOpen((prevState) => ({ ...prevState, [id]: null }));
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categories.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        //quick fix
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  useEffect(() => {
    // Gọi API để lấy danh sách danh mục từ server
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response); // Lưu kết quả vào state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0
  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName)
  const filteredCategories = applySortFilter(categories, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredCategories.length && !!filterName

  return (
    <HelmetProvider>
      <Helmet>
        <title> Category </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          {/* <Typography variant="h4" gutterBottom>
            User
          </Typography> */}
          <Button
            variant="contained"
            style={{ backgroundColor: '#F9FFEA', color: '#000000' }}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleCreateOpenModal} // Mở modal khi nhấn nút "New Category"
          >
            New Category
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#92BA92', color: '#000000' }} startIcon={<Iconify icon="pajamas:export" />}>
            Export
          </Button>

          <Dialog open={createModalOpen} onClose={handleCreateCloseModal}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              {/* Nội dung của modal, ví dụ: các trường để người dùng nhập thông tin */}
              <form>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateCloseModal}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categories.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((category) => {
                      //const { id, name, role, status, company, avatarUrl, isVerified } = row
                      const { id, name, lastModifiedDate } = category;
                      const selectedUser = selected.indexOf(id) !== -1

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>

                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={id} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </Stack>
                          </TableCell> */}

                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{lastModifiedDate}</TableCell>

                          {/* <TableCell align="left">{phoneNumber}</TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{className}</TableCell>

                          <TableCell align="left">{isOnline ? 'Yes' : 'No'}</TableCell> */}

                          {/* <TableCell align="left">
                            <Label color={(isOnline === 'banned' && 'error') || 'success'}>
                              {sentenceCase(isOnline)}
                            </Label>
                          </TableCell> */}

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => handleOpenMenu(event, id)}
                              onMouseDown={handleMouseDown} //lắng nghe khi chuột được bấm xuống:
                            >
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                          <Popover
                            open={Boolean(open[id])}
                            anchorEl={open[id]}
                            onClose={handleCloseMenu[id]}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                              sx: {
                                p: 1,
                                width: 140,
                                '& .MuiMenuItem-root': {
                                  px: 1,
                                  typography: 'body2',
                                  borderRadius: 0.75,
                                },
                              },
                            }}
                          >
                            <MenuItem onClick={() => handleOpenEditModal(category)}>
                              <Iconify
                                icon={'eva:edit-fill'}
                                sx={{ mr: 2 }}
                              />
                              Edit
                            </MenuItem>

                            <MenuItem
                              sx={{ color: 'error.main' }}
                              onClick={() => handleDelete(category.id)}
                            >
                              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                              Delete
                            </MenuItem>
                          </Popover>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* <Popover
        open={Boolean(open[id])}
        anchorEl={open[id]}
        onClose={handleCloseMenu[id]}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleOpenEditModal(category)}
        >
          <Iconify
            icon={'eva:edit-fill'}
            sx={{ mr: 2 }}
          />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => handleDelete(categories.id)}
        >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
      {/* ----------------------Dialog Edit------------------------------------ */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={selectedCategory ? selectedCategory.name : ''}
              onChange={handleEditSelectCategory}
              variant="outlined"
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </HelmetProvider>
  )
}
