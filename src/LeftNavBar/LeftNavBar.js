import React from 'react'
import LeftMenuElem from "../LeftMenuElem/LeftMenuElem";
import '../LeftMenuElem/LeftMenuElem.css'


function LeftNavBar(props) {
   switch (props.context) {
       case 'LeftNavBarMain':
           return(
               <div className='main--box'>
                   <div className='left--navbar'>
                       <LeftMenuElem context='Задачи' link='/main/tasks'/>
                       <LeftMenuElem context='Компании' link='/main/companies'/>
                       <LeftMenuElem context='Клиенты' link='/main/clients'/>
                   </div>
               </div>
           );
       case 'LeftNavBarMyTasks':
           return(
               <div className='main--box'>
                   <div className='left--navbar'>
                       <LeftMenuElem context='Мои задачи' link='/mytasks/usertasks'/>
                       <LeftMenuElem context='Архив' link='/mytasks/archive'/>
                   </div>
               </div>
           );
       case 'LeftNavBarProfile':
           return(
               <div className='main--box'>
                   <div className='left--navbar'>
                       <LeftMenuElem context='Профиль' link='/profile/my_profile'/>
                   </div>
               </div>
           );
       default:
           break;
   }
}

export default LeftNavBar;