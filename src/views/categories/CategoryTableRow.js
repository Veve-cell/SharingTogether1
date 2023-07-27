/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-restricted-globals */
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
  Popover,
  TableCell,
  TableRow
} from '@mui/material'
// components
import Iconify from '../../components/iconify'
// sections
// mock
//import USERLIST from '../../_mock/user'
//import {CRow } from '@coreui/react'

function CategoryTableRow({
  category,
  selectedUser,
  handleClick,
  handleOpenMenu,
  handleMouseDown,
  open,
  handleCloseMenu,
  handleOpenEditModal,
  handleDelete
}) {
  const { id, name, lastModifiedDate } = category;
  return (
    <>
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
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{lastModifiedDate}</TableCell>
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
    </>
  );
}

export default CategoryTableRow;
