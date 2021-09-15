import { Alert, Row } from "react-bootstrap";

const NotesToSummaryAPIRow = (props) => {
    console.log("NotesToSummaryAPIRow ::", props.text);
    let _SummarizeText = "";

    if (props.text) {
        console.log("Notes To Summary API result ::");
        _SummarizeText = (
            <Alert variant="success">
                <Alert.Heading>Summary :</Alert.Heading>
                <hr />
                <p>{props.text}</p>
            </Alert>
        );
    }

    return(
        <Row>
            {_SummarizeText}
        </Row>
    )
}

export default NotesToSummaryAPIRow;