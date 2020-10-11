import React from "react";
import './ClientDataDialog.css'
import TextField from "@material-ui/core/TextField";
import {mapDispatchToProps, mapStateToProps} from "./indexClientCardDialog";
import {connect} from 'react-redux'
import Request from "../../../Requests";

class InfoCard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: this.props.client_name,
            surname: this.props.client_surname,
            thirdName: this.props.client_thirdname,
            phone: this.props.client_phone,
            date: this.props.client_date,
            link: this.props.link,
            company: this.props.company_name,
            open: false
        };
    }
    handleChange = name => event => {
        this.setState({...this.state.value, [name]: event.target.value });
    };

    deleteClient = () =>{
      Request.delete(`clients/${this.props.getClientId.user_id}`)
          .then(response=>{
              if(response.status === 200){
                  this.props.showSnack();
                  this.props.updateData(this.props.getClientId.user_id);
              }
          })
    };

    clientDialogTextField = (name,label_form,name2) => {
        return(
            <TextField
                onChange={this.handleChange(name2)}
                disabled={!this.state.open}
                label={label_form}
                value={name}
                style={
                    {
                        marginTop: 10,
                    }
                }
                variant="outlined"
            />
        )
    };

    render()
        {
            return (
                <div className='client-info-dialog'>
                    <div className='client-form-dialog'>
                        <div>
                            <img src={this.state.link} className='client-img-dialog' alt={this.state.name}/>
                        </div>
                        <div>
                            {this.clientDialogTextField(this.state.name,'Name','name')}
                        </div>
                        <div>
                            {this.clientDialogTextField(this.state.surname,'Surname','surname')}
                        </div>
                        <div>
                            {this.clientDialogTextField(this.state.thirdName,'Third name','thirdName')}
                        </div>
                        <div>
                            {this.clientDialogTextField(this.state.phone,'Phone','phone')}
                        </div>
                        <div>
                            {this.clientDialogTextField(this.state.company,'Company')}
                        </div>
                       { localStorage.getItem('post') === 'Manager' && <button className='client-btn' onClick={this.deleteClient}>
                            Delete Client
                        </button>}
                    </div>
                </div>)
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(InfoCard);