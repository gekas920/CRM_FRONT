import * as React from "react"
import {Link} from "react-router-dom"
import './NavigationBar.css'
import Snack from "../Snack/Snack";
import {mapDispatchToProps, mapStateToProps} from "./indexNavBar";
import {connect} from "react-redux";
import Request from "../Requests";

class NavBar extends React.Component
{
    componentDidMount() {
        Request.get('/users/name')
            .then(response=>{
                this.props.pushName(response.data.name);
                localStorage.setItem('post',response.data.post)
            });
    }

    handleClick = event=>{
      let arr = document.querySelectorAll('.navbar--elem');
      let elem = event.target;
      arr.forEach(elem=>{
         elem.style.backgroundColor = '';
         elem.style.borderBottom = 0
      });
      elem.style.backgroundColor = 'whitesmoke';
      elem.style.borderBottom = '2px #0080ff solid'
    };

    render() {
        return(
            <div style={window.location.pathname === '/' ? {display:'none'} : {}}>
                <header>
                    <div className='navbar'>
                        <ul>
                            <li><Link to='/main/tasks' className='navbar--elem'
                                      style = {window.location.pathname.includes('main') ?
                                          {backgroundColor:'whitesmoke',borderBottom :'2px #0080ff solid'} : {}}
                                      onClick={this.handleClick}>Главная</Link></li>
                            <li><Link to='/mytasks/usertasks' className='navbar--elem'
                                      style = {window.location.pathname.includes('mytasks') ?
                                          {backgroundColor:'whitesmoke',borderBottom :'2px #0080ff solid'} : {}}
                                      onClick={this.handleClick}>Мои задачи</Link></li>
                            <li><Link to='/profile/my_profile' className='navbar--elem'
                                      style = {window.location.pathname.includes('profile') ?
                                          {backgroundColor:'whitesmoke',borderBottom :'2px #0080ff solid'} : {}}
                                      onClick={this.handleClick}>Профиль</Link></li>
                        </ul>
                    </div>
                </header>
                <Snack/>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)