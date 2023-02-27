import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import image from "../assets/img.jpg";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import { deletePostAction } from "../../actions/PostsActions";
import FullScreenModal from "./FullScreenModal";
import { Button, IconButton, Tooltip } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import EditItemModal from "./EditModalForm";

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
    updateUserCart({cart: cart});
  };

  const addToFav = () => {
    let favorite = [...user?.favorite] || [];
    if (favorite.includes(props.id)) {
      favorite = favorite.filter((item) => item !== props.id);
    } else {
      favorite.push(props.id);
    }
    updateUserCart({favorite: favorite});
  };


  return (
    <div>
      <Card sx={{ maxWidth: 380 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="props.">
              {props.title.charAt(0).toUpperCase() || "P"}
            </Avatar>
          }
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
                    <Dropdown.Item onClick={() => handleShow()}>
                      Edit
                    </Dropdown.Item>
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
              />
            </>
          }
          title={props.title}
        />
        By {props.username}
        <CardMedia
          component="img"
          height="194"
          image={props.imgURL ? props.imgURL : image}
          alt={`image of ${props.title}`}
          onClick={() => handleShowFull()}
        />
        <CardContent sx={{textAlign:"left"}}>
          <Typography variant="body2" color="text">
            Description: {props.description}
          </Typography>
          <Typography variant="body2" color="text">
            Price: {props.price}$
          </Typography>

          <Typography variant="body2" color="text">
            Tags: {props.category && props.category.join(", ")}
          </Typography>

        </CardContent>
        <CardActions disableSpacing></CardActions>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography style={{ fontWeight: "bolder" }} paragraph>
              Comments:
            </Typography>
            {props.usersComments && (
              <Typography paragraph style={{ textAlign: "left" }}>
                {props.usersComments.map(
                  (com, idx) =>
                    idx < 3 && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a style={{ display: "block" }} key={com.id}>
                        {com.commentAuthor.toUpperCase()}: {com.comment}
                      </a>
                    )
                )}
              </Typography>
            )}
            {props.usersComments.length === 0 && <p>No Comments Here</p>}

            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, marginRight: 5 }}
              onClick={handleShowFull}
            >
              See More
            </Button>
            {isAuthorized && (
              <>
                {user?.cart?.includes(props.id) ? (
                  <Tooltip title="Remove From Cart">
                    <IconButton onClick={addToCart}>
                      <RemoveShoppingCartIcon 
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to Cart">
                  <IconButton onClick={addToCart}>
                  <AddShoppingCartIcon
                  />
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
                  <FavoriteIcon sx={{color: "red"}}/>
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
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
