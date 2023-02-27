import { TextField } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";
import { editPostAction } from "../actions/PostsActions";

export default function EditItemModal(props) {
  const { user } = useLoginContext();
  const { gitPosts } = usePostContext();

  const id = props.id;
  const handleClose = () => {
    props.handleClose();
  };

  const editPost = async (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value || props.title,
      description: e.target.description.value || props.description,
      price: e.target.price.value || props.price,
      imgURL: e.target.imgURL.value || props.imgURL,
      username: user.username,
      userID: user.id,
    };
    editPostAction(id, post, gitPosts);
    e.target.reset();
  };

  return (
    <>
      <Modal
        style={{ marginTop: "5%" }}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Form onSubmit={editPost} style={{ margin: "3% 30%" }}>
          <h3>Edit Post</h3>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="New Title (Optional)"
            type="text"
            name="title"
            rows={3}
            placeholder={`${props.title}`}
          />

          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="New Description (Optional)"
            type="text"
            id="description"
            rows={3}
            placeholder={props.description}
          />

          <TextField
            margin="normal"
            fullWidth
            name="price"
            label="New price (Optional)"
            type="number"
            id="price"
            rows={3}
            placeholder={props.price}
          />

          <TextField
            margin="normal"
            fullWidth
            name="imgURL"
            label="New Image URL (Optional)"
            type="text"
            id="imgURL"
            rows={3}
            placeholder={props.imgURL}
          />

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Form>

        <Modal.Footer>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleClose()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
