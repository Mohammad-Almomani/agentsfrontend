import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import image from "../assets/img.jpg";
import { red } from "@mui/material/colors";
import AddCommentForm from "../Forms/Add-comment-form";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Container } from "@mui/system";

export default function FullScreenModal(props) {
  const { isAuthorized } = useLoginContext();
  const { user, updateUserCart } = useLoginContext();
  const { post } = usePostContext();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    post?.map((item) => {
      if (user?.cart?.includes(item.id)) {
        total += item.price;
      }
    });
    setPrice(total);
  }, [user?.cart]);

  const addToFav = () => {
    let favorite = [...user?.favorite] || [];
    if (favorite.includes(props.id)) {
      favorite = favorite.filter((item) => item !== props.id);
    } else {
      favorite.push(props.id);
    }
    updateUserCart({ favorite: favorite });
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

  const handleCloseFull = () => {
    props.handleCloseFull();
  };

  return (
    <>
      <Modal
        style={{ marginTop: "5%" }}
        show={props.show}
        onHide={handleCloseFull}
        size="lg"
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <div>
          <Card sm={{ display: "flex" }}>
            <CardHeader
              action={
                <Tooltip title="Remove From Cart">
                  <IconButton onClick={handleCloseFull}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              }
            />

            <Box sm={{ display: "flex", flexDirection: "auto" }}>
              <Grid
                container
                // justifyContent="center"

                alignItems="center"
                // spacing={3}
              >
                <Grid item lg={5}>
                  <CardMedia
                    component="img"
                    // sx={{ width: 170 }}
                    image={props.imgURL || image}
                    alt="Item Image"
                  />
                </Grid>

                <Grid item lg={7} style={{ fontSize: "20px" }}>
                  <Grid item>Item: {props.title}</Grid>
                  <Grid item>Description: {props.description}</Grid>
                  <Grid item>Seller: {props.username}</Grid>
                  <Grid item>
                    <Typography variant="body" color="text">
                      <Grid
                        container
                        justifyContent="space-between"
                        // alignItems="space-around"
                        spacing={1}
                      >
                        <Grid item sm={8}>
                          <p style={{ fontSize: "20px" }}>
                            {" "}
                            Price: {props.price}$
                          </p>
                        </Grid>
                        <Grid item sm={3}>
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
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <CardContent>
                    <Typography style={{ fontWeight: "bolder" }} paragraph>
                      Comments:
                    </Typography>
                    {props.usersComments && (
                      <Container
                        style={{
                          textAlign: "left",
                          maxHeight: 200,
                          overflow: "auto",
                        }}
                      >
                        {props.usersComments.map((com, idx) => (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <Grid
                            container
                            justifyContent="start"
                            alignItems="center"
                            spacing={0}
                            sx={{ mb: 2 }}
                            key={idx}
                          >
                            <Grid item sm={1}>
                              <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="props."
                              >
                                {com.commentAuthor.charAt(0).toUpperCase() ||
                                  "U"}
                              </Avatar>
                            </Grid>
                            <Grid item sm={8}>
                              {com.commentAuthor.toUpperCase()}: {com.comment}
                            </Grid>

                            <Grid item sm={2}>
                              <Rating
                                name="disabled"
                                value={Math.floor(Math.random() * 2 + 3)}
                                disabled
                              />
                            </Grid>

                            <Grid item sm={1}>
                              <Tooltip title="Verified Purchase">
                                <IconButton>
                                  <VerifiedIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        ))}
                      </Container>
                    )}
                    {props.usersComments.length === 0 && (
                      <p>No Comments Here</p>
                    )}

                    {isAuthorized && (
                      <AddCommentForm
                        postID={props.id}
                        gitPosts={props.gitPosts}
                      />
                    )}
                  </CardContent>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </div>
      </Modal>
    </>
  );
}
