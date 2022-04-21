import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function Product(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    //sets the product information 
    setProduct(props.productValue);
  }, [props.id]);

  function sendProduct() {
    props.sendProduct(product);
  }

  return (
    <Card style={{ width: "100%", margin: "15px", height: "475px" }} onClick={sendProduct}>
      <Card.Header>{product.name}</Card.Header>
      <Card.Body style={{paddingBottom: "15px !important"}}> 
        <img style={{ height: "350px ", width: "250px"}}src={product.imageUrl} alt={product.name}></img>
      </Card.Body>
    </Card>
  );
}
