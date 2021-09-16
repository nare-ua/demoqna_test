import { Alert, Row } from "react-bootstrap";

const RecipeGeneratorAPIRow = (props) => {
    console.log("RecipeGeneratorAPIRow ::", props.text);
    let _GeneratorRecipeText = "";

    if (props.text) {
        console.log("Recipe Generator API result ::");
        _GeneratorRecipeText = (
            <Alert variant="success">
                <Alert.Heading>Directions :</Alert.Heading>
                <hr />
                {props.text.map( (values, i) => (
                    <p key={i}>{ values }</p>
                ))}
            </Alert>
        );
    }

    return(
        <Row>
            {_GeneratorRecipeText}
        </Row>
    )
}

export default RecipeGeneratorAPIRow;