import { Button, Grid } from "@mui/material";
import React from "react";
import {  Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../Context/AuthContext";
import { usePostContext } from "../../Context/PostsContext";
import ModalFather from "../listedItems/ModalFather";
import noFav from "./assets/noFav.png";

export default function MyFav() {
  const { user } = useLoginContext();
  const { post } = usePostContext();

  return (
    <Row style={{ marginLeft: "7.5%" }} xs={1} sm={2} md={3} className="g-4">
      {post?.map((item, idx) => {
        if (user?.favorite?.includes(item.id)) {
          return (
       <Col key={idx}>
                    <ModalFather
                      username={item.username}
                      description={item.description}
                      price={item.price}
                      id={item.id}
                      usersComments={item.usersComments}
                      title={item.title}
                      imgURL={item.imgURL}
                      category={item.category}
                    />
                  </Col>
                );
              } else {
                return null;
              }
            }         
      )}
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
      </Row>
  );
}

