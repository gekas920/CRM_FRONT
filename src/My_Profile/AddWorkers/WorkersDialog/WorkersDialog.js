import React from "react";
import Request from "../../../Requests";
import Chip from "@material-ui/core/Chip";
import {connect} from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from "./indexWorkersDialog";

class WorkersDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            login:'',
            password:'',
            name: '',
            surname: '',
            thirdName: '',
            date: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
            clickedPost:'',
            post: [],
            errors: {
                validLogin:'Login must be 6 characters long!',
                validPassword:'Password must be 6 characters long!',
                validName: 'Name must be 4 characters long!',
                validSurname: 'Surname  must be 5 characters long!',
                validThirdName: 'Third name must be 8 characters long!',
                validDate: 'Date must exist!',
            },
            disabled:false,
            show:false,
            content:''
        };
    }

    handleChange = name => event => {
        let input = event.target;
        switch (name) {
            case 'login':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validLogin:input.value.length > 5
                            ? ''
                            : 'Login must be 6 characters long!'
                    }
                }));
                break;
            case 'password':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validPassword:input.value.length > 5
                            ? ''
                            : 'Password must be 6 characters long!'
                    }
                }));
                break;
            case 'name':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validName:input.value.length > 3
                            ? ''
                            : 'Name must be 4 characters long!'
                    }
                }));
                break;
            case 'surname':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validSurname:input.value.length > 4
                            ? ''
                            : 'Surname  must be 5 characters long!'
                    }
                }));
                break;
            case 'thirdName':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validThirdName:input.value.length > 7
                            ? ''
                            : 'Third name must be 8 characters long!'
                    }
                }));
                break;
            case 'date':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validDate:!!input.value.length
                            ? ''
                            : 'Date must exist'
                    }
                }));
                break;
            default:
                break;
        }

        this.setState({...this.state.errors,[name]: event.target.value});
    };

    sendData = ()=>{
        if(this.state.errors.validLogin || this.state.errors.validPassword || this.state.errors.validName
            || this.state.errors.validSurname || this.state.errors.validThirdName
            || this.state.validDate ){
            this.setState({
                show:true,
                content:this.state.errors.validLogin || this.state.errors.validPassword ||
                    this.state.errors.validName || this.state.validSurname || this.state.errors.validThirdName
                    || this.state.validDate
            });
            setTimeout(()=>{
                this.setState({
                    show:false
                })
            },3000)
        }
        else {
            let body = {
                login: this.state.login,
                password:this.state.password,
                name: this.state.name,
                surname: this.state.surname,
                thirdName: this.state.thirdName,
                date: this.state.date,
                clickedPost: this.state.clickedPost,
            };
            Request.create('/users', body)
                .then(response=>{
                    if(response.status === 200){
                        this.props.showSnack();
                        this.setState({
                            disabled:true
                        })
                    }
                })
        }
    };

    componentDidMount() {
        Request.get('/posts/name')
            .then(response=>{
                this.setState({post : response.data,clickedPost:response.data[0]});
            })
    };

    getOption(name) {
        return <option value = {name} key={name}>{name}</option>
    };

    mapOption(){
        return this.state.post.map(value => {
            return this.getOption(value.post)
        })
    };

    render() {
        return(
            <div className='container-dialog'>
                <div className='form-dialog'>
                    {this.state.show && <Chip label={this.state.content} color="secondary" style={{width:'100%'}}/>}
                    <div>
                        Login:
                        <input className='clients-input'
                               placeholder={'Enter Login'}
                               value={this.state.login}
                               name={'login'}
                               onChange={this.handleChange('login')}/>
                    </div>
                    <div>

                        Password:
                        <input className='clients-input'
                               name={'password'}
                               value={this.state.password}
                               placeholder={'Enter Password'}
                               onChange={this.handleChange('password')}/>
                    </div>
                    <div>
                                Name:
                                <input className='clients-input' type={'text'} name={'name'} placeholder={'Enter Name'}
                                       value={this.state.name} onChange={this.handleChange('name')}/>
                    </div>
                    <div>

                                Surname:
                                <input className='clients-input' type={'text'} name={'surname'} placeholder={'Enter Surname'}
                                       value={this.state.surname} onChange={this.handleChange('surname')}/>
                    </div>
                    <div>

                                Third Name:
                                <input className='clients-input' type={'text'} name={'thirdName'} placeholder={'Enter Third Name'}
                                       value={this.state.thirdName} onChange={this.handleChange('thirdName')}/>
                    </div>
                    <div>
                                Date:
                                <input className='clients-input' type={'date'} name={'date'} placeholder={'Enter Date'}
                                       value={this.state.date} onChange={this.handleChange('date')}/>
                    </div>
                    <div>
                                Post:
                                <select className='clients-input' name={'post'} placeholder={'Enter Post'}
                                        onChange={this.handleChange('clickedPost')}>
                                    {this.mapOption()}
                                </select>
                    </div>
                    <div>
                            <button className={'clients-btn'} onClick={this.sendData} disabled={this.state.disabled}>
                                Create worker
                            </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkersDialog)