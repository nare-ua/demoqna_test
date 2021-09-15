import { Row, Alert } from "react-bootstrap";

const APIText = (props) => {
    console.log("APIText ::", props.text);
    let _Original = "";
    let _StandardAmericanEnglish = "";
    let _StandardBritishEnglish = "";
    let _Answer = "";

    if (props.text.Original) {
        console.log("ori있음", props.text.Original)
        // setOriginal(props.text.Original);
        _Original = (<Alert variant="primary">
                        <Alert.Heading>Original</Alert.Heading>
                        <p>{props.text.Original}</p>
                    </Alert>);
    }
    if (props.text.StandardAmericanEnglish) {
        console.log("SAE있음", props.text.StandardAmericanEnglish)
        let _saeVal = props.text.StandardAmericanEnglish;
        let _saeLastStr = _saeVal.slice(-1);
        if (_saeLastStr === ".") {

            // setStandardAmericanEnglish(props.text.setStandardAmericanEnglish);
            _StandardAmericanEnglish = (<Alert variant="success">
                                        <Alert.Heading>Standard American English</Alert.Heading>
                                        <p>{props.text.StandardAmericanEnglish}</p>
                                    </Alert>);
        }
    }
    if (props.text.StandardBritishEnglish) {
        console.log("SBE있음", props.text.StandardBritishEnglish)
        let _saeVal = props.text.StandardBritishEnglish;
        let _saeLastStr = _saeVal.slice(-1);
        if (_saeLastStr === ".") {
            // setStandardAmericanEnglish(props.text.setStandardAmericanEnglish);
            _StandardBritishEnglish = (<Alert variant="success">
                                        <Alert.Heading>Standard British English</Alert.Heading>
                                        <p>{props.text.StandardBritishEnglish}</p>
                                    </Alert>);
        }
    }
    if (props.text.Answer) {
        console.log("Answer있음", props.text.Answer)
        // setAnswer(props.text.Answer)
        _Answer = (
            <Alert variant="danger">
                <Alert.Heading>guide your text</Alert.Heading>
                <p>{props.text.Answer}</p>
            </Alert>
        );
    }

    return(
        <Row>
            {_Original}
            {_StandardAmericanEnglish}
            {_StandardBritishEnglish}
            {_Answer}
        </Row>
    )
}

export default APIText;