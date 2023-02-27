import React from "react";
import axios from "axios";
import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import cookies from "react-cookies";
import Swal from "sweetalert2";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import { useTheme } from "@mui/material/styles";

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
function getStyles(Cati, Category, theme) {
  return {
    fontWeight:
      Category.indexOf(Cati) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function AddPostForm() {
  const { user } = useLoginContext();
  const { gitPosts } = usePostContext();

  const theme = useTheme();
  const [Category, setCategory] = React.useState([]);


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  const addPost = async (e) => {
    e.preventDefault();
    console.log(e.target.imgURL.value);
    const post = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      imgURL: e.target.imgURL.value,
      username: user.username,
      userID: user.id,
      category: Category,
    };
    console.log(post);
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/post`, post, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((res) => {
        console.log(res);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Posted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        gitPosts();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops, seems like you are not authorized!",
          text: "Something went wrong!, Please Contact Admin",
        });
      });
  };

  return (
    <div>
      <Form onSubmit={addPost} style={{ margin: "3% 30%" }}>
        <h3>Sell an Item</h3>

        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          type="text"
          name="title"
          required
        />

        <TextField
          margin="normal"
          fullWidth
          name="price"
          label="price"
          type="number"
          id="price"
          required
          InputProps={{ inputProps: { min: 0} }}
        />

          <InputLabel id="multiple-cati-label">Categories (Can select more than one)</InputLabel>
        <Select
        labelId="multiple-cati-label"
          id="demo-multiple-name"
          multiple
          value={Category}
          onChange={handleChange}
          // input={<OutlinedInput label="Categories" />}
          MenuProps={MenuProps}
          fullWidth
        >
          {Catigo.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, Category, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          margin="normal"
          fullWidth
          name="imgURL"
          label="Enter Image URL here (Optional)  .jpg .png .webp ..."
          type="url"
          id="imgURL"
        />

        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="description"
          type="text"
          id="description"
          multiline
          rows={3}
          required
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
