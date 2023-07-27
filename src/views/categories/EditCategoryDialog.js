/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';

EditCategoryDialog.propTypes = {

};

function EditCategoryDialog({
  openEditModal,
  handleCloseEditModal,
  selectedCategory,
  handleEditSelectCategory,
  handleUpdate
}) {
  return (
    <>
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
    </>
  );
}

export default EditCategoryDialog;
