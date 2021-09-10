import { Col, Row } from "react-bootstrap";
import style from "./css/App.module.css";
const Header=({title})=>{
    return(
        <header className={style.header}>
        <p className={style.title}>
            <Row>
                <Col className={style.titleName}>
                    <span style={{color:'#282B67'}}>UNITED ASSOCIATES</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={style.titleSub} style={{color:'#FF2F92'}}>*</span>
                    <span className={style.titleSub} style={{color:'#0096FF'}}>{title} DEMO</span>
                
                </Col>
            </Row>
            <hr style={{border:'black solid 5px'}}/>
        </p>
        </header>
    )
}
export default Header;