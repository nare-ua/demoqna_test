import style from "./css/App.module.css";
const Header=({title})=>{
    return(
        <header className={style.header}>
        <p className={style.title}>
            <span style={{color:'#282B67'}}>UNITED ASSOCIATES
            </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
    <span style={{color:'#FF2F92'}}>*</span>
    <span style={{color:'#0096FF'}}>{title} DEMO</span>
      </p>
        
        </header>
    )
}
export default Header;