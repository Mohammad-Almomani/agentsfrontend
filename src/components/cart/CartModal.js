import { Box, CardMedia, Grid, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "@mui/material/Button";
// import Modal from "react-bootstrap/Modal";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import image from "../assets/img.jpg";
import empty from "./assets/empty_cart.png";
import { Image } from "@mui/icons-material";
import { Link } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    alignItems: "center",
    justifyContent: "center",
  };
  

export default function CartModal(props) {
    const { user, updateUserCart } = useLoginContext();
  const { post } = usePostContext();
  const [price, setPrice] = useState(0);

  const handleClose = (event, reason) => {
    props.handleClose();
  };

  useEffect(() => {
    let total = 0;
    post?.map((item) => {
        if (user?.cart?.includes(item.id)) {
            total += item.price;
        }
    });
    setPrice(total);
    }, [user?.cart]);

    const addToCart = (id) => {
        let cart = [...user?.cart] || [];
        if (cart.includes(id)) {
          cart = cart.filter((item) => item !== id);
        } else {
          cart.push(id);
        }
        updateUserCart({ cart: cart });
      };

  return (
    <>
      <Modal
       
        open={props.show}
        onClose={handleClose}
        keepMounted
      >
        <Box sx={style} >
        <h2 >My Cart</h2>
        <Typography>
        {post?.map((item, idx) => {
        if (user?.cart?.includes(item.id)) {
          return (
            <Card sm={{ display: "flex" }} key={idx}>
              <Box sm={{ display: "flex", flexDirection: "auto" }}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item lg={3}>
                    <CardMedia
                      component="img"
                      sx={{ width: 170 }}
                      image={item.imgURL || image}
                      alt="Item Image"
                    />
                  </Grid>

                  <Grid item lg={2}>
                    Item: {item.title}
                  </Grid>

                  <Grid item lg={2}>
                    Seller: {item.username}
                  </Grid>
                  <Grid item lg={2}>
                    Price: {item.price}$
                  </Grid>
                  <Grid item lg={2}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => addToCart(item.id)}
                    >
                      Remove From Cart
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          );
        }
      })}
      {user?.cart?.length > 0 && (
        <Grid container justifyContent="center" alignItems="center" sx={{marginTop:1}} spacing={3}>
          <Grid item sz={12}>
            Total Price: {price}$
          </Grid>
        </Grid>
      )}
      {user?.cart?.length === 0 && (
        <>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item sm={12}>
              <Image
                src={empty}
                alt="empty cart"
                style={{ width: "50%", height: "50%" }}
              />
            </Grid>
            <Grid item sm={12}>
              <Button
                type="submit"
                component={Link}
                to="/"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Go Shopping
              </Button>
            </Grid>
          </Grid>
        </>
      )}
        </Typography>
        <Typography >
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleClose()}
            
          >
            Close
          </Button>
        </Typography>
        </Box>
      </Modal>
    </>
  );
}
