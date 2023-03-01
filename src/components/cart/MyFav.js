import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import ItemCard from "../listedItems/ItemCard";
import noFav from "./assets/noFav.png";

export default function MyFav() {
  const { user } = useLoginContext();
  const { post } = usePostContext();

  return (
    <Container maxWidth="xl"  justifyContent="center" alignItems="center">
      <h1> My Favorite</h1>
    <Grid container spacing={2} mt={5}>

      {post?.map((item, idx) => {
        if (user?.favorite?.includes(item.id)) {
          return (
            <Grid item sm={6} md={4} xl={3} key={idx} >
              <ItemCard
                username={item.username}
                description={item.description}
                price={item.price}
                id={item.id}
                usersComments={item.usersComments}
                title={item.title}
                imgURL={item.imgURL[0]}
                category={item.category}
                idx={idx}
              />
            </Grid>
          );
        } else {
          return null;
        }
      })}
      {user?.favorite?.length === 0 && (
        <>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item sm={12}>
              <Image
                src={noFav}
                alt="empty favorite"
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
                Go Add Some
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
    </Container>
  );
}
