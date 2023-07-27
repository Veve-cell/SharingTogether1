/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// @mui
import {
  Checkbox,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
// components
import Iconify from '../../components/iconify'
import Scrollbar from '../../components/scrollbar'
// sections
import { UserListHead } from '../../sections/@dashboard/user'
import CategoryTableRow from './CategoryTableRow';
// mock
//import USERLIST from '../../_mock/user'
//import {CRow } from '@coreui/react'

function CategoryTable({
  order,
  orderBy,
  headLabel,
  categories,
  selected,
  handleRequestSort,
  handleSelectAllClick,
  filteredCategories,
  page,
  rowsPerPage,
  handleOpenMenu,
  handleMouseDown,
  open,
  handleCloseMenu,
  handleOpenEditModal,
  handleDelete,
  isNotFound,
  emptyRows,
  filterName,
}) {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={headLabel}
              rowCount={categories.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            {/* <TableBody>
              {filteredCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => {
                  const { id } = category;
                  const selectedUser = selected.indexOf(id) !== -1

                  return (
                    <CategoryTableRow
                      key={id}
                      category={category}
                      selectedUser = { selectedUser}
                      handleClick = { handleClick}
                      handleOpenMenu = { handleOpenMenu}
                      handleMouseDown = {handleMouseDown}
                      open = {open}
                      handleCloseMenu = {handleCloseMenu}
                      handleOpenEditModal = {handleOpenEditModal}
                      handleDelete = {handleDelete}
                    >
                    </CategoryTableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> */}

            <TableBody>
              {filteredCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => {
                  const { id } = category;
                  const selectedUser = selected.indexOf(id) !== -1;

                  return (
                    <CategoryTableRow
                      key={id}
                      category={category}
                      selectedUser={selectedUser}
                      handleClick={(event, id) => handleClick(event, id)}
                      handleOpenMenu={handleOpenMenu}
                      handleMouseDown={handleMouseDown}
                      open={open}
                      handleCloseMenu={handleCloseMenu}
                      handleOpenEditModal={handleOpenEditModal}
                      handleDelete={handleDelete}
                    />
                  );
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
    </>
  );
}

export default CategoryTable;
