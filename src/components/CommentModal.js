import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { addComment } from "../store/slices/comment";

import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    padding: "40px",
  },
  textField: {
    display: "block",
    marginBottom: "10px",
  },
  modalControl: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    name: "",
    comment: "",
  });

  const [isError, setIsError] = useState({
    name: false,
    comment: false,
  });

  const isOpen = useSelector(getViewCommentsModalOpen);

  const handleClose = () => dispatch(closeCommentsModal());

  const hasFalseKeys = (ob) => Object.keys(ob).some((k) => !ob[k]);

  const handleChange = (type, value) => {
    setComment({
      ...comment,
      [type]: value,
    });
  };

  const handleBlur = (type, value) => {
    if (value === "" || value === null || !value) {
      setIsError({
        ...isError,
        [type]: true,
      });
    } else {
      setIsError({
        ...isError,
        [type]: false,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment({ name: comment.name, body: comment.comment }));
    handleClose();
  };

  return (
    <Modal
      disableBackdropClick
      disableEscapeKeyDown
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
    >
      <Paper className={classes.modalBody} variant="outlined">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            fullWidth
            className={classes.textField}
            label="Name *"
            variant="outlined"
            type="text"
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={(e) => {
              handleBlur("name", e.target.value);
            }}
            value={comment.name}
            error={isError.name}
            helperText={isError.name ? "This field is required." : ""}
          />
          <TextField
            fullWidth
            multiline
            className={classes.textField}
            label="Comment *"
            variant="outlined"
            type="text"
            onChange={(e) => handleChange("comment", e.target.value)}
            onBlur={(e) => {
              handleBlur("comment", e.target.value);
            }}
            value={comment.comment}
            error={isError.comment}
            helperText={isError.comment ? "This field is required." : ""}
          />
          <div className={classes.modalControl}>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button
              disabled={
                !hasFalseKeys(isError) ||
                comment.name === "" ||
                comment.comment === ""
              }
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Modal>
  );
};

export default CommentModal;
