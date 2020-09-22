import React from 'react'
import './ClientCard.css'
import Request from "../../Requests";
import {Dialog} from "@material-ui/core";
import InfoCard from "./ClientDataDialog/ClientDataDialog";
import {connect} from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from "./indexClientCard";

class ClientCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            client_name: '',
            client_surname: '',
            client_thirdname: '',
            client_phone: '',
            client_date: '',
            link: '',
            company_name: '',
        };
    }

    showClient = () => {
        this.props.clientClick(this.props.id);
        Request.get(`/clients/${this.props.id}`)
            .then(response=>{
                this.setState({open:true,...response.data});
            })
    };

    handleClose = () =>{
        this.setState({open : false});
    };

    render() {
        return(
            <div>
                <div className='clientCard' key={this.props.id} onClick={this.showClient}>
                    <img src={this.props.imgLink}
                         className='clientCard-img' alt={this.props.firstName}/>
                    <div>
                        <h2>{this.props.firstName}</h2>
                        <h2>{this.props.secondName}</h2>
                        <h3>{this.props.company}</h3>
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose}><InfoCard {...this.state}/></Dialog>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClientCard);