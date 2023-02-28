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
import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import image from "../assets/img.jpg";
import { red } from "@mui/material/colors";
import AddCommentForm from "../Forms/Add-comment-form";
import { useLoginContext } from "../../Context/AuthContext";
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

  const addToFav = () => {
    let favorite = [...user?.favorite] || [];
    if (favorite.includes(props.id)) {
      favorite = favorite.filter((item) => item !== props.id);
    } else {
      favorite.push(props.id);
    }
    updateUserCart({ favorite: favorite });
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    // scroll to bottom every you add a new comment
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props]);


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
                alignItems="center"
              >
                <Grid item sm={5}>
                  <CardMedia
                    component="img"
                    image={props.imgURL || image}
                    alt="Item Image"
                  />
                </Grid>

                <Grid item sm={7} style={{ fontSize: "20px" }}>
                  <Grid item>Item: {props.title}</Grid>
                  <Grid item>Description: {props.description}</Grid>
                  <Grid item>Seller: {props.username}</Grid>
                  <Grid item>
                    <Typography variant="body" color="text">
                      <Grid
                        container
                        justifyContent="space-between"
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
                <Grid item sm={12}>
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
                            sx={{ mb: 2 }}
                            key={idx}
                            ref={bottomRef}
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
                    {props.usersComments?.length === 0 && (
                      <p>No Comments Here</p>
                    )}

                    {isAuthorized && (
                      <AddCommentForm
                        postID={props.id}
                        gitPosts={props.gitPosts}
                        idx={props.idx}
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
