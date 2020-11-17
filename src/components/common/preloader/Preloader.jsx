import React from "react";
import preloader from "../../../asets/images/preloader.gif";
import s from './Preloader.module.css';


let Preloader = () => {
	return <div><img alt={'preloader'} className={s.preloader} src={preloader} /></div>
}

export default Preloader;