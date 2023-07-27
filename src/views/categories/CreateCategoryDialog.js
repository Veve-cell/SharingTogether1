/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

// @mui
import {
  Button
} from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

function CreateCategoryDialog({ createModalOpen, handleCreateCloseModal, newCategory, handleChange, handleSubmit }) {
  return (
    <>
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
    </>
  );
}

export default CreateCategoryDialog;
