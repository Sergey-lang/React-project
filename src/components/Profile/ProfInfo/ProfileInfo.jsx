import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';


const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }
    if(!props.profile.photos.large) {
             return (`photo didn't find`)       
    }
    return (
        <div>
            {/* <div>
                <img className={s.imageProfile}
                    src='http://getwallpapers.com/wallpaper/full/0/c/8/1311997-sound-wave-wallpaper-1920x1080-for-ipad-pro.jpg'/>
            </div> */}
            <div className={s.discriptionBlock}>
                <img className={s.personalPhoto} src={props.profile.photos.large}/>
                <div><ProfileStatus status={`Hello,It's difficult time`}/></div>
                <p>{props.profile.aboutMe}</p>
                <p>{props.profile.contacts.instagram}</p>
                <p>{props.profile.userId}</p>
            </div>
        </div>
    )
}

export default ProfileInfo;

