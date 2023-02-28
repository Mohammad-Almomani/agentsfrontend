import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import image from "../assets/img.jpg";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import { deletePostAction } from "../../actions/PostsActions";
import FullScreenModal from "./FullScreenModal";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import EditItemModal from "../Forms/EditModalForm";

export default function ModalFather(props) {
  let [show, setShow] = useState(false);
  let [showFull, setShowFull] = useState(false);

  const { user, canDo, isAuthorized, updateUserCart } = useLoginContext();
  const { gitPosts } = usePostContext();
  const handleShow = () => {
    setShow(!show);
  };
  const handleShowFull = () => {
    setShowFull(!showFull);
  };

  const addToCart = () => {
    let cart = [...user?.cart] || [];
    if (cart.includes(props.id)) {
      cart = cart.filter((item) => item !== props.id);
    } else {
      cart.push(props.id);
    }
    updateUserCart({ cart: cart });
  };

  const addToFav = () => {
    let favorite = [...user?.favorite] || [];
    if (favorite.includes(props.id)) {
      favorite = favorite.filter((item) => item !== props.id);
    } else {
      favorite.push(props.id);
    }
    updateUserCart({ favorite: favorite });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 380 }} >
        <CardHeader
          action={
            <>
              {canDo(user.username, props.username) && (
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      padding: "0px",
                    }}
                  >
                    <MoreVertIcon
                      style={{
                        backgroundColor: "gray",
                        borderRadius: "20px",
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ backgroundColor: "lightblue" }}>
                    <Dropdown.Item
                      onClick={() => deletePostAction(props.id, gitPosts)}
                    >
                      Delete Post
                    </Dropdown.Item>
                    {user.username === props.username && (
                      <Dropdown.Item onClick={() => handleShow()}>
                        Edit
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <EditItemModal
                title={props.title}
                description={props.description}
                id={props.id}
                price={props.price}
                show={show}
                handleClose={handleShow}
                imgURL={props.imgURL}
                category={props.category}
              />
              <FullScreenModal
                title={props.title}
                description={props.description}
                id={props.id}
                show={showFull}
                price={props.price}
                handleCloseFull={handleShowFull}
                imgURL={props.imgURL}
                usersComments={props.usersComments}
                username={props.username}
                category={props.category}
                idx={props.idx}
              />
            </>
          }
          title={props.title}
        />

        <CardMedia
          component="img"
          height="200"
          style={{objectFit: "contain"}}
          image={props.imgURL ? props.imgURL : image}
          alt={`image of ${props.title}`}
          onClick={() => handleShowFull()}
        />
        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="body2" color="text" sx={{ mt: 2, mb: 1 }}>
            Description: {props.description}
          </Typography>
          <Typography variant="body2" color="text" sx={{ mb: 1 }}>
            Seller: {props.username}
          </Typography>

          <Typography variant="body2" color="text">
            Tags: {props.category && props.category.join(", ")}
          </Typography>
          <br />
          <Typography variant="body" color="text">
            <Grid
              container
              justifyContent="space-between"
              // alignItems="space-around"
              spacing={1}
            >
              <Grid item sm={6}>
                <p style={{ fontSize: "20px" }}> Price: {props.price}$</p>
              </Grid>
              <Grid item sm={5}>
                {isAuthorized && (
                  <>
                    {user?.cart?.includes(props.id) ? (
                      <Tooltip title="Remove From Cart">
                        <IconButton onClick={addToCart}>
                          <RemoveShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to Cart">
                        <IconButton onClick={addToCart}>
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
                {isAuthorized && (
                  <>
                    {user?.favorite?.includes(props.id) ? (
                      <Tooltip title="Remove From Fav">
                        <IconButton onClick={addToFav}>
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to Fav">
                        <IconButton onClick={addToFav}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleShowFull}
            >
              Learn More
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
