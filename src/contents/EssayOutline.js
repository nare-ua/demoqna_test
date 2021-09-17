import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default class EssayOutline extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <Container>
                <h1 className={style.RecipeGenerator} style={{fontWeight:"bold"}}>Essay Outline</h1>
                <Row>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
        );
    }
}