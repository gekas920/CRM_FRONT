import React from "react";
import Request from "../../../Requests";
import '../../../Clients/AddClient/ClientDialog/ClientDialog.css'
import {connect} from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from './indexAddCompanyDialog'
import Chip from "@material-ui/core/Chip";



class AddCompanyDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            type: '',
            link:'',
            photoLink:'',
            description:'',
            errors: {
                validName: 'Name must be 4 characters long!',
                validType: 'Type  must be 2 characters long!',
                validLink: 'Link must be 8 characters long!',
                validPhotoLink: 'Link to photo must be 10 characters long!',
                validDescription:'Description must be 10 characters long!'
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
            case 'type':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validType:input.value.length > 2
                            ? ''
                            : 'Type  must be 2 characters long!'
                    }
                }));
                break;
            case 'photoLink':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validPhotoLink:input.value.length > 10
                            ? ''
                            : 'Link to photo must be 10 characters long!'
                    }
                }));
                break;
            case 'link':
                this.setState(()=>({
                    errors: {
                        ...this.state.errors,
                        validLink:input.value.length > 8
                            ? ''
                            : 'Link must be 8 characters long!'
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
            default:
                break;
        }

        this.setState({...this.state.errors,[name]: event.target.value});
    };

    sendData = ()=>{
        if(this.state.errors.validName || this.state.errors.validLink
            || this.state.errors.validPhotoLink || this.state.errors.validType || this.state.errors.validDescription){
            this.setState({
                show:true,
                content:this.state.errors.validName || this.state.validType || this.state.errors.validDescription
                    || this.state.errors.validPhotoLink || this.state.errors.validLink
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
                type:this.state.type,
                link:this.state.link,
                photoLink:this.state.photoLink,
                description:this.state.description
            };
            Request.create('/companies',body)
                .then(response=>{
                    if(response.data){
                        this.props.showSnack();
                        this.props.addCompany(response.data);
                        this.setState({
                            disabled:true
                        })
                    }
                });
        }
    };

    inputField(stateField,userField){
        return(
            <p>
            <label>
                {userField}
                <input className='clients-input' type={'text'} name={stateField} placeholder={`Enter ${userField}`}
                        onChange={this.handleChange(stateField)}/>
            </label>
            </p>
        )
    }


    render() {
        return(
            <div className='container-dialog' style={{height:'600px'}}>
                <div className='form-dialog'>
                    {this.state.show && <Chip label={this.state.content} color="secondary" style={{width:'100%'}}/>}
                        {this.inputField('name','Name')}
                        {this.inputField('type','Type')}
                        {this.inputField('link','Link')}
                        {this.inputField('photoLink','link to photo')}
                        {this.inputField('description','Description')}
                        <button className={'clients-btn'} onClick={this.sendData} disabled={this.state.disabled}>
                                Create company
                        </button>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddCompanyDialog)