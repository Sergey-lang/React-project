import React from "react";
import preloader from "../../../asets/images/preloader.gif";
import s from './Preloader.module.css';

export const Preloader = () => {
	return <div><img alt={'preloader'} className={s.preloader} src={preloader} /></div>
}
