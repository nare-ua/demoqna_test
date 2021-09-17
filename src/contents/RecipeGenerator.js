import { Component } from "react";
import common from "../common/APIConnection";
import { Col, Container, FormControl, InputGroup, Row, Button, Spinner, Badge, Alert } from "react-bootstrap";
import RecipeGeneratorAPIRow from "./ApiRow/summarizeRow/RecipeGeneratorApiRow";
import style from "../components/Body/css/App.module.css";

export default class RecipeGenerator extends Component{

    constructor( props ) {
        super(props);
        this.state = {
            recipeName:"Frito Pie",
            inputIngredients:"Fritos\nChili\nShredded cheddar cheese\nSweet white or red onions, diced small\nSour cream",
            btnUI:  <Button className="primary" size="lg"
                        onClick = {(e) => this.requestAPI(this.state.myInputText)}
                    >Generate</Button>,
            loadingBtn:<Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />Loading...</Button>,
            defaultBtn:<Button className="primary" size="lg"
                            onClick = {(e) => this.requestAPI(this.state.myInputText)}
                        >Generate</Button>,
            recipeResult:"",
        }
    }

    requestAPI (params) {
        this.setState({btnUI:this.state.loadingBtn})
        let _temperature = 0;
        let _max_tokens = 200;
        let _top_p = 1.0;
        let _frequency_penalty = 0.0;
        let _presence_penalty = 0.0;
        let _engine = "davinci-instruct-beta";
        let _prompt = "Write a recipe based on these ingredients and instructions:\n\n" + this.state.recipeName + "\n\nIngredients:\n" + this.state.inputIngredients + "\n\nDirections:";

        params = {
            "engine"              : _engine,
            "prompt"              : _prompt,
            "temperature"         : _temperature,
            "max_tokens"          : _max_tokens,
            "top_p"               : _top_p,
            "frequency_penalty"   : _frequency_penalty,
            "presence_penalty"    : _presence_penalty,
        };

        common.requestAPI (params) 
        .then((res) => {
            let rtnParam = this.splitCustomer(res.data.choices[0].text);
            if (res.data) {
                this.setState({
                    recipeResult: <RecipeGeneratorAPIRow text={rtnParam} />,
                })
            }
        })
        .catch((err) => {
            if (err.response) {
                console.log("error response::", err.response.data);
            } else if (err.request) {
                console.log("error request::", err.request);
            } else {
                console.log("error ::", err.message);
            }
        })
        .finally(() => {
            this.setState({btnUI:this.state.defaultBtn})
        })
    }

    //json 가공
    splitCustomer = (param) => {
        console.log("splitCustomer::", param);
        let test1 = param.split("\n");
        let rtnVals = [];
        // console.log("testSplit::", test1);
        
        for (let i = 1; i<test1.length; i++) {
            if (test1[i] === this.state.recipeName) {
                break;
            } else {

                if (test1[i]) {
                    if (i > 1) {
                        rtnVals.push( test1[i] );
                    } else {
                        rtnVals.push( test1[i] );
                    }
                } 
            }
        }
        // console.log("result::", rtnVals)
        return rtnVals;
    }

    inputRecipe (e, inputNames) {
        if (inputNames === "recipeName") {
            this.setState({
                recipeName:e.target.value,
            })
        } else if (inputNames === "ingredients") {
            console.log("ingredients ::", e.target.value)
            this.setState({
                inputIngredients:e.target.value,
            })
        }
    }

    render() {
        return(
            <Container>
                <h1 className={style.RecipeGenerator} style={{fontWeight:"bold"}}>Recipe Generator</h1>
                <Row>
                    <Col>
                        <Alert variant="light">
                            <Alert.Heading><b className="m-2">Menu :</b></Alert.Heading>
                            <FormControl 
                            className="mb-2"
                            placeholder="Recipe Name" aria-label="Recipe Name"
                            defaultValue={this.state.recipeName}
                            onChange = {(e) => this.inputRecipe(e, "recipeName")}
                            />
                            <b className="m-2">Ingredients :</b>
                            <FormControl 
                                className="mt-2"
                                as="textarea" style={{ height: "200px",}} 
                                defaultValue={this.state.inputIngredients} 
                                onChange = {(e) => this.inputRecipe(e, "ingredients")}
                            />
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-grid gap-2">
                        {this.state.btnUI}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        {this.state.recipeResult}
                    </Col>
                </Row>
            </Container>
        )
    }
}