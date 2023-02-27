import * as React from "react";
import { Col, Row } from "react-bootstrap";
import ModalFather from "./modalFather";
import { Button } from "@mui/material";
import { useLoginContext } from "../Context/AuthContext";
import { usePostContext } from "../Context/PostsContext";

export default function Items() {
  const { handleSignOut } = useLoginContext();
  const { post } = usePostContext();

  return (
    <>
      <Row style={{ marginLeft: "7.5%" }} xs={1} sm={2} md={3} className="g-4">
        {post &&
          post.map((pos, idx) => {
            return (
              <Col key={idx}>
                <ModalFather
                  username={pos.username}
                  description={pos.description}
                  price={pos.price}
                  id={pos.id}
                  usersComments={pos.usersComments}
                  title={pos.title}
                  imgURL={pos.imgURL}
                />
              </Col>
            );
          })}
      </Row>
      <a style={{ display: "block", marginTop: "2%" }}>
        You are done here? don't forget to
        {<Button onClick={handleSignOut}>Sign Out</Button>}
      </a>
    </>
  );
}
