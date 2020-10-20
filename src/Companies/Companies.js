import React from 'react';
import MaterialTable from 'material-table';
import './Companies.css'
import Request from "../Requests";
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from "./CompaniesStore";
import CompaniesInfo from "./CompaniesInfo/CompaniesInfo";
import AddCompanyIcon from "./AddCompany/AddCompanyIcon";

class Companies extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Наименование', field: 'company_name' },
                { title: 'Тип', field: 'desc' },
            ],
            data: this.props.companyData.companyData,
            showInfo: false
        };
    }

    componentDidMount() {
        Request.get('/companies')
            .then(response=>{
                this.props.pushData(response.data)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.setState({
                data:this.props.companyData.companyData
            });
        }
    }

    rowClick = (event,rowData)=>{
        this.props.clickCompany(rowData);
        this.setState({showInfo : true});
    };

    updateShowInfo = (value) => {
        this.setState({showInfo: value})
    };

    render() {
        return (
            <div>
                <CompaniesInfo show = {this.state.showInfo} updateShowInfo={this.updateShowInfo} />
                <div className='companies-box'>
                     <MaterialTable
                         options={{
                             pageSizeOptions:[5,10]
                         }}
                         title="Компании"
                         columns={this.state.columns}
                         data={this.state.data}
                         style={{
                             width:'70%'
                         }}
                         onRowClick={this.rowClick}
                     />
                     <AddCompanyIcon/>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Companies)