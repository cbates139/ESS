import React, { Component } from 'react'
import { Jumbotron, Container, Button ,Image, Row, Col } from 'react-bootstrap';
export default class Home extends Component {
    render() {
        return (
            <div className="Home">
<head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>
                <Jumbotron fluid>
                    <Container>
                        <Row>
                            <Col id="jumboText">
                                <h1>ABC Energy Limited</h1>
                                <p>Here at ABC, we are commited in providing you with the best customer experience. Please login to our new online system to manage your account!</p>
                                <Button>Learn More</Button>
                            </Col>
                            <Col>
                                <Image src="https://static1.squarespace.com/static/5ad0c317c258b4273c536d84/t/5bb660d7652dea6de23b28ea/1596206567201/?format=1500w"></Image>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
