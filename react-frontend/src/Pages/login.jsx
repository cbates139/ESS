import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

export default function Login(props) {

    // login obj
    const [user, setUser] = useState({});


    function onSubmit(event) {

        event.preventDefault()
        fetch('user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(data => {
                        localStorage.setItem('token', data.token) // setting token in local storage
                        // setting logged in user for Router.
                        props.setLoggedUser(data.user);

                        switch(data.user.accountType) {
                            case 'E':
                                props.history.push("quoteRequests")
                                break;
                            default: 
                                props.history.push("dashboard")
                            break;
                        }
                    })
                    console.log(response)
                }
                else (alert("Incorrect Login Details!"))
            }).catch(err => console.log(err))
    }

    return (
      //login form
        <div className="Login">
        <head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>  
        <Form onSubmit={onSubmit}>
          <Form.Group size="lg" controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              onChange={(event) => setUser({ ...user, username: event.target.value })} // calling event handler   
              defaultValue={user.username}  // global variable 
              required
            />
          </Form.Group>
          <Form.Group size="lg" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => setUser({ ...user, password: event.target.value })} // calling event handler   
              defaultValue={user.password}  // global variable 
              required
            />
          </Form.Group>
          <Button block size="lg" type="submit">Login</Button>
        </Form>
      </div>
    )
}