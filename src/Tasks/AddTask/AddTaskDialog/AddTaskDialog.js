import React from "react";
import Request from "../../../Requests";
import '../../../Clients/AddClient/ClientDialog/ClientDialog.css'
import {connect} from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from "./indexAddTaskDialog";
import Chip from "@material-ui/core/Chip";



class AddTaskDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            description:'',
            beginning:'',
            deadline:'',
            errors: {
                validName: 'Name must be 4 characters long!',
                validBeginning: 'Beginning time must exists',
                validDeadline: 'Deadline time must exists',
                validDescription:'Description must be 10 characters long!'
            },
            disabled:false,
            show:false,
            content:'',
            clients:[],
            clickedClient:''
        };
    }

    handleChange = name => event => {
        let input = event.target;
        switch (name) {
            case 'name':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validName:input.value.length > 4
                            ? ''
                            : 'Name must be 4 characters long!'
                    }
                }));
                break;
            case 'description':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validDescription:input.value.length > 10
                            ? ''
                            : 'Description must be 10 characters long!'
                    }
                }));
                break;
            case 'beginning':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validBeginning:!!input.value
                            ? ''
                            : 'Beginning time must exists'
                    }
                }));
                break;
            case 'deadline':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validDeadline:!!input.value
                            ? ''
                            : 'Deadline time must exists'
                    }
                }));
                break;
            default:
                break;
        }

        this.setState({...this.state.errors,[name]: event.target.value});
    };

    componentDidMount() {
        Request.get('/clients/names')
            .then(response=>{
                this.setState({
                    clients:response.data,
                    clickedClient:response.data[0].id
                })
            })
    }

    sendData = ()=>{
        if(this.state.errors.validName || this.state.errors.validDescription
            || this.state.errors.validBeginning || this.state.errors.validDeadline){
            this.setState({
                show:true,
                content:this.state.errors.validName || this.state.errors.validDescription
                    || this.state.errors.validBeginning || this.state.errors.validDeadline
            });

            setTimeout(()=>{
                this.setState({
                    show:false
                })
            },3000)
        }
        else {
            let body = {
                name:this.state.name,
                description:this.state.description,
                beginning:this.state.beginning,
                deadline:this.state.deadline,
                user_id:this.state.clickedClient
            };
            Request.create('/tasks',body)
                .then(response=>{
                    if(response.data){
                        this.props.showSnack();
                        this.props.addTask(response.data);
                        this.setState({
                            disabled:true
                        })
                    }
                });
        }
    };

    inputField(stateField,userField,type){
        return(
            <p>
                <label>
                    {userField}
                    <input className='clients-input' type={'text' && type} name={stateField} placeholder={`Enter ${userField}`}
                           onChange={this.handleChange(stateField)}/>
                </label>
            </p>
        )
    }

    getOption(name,surname,id) {
        return <option value = {id} key={name}>{name + ' ' + surname}</option>
    };

    mapOption(){
        return this.state.clients.map(value => {
            return this.getOption(value.client_name,value.client_surname,value.id)
        })
    };

    render() {
        return(
            <div className='container-dialog' style={{height:'600px'}}>
                <div className='form-dialog'>
                    {this.state.show && <Chip label={this.state.content} color="secondary" style={{width:'100%'}}/>}
                    {this.inputField('name','Name')}
                    {this.inputField('description','Description')}
                    {this.inputField('beginning','Beginning','date')}
                    {this.inputField('deadline','Deadline','date')}
                    <p>
                        <label>
                            Client:
                            <select className='clients-input'  placeholder={'Choose client'}
                                    defaultValue='DigitalLeague' onChange={this.handleChange('clickedClient')}>
                                {this.mapOption()}
                            </select>
                        </label>
                    </p>
                    <button className={'clients-btn'} onClick={this.sendData} disabled={this.state.disabled}>
                        Create task
                    </button>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddTaskDialog)