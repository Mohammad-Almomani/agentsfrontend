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
import AddCommentForm from "./Add-comment-form";
import { Dropdown } from "react-bootstrap";
import image from "./assets/img.jpg";
import EditItemModal from "./EditModal";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";
import { deletePostAction } from "../actions/PostsActions";
import FullScreenModal from "./FullScreenModal";
import { Button } from "@mui/material";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function ModalFather(props) {
  let [show, setShow] = useState(false);
  let [showFull, setShowFull] = useState(false);

  const { user, canDo } = useLoginContext();
  const { gitPosts } = usePostContext();

  const handleShow = () => {
    setShow(!show);
  };
  const handleShowFull = () => {
    setShowFull(!showFull);
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
        <CardContent>
          <Typography variant="body2" color="text">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text">
            Price: {props.price}$
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
            
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, marginRight : 5 }}
              onClick={handleShowFull}
            >
              See More
            </Button>
            
            <AddShoppingCartIcon sx={{cursor: "pointer", marginRight : 1}} />

            <FavoriteBorderIcon sx={{cursor: "pointer"}} />


          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
