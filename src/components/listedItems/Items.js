import * as React from "react";
import { Col, Row } from "react-bootstrap";
import ModalFather from "./ItemCard";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Grid } from "@mui/material";

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

function getStyles(Cati, Category, theme) {
  return {
    fontWeight:
      Category.indexOf(Cati) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Items() {
  const { handleSignOut } = useLoginContext();
  const { post } = usePostContext();

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

  return (
    <>
      <FormControl sx={{ m: 1, width: 500 }}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <InputLabel id="demo-multiple-name-label">Categories</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={Category}
              onChange={handleChange}
              input={<OutlinedInput label="Categories" />}
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
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={() => setCategory([])}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </FormControl>

      <Row
        style={{ marginLeft: "7.5%" }}
        xs={1}
        sm={2}
        md={2}
        lg={3}
        className="g-4"
      >
        {post &&
          post.map((pos, idx) => {
            if (Category.length > 0) {
              if (Category.some((item) => pos.category.includes(item))) {
                return (
                  <Col key={idx}>
                    <ModalFather
                      username={pos.username}
                      description={pos.description}
                      price={pos.price}
                      id={pos.id}
                      usersComments={pos.usersComments}
                      title={pos.title}
                      imgURL={pos.imgURL[0]}
                      category={pos.category}
                    />
                  </Col>
                );
              } else {
                return null;
              }
            } else {
              return (
                <Col key={idx}>
                  <ModalFather
                    username={pos.username}
                    description={pos.description}
                    price={pos.price}
                    id={pos.id}
                    usersComments={pos.usersComments}
                    title={pos.title}
                    imgURL={pos?.imgURL[0]}
                    category={pos.category}
                    idx={idx}
                  />
                </Col>
              );
            }
          })}
      </Row>
      {/* eslint-disable  */}
      <a style={{ display: "block", marginTop: "2%" }}>
        You are done here? don't forget to
        {<Button onClick={handleSignOut}>Sign Out</Button>}
      </a>
    </>
  );
}
