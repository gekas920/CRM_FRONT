import React from "react";
import {BusinessCenter, Dashboard, People,LibraryBooks,Portrait, Assignment} from "@material-ui/icons";
import {Link} from "react-router-dom";
import './LeftMenuElem.css'



function LeftMenuElem(props){
    let img;
    switch (props.context) {
        case 'Компании':
            img = <BusinessCenter style={{pointerEvents:'none'}}/>;
            break;
        case 'Задачи':
            img = <Assignment style={{pointerEvents:'none'}}/>;
            break;
        case 'Мои задачи':
            img = <Dashboard style={{pointerEvents:'none'}}/>;
            break;
        case 'Клиенты':
            img = <People style={{pointerEvents:'none'}}/>;
            break;
        case 'Архив':
            img = <LibraryBooks style={{pointerEvents:'none'}}/>;
            break;
        case 'Профиль':
            img = <Portrait style={{pointerEvents:'none'}}/>;
            break;
        default:
            break;
    }

    function handleClick(event){
       let arr = document.querySelectorAll('.left--navbar--elem');
       arr.forEach(elem=>{
           elem.classList.remove('addColor')
       });
       let elem = event.target;
       elem.classList.add('addColor');
    }


    return(
            <Link className={`left--navbar--elem ${props.link === window.location.pathname ? 'addColor' : ''}`} to={props.link} onClick={handleClick}>
                    {img}
                    <p>{props.context}</p>
            </Link>
        )
}

export default LeftMenuElem