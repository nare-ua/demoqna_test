import { Alert, Row } from "react-bootstrap";

const SummarizeAPIText = (props) => {
    console.log("SummarizeAPIText ::", props.text);
    let _SummarizeText = "";

    if (props.text) {
        console.log("Summarize for 2nd grader result ::");
        _SummarizeText = (
            <Alert variant="success">
                <Alert.Heading>Summarize For 2nd grader</Alert.Heading>
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

export default SummarizeAPIText;