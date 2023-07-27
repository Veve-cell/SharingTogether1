/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
// @mui
import {
  Stack,
  Button
} from '@mui/material'
// components
import Iconify from '../../components/iconify'

function StackComponent({ handleCreateOpenModal }) {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
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
      </Stack>
    </>

  );
}

export default StackComponent;
