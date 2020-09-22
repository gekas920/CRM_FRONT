import React from 'react'
import LeftMenuElem from "../LeftMenuElem/LeftMenuElem";
import '../LeftMenuElem/LeftMenuElem.css'


function LeftNavBar(props) {
   switch (props.context) {
       case 'LeftNavBarMain':
           return(
               <div className='main--box'>
                   <div className='left--navbar'>
                       <LeftMenuElem context='Tasks' link='/main/tasks'/>
                       <LeftMenuElem context='Companies' link='/main/companies'/>
                       <LeftMenuElem context='Clients' link='/main/clients'/>
                   </div>
               </div>
           );
       case 'LeftNavBarMyTasks':
           return(
               <div className='main--box'>
                   <div className='left--navbar'>
                       <LeftMenuElem context='My Tasks' link='/mytasks/usertasks'/>
                       <LeftMenuElem context='Archive' link='/mytasks/archive'/>
                   </div>
               </div>
           );
       case 'LeftNavBarProfile':
           return(
               <div className='main--box'>
                   <div className='left--navbar'>
                       <LeftMenuElem context='My Profile' link='/profile/my_profile'/>
                   </div>
               </div>
           );
       default:
           break;
   }
}

export default LeftNavBar;