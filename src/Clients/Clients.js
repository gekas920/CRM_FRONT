import React from 'react'
import './Clients.css'
import ClientCard from "./ClientCard/ClientCard";
import Request from "../Requests";
import AddClientIcon from "./AddClient/AddClientIcon";
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from "./indexClients";

class Clients extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.clientsData.clientsData,
        };
    }
    componentDidMount() {
        Request.get('/clients')
            .then(response=>{
                this.props.pushClientsData(response.data)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.setState({
                data:this.props.clientsData.clientsData,
            })
        }
    }

    showClients(){
        return this.state.data.map(elem=>{
            return <ClientCard firstName = {elem.client_name}
                               secondName = {elem.client_surname}
                               company = {elem.company_name}
                               imgLink = {elem.link}
                               id = {elem.id}
                               key = {elem.id}
            />
        })
    }

    render(){
        return(
            <div>
                <div className='clients-box'>
                   <div className='clientCard-box'>
                       {this.showClients()}
                   </div>
                </div>
                {localStorage.getItem('post') === 'Manager' &&  <AddClientIcon/>}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Clients);