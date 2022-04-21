import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

export default function Login(props) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();

    var response = await fetch("user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    switch (response.status) {
      case 200:
        props.history.push("login");
        break;
      default:
        var errors = (await response.json()).errors;
        console.log(errors);
        setErrors(errors);

    }
  };

  const onChange = (event) =>
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }));

  return (


    <div className="Signup">
            <head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>
      <Form onSubmit={onSubmit}>
        <Row>
      <Col>
      <h4>Sign Up</h4>
        <Form.Group size="lg" controlId="FirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="firstName"
            onChange={onChange}
            defaultValue={user.firstName}
            required
          />
          {errors?.FirstName ? (
            <Form.Label className="Error">{errors.FirstName[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={onChange}
            defaultValue={user.lastName}
            required
          />
          {errors?.LastName ? (
            <Form.Label className="Error">{errors.LastName[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="Email"
            onChange={onChange}
            defaultValue={user.email}
            required
          />
          {errors?.Email ? (
            <Form.Label className="Error">{errors.Email[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={onChange}
            defaultValue={user.username}
            required
          />
          {errors?.Username ? (
            <Form.Label className="Error">{errors.Username[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={onChange}
            defaultValue={user.password}
            required
          />
          {errors?.Password ? (
            <Form.Label className="Error">{errors.Password[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="AddressLine1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
          type="AddressLine1"
          name="AddressLine1"
          onChange={onChange}
          defaultValue={user.addressLine1}
          required
          />
          {errors?.AddressLine1 ? (
            <Form.Label className="Error">{errors.AddressLine1[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        </Col>
        <Col style={{marginTop:"35px"}}>
        <Form.Group size="lg" cotrolId="AddressLine2">
          <Form.Label>Address Line 2 (optional)</Form.Label>
          <Form.Control
          type="AddressLine2"
          name="AddressLine2"
          onChange={onChange}
          defaultValue={user.addressLine2}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="AddressLine3">
          <Form.Label>Address Line 3 (optional)</Form.Label>
          <Form.Control
          type="AddressLine3"
          name="AddressLine3"
          onChange={onChange}
          defaultValue={user.addressLine3}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="City">
          <Form.Label>City</Form.Label>
          <Form.Control
          type="City"
          name="City"
          onChange={onChange}
          defaultValue={user.city}
          required
          />
          {errors?.City ? (
            <Form.Label className="Error">{errors.City[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>

        <Form.Group size="lg" controlId="Region">
          <Form.Label>Region</Form.Label>
          <Form.Control
          type="Region"
          name="Region"
          onChange={onChange}
          defaultValue={user.region}
          required
          />
          {errors?.Region ? (
            <Form.Label className="Error">{errors.Region[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>

        <Form.Group size="lg" controlId="Postcode">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
          type="Postcode"
          name="Postcode"
          onChange={onChange}
          defaultValue={user.postcode}
          required
          />
          {errors?.Postcode ? (
            <Form.Label className="Error">{errors.Postcode[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Label>Account Type</Form.Label>
        <Form.Group size="lg" controlId="AccountType">
            <Form.Control as="select">
              <option>User</option>
              <option>Employee</option>
              <option>Support</option>
            </Form.Control>
        </Form.Group>
        </Col>
        </Row>
        <div style={{paddingTop:"12%"}}>
        <Button block size="lg" type="submit">
          Sign Up
        </Button>
        </div>
      </Form>
    </div>
  );
}
