import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import { editPostAction } from "../../actions/PostsActions";
import { useTheme } from "@emotion/react";

const Catigo = [
  "Electronics",
  "Clothes",
  "Furniture",
  "Books",
  "Sports",
  "Toys",
  "Tools",
  "Other",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditItemModal(props) {
  const { user } = useLoginContext();
  const { gitPosts } = usePostContext();
  const [image, setImage] = useState(false);

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
      imgURL: image,
      username: user.username,
      // stringy the array so the multer doesn't destroy it
      category: JSON.stringify(Category),
      userID: user.id,
    };
    if (!image) delete post.imgURL;
    editPostAction(id, post, gitPosts);
    e.target.reset();
    handleClose();
  };

  const [Category, setCategory] = React.useState(props.category);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Modal
        style={{ marginTop: "5%" }}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Form onSubmit={editPost} style={{ margin: "3% 5%" }}>
          <h3>Edit Post</h3>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="New Title (Optional)"
            type="text"
            name="title"
            rows={3}
            defaultValue={props.title}
          />

          <TextField
            margin="normal"
            fullWidth
            name="price"
            label="New price (Optional)"
            type="number"
            id="price"
            defaultValue={props.price}
            rows={3}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <InputLabel id="multiple-cati-label">
            Categories (Can select more than one)
          </InputLabel>
          <Select
            labelId="multiple-cati-label"
            id="demo-multiple-name"
            multiple
            value={Category}
            onChange={handleChange}
            MenuProps={MenuProps}
            defaultValue={props.category}
            fullWidth
          >
            {Catigo.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="normal"
            fullWidth
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="New Description (Optional)"
            type="text"
            id="description"
            multiline
            rows={3}
            defaultValue={props.description}
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
