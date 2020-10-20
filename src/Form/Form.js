import React from 'react'
import './Form.css'
import bird from './bird.png'
import Request from "../Requests";
import {Redirect} from "react-router";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            valid:false
        };
        this.checkToken();
    }

    handleChange = name => event => {
        this.setState({ ...this.state.value, [name]: event.target.value });
    };

    styledInput = (arr,ind) =>{
        arr[ind].style.border = '1px solid red';
        setTimeout(()=>{
            arr[ind].style.border = 0;
        },3000);
    };

    sendData = ()=>{
      let body = {login:this.state.login,password:this.state.password};
      let arr = document.querySelectorAll('.login-input');
      Request.update('/login',body)
          .then(response=>{
              switch (response.data) {
                  case 'incorrect data':
                      this.styledInput(arr,0);
                      break;
                  case 'incorrect password':
                      this.styledInput(arr,1);
                      break;
                  default:
                      localStorage.setItem('token',response.data);
                      window.location.href = '/main/tasks'
              }
          })
    };

    checkToken = () => {
        Request.get('/check')
            .then((response)=>{
                if(response){
                    this.setState({
                        valid:true
                    })
                }
            })
    };

    render() {
        if(this.state.valid){
            return <Redirect to='/main/tasks'/>
        }
        return(
            <div className='container'>
                <img className='form-logo' src={bird} alt='logo'/>
                <div className='form'>
                    <div>
                        <p>
                            <label>
                                Логин:
                                <input className='login-input' type={'text'} name={'login'} placeholder={'Введите логин'}
                                       value={this.state.login} onChange={this.handleChange('login')}/>
                            </label>
                        </p>
                    </div>
                    <div>
                        <p>
                            <label>Пароль:
                                <input className='login-input' type={'password'} name={'password'} placeholder={'Введите пароль'}
                                       value={this.state.password} onChange={this.handleChange('password')}/>
                            </label>
                        </p>
                    </div>
                    <div>
                        <p>
                            <button className={'login-btn'} onClick={this.sendData}>Войти</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm