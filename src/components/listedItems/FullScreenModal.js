import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Collapse, Typography } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import image from "../assets/img.jpg";
import { red } from "@mui/material/colors";
import AddCommentForm from "../Forms/Add-comment-form";
import { useLoginContext } from "../../Context/AuthContext";

export default function FullScreenModal(props) {
  const { isAuthorized } = useLoginContext();

  const handleCloseFull = () => {
    props.handleCloseFull();
  };

  return (
    <>
      <Modal
        style={{ marginTop: "5%" }}
        show={props.show}
        onHide={props.handleCloseFull}
      >
        <Modal.Header closeButton></Modal.Header>
        <div>
      <Card sx={{ maxWidth: 380 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="props.">
              {props.title.charAt(0).toUpperCase() || "P"}
            </Avatar>
          }
          title={props.title}
        />
        By {props.username}
        <CardMedia
          component="img"
          height="194"
          image={props.imgURL ? props.imgURL : image}
          alt={`image of ${props.title}`}
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
                {props.usersComments.map((com) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a style={{ display: "block" }} key={com.id}>
                    {com.commentAuthor.toUpperCase()}: {com.comment}
                  </a>
                ))}
              </Typography>
            )}
            {props.usersComments.length === 0 && <p>No Comments Here</p>}

            { isAuthorized && <AddCommentForm postID={props.id} gitPosts={props.gitPosts} />}
          </CardContent>
        </Collapse>
      </Card>
    </div>

        <Modal.Footer>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleCloseFull()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
