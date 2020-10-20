import React from "react";
import Request from "../../../Requests";
import './ClientDialog.css';
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from "./indexClientDialog";
import Chip from "@material-ui/core/Chip";



class ClientDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            surname: '',
            thirdName: '',
            phone: '',
            date: '',
            link: '',
            clickedCompany:'',
            value: '',
            company: [],
            errors: {
                validName: 'Name must be 4 characters long!',
                validSurname: 'Surname  must be 5 characters long!',
                validThirdName: 'Third name must be 8 characters long!',
                validPhone: 'Phone must be 8 characters long!',
                validLink: 'Link must be 18 characters long!',
            },
            disabled:false,
            show:false,
            content:''
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
            case 'surname':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validSurname:input.value.length > 5
                            ? ''
                            : 'Surname  must be 5 characters long!'
                    }
                }));
                break;
            case 'thirdName':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validThirdName:input.value.length > 8
                            ? ''
                            : 'Third name must be 8 characters long!'
                    }
                }));
                break;
            case 'phone':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validPhone:input.value.length > 8
                            ? ''
                            : 'Phone must be 8 characters long!'
                    }
                }));
                break;
            case 'link':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validLink:input.value.length > 16
                            ? ''
                            : 'Link must be 18 characters long!'
                    }
                }));
                break;
            default:
                break;
        }

        this.setState({...this.state.errors,[name]: event.target.value});
    };

    sendData = ()=>{
        if(this.state.errors.validName || this.state.errors.validLink
            || this.state.errors.validPhone || this.state.errors.validSurname || this.state.errors.validThirdName){
            this.setState({
                show:true,
                content:this.state.errors.validName || this.state.validSurname || this.state.errors.validThirdName
                    || this.state.errors.validPhone || this.state.errors.validLink
            });
            setTimeout(()=>{
                this.setState({
                    show:false
                })
            },3000)
        }
        else {
            let body = {
                name: this.state.name,
                surname: this.state.surname,
                thirdName: this.state.thirdName,
                phone: this.state.phone,
                date: this.state.date,
                link: this.state.link,
                clickedCompany: this.state.clickedCompany
            };
            Request.create('/clients', body)
                .then(response=>{
                    if(response.status === 200){
                        this.props.showSnack();
                        this.props.updateData(Object.assign({},body,{id:response.data.id}));
                        this.setState({
                            disabled:true
                        })
                    }
                })
        }
    };

    componentDidMount() {
        Request.get('/companies/name')
            .then(response=>{
                console.log(response);
                this.setState({company : response.data,clickedCompany:response.data[0].company_name});
            })
    };

    getOption(name) {
        return <option value = {name} key={name}>{name}</option>
    };

    inputField(stateField,userField){
        return(
            <p>
                <label>
                    {userField}
                    <input className='clients-input' type={'text'} name={stateField} placeholder={`${userField}`}
                           onChange={this.handleChange(stateField)}/>
                </label>
            </p>
        )
    }

    render() {
        return(
            <div className='container-dialog'  style={{height:'900px'}}>
                <div className='form-dialog'>

                    {this.inputField('name','Имя')}
                    {this.inputField('surname','Фамилия')}
                    {this.inputField('thirdName','Отчество')}
                    {this.inputField('company','Компания')}
                    {this.inputField('phone','Телефон')}
                    {this.inputField('date','Дата рождения')}
                    {this.inputField('link','Ссылка на фото')}
                    {this.state.show && <Chip label={this.state.content} color="secondary" style={{width:'100%'}}/>}
                    <div>
                        <button className={'clients-btn'} onClick={this.sendData} disabled={this.state.disabled}>
                            Создать клиента
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientDialog)