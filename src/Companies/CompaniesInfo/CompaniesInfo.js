import React from "react";
import './CompaniesInfo.css'
import ArrowIcon from '@material-ui/icons/ArrowBack';
import {connect} from "react-redux";
import {mapStateToProps,mapDispatchToProps} from "./indexCompaniesInfo";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Request from "../../Requests";


class CompaniesInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.companyClick.company_name,
            desc : this.props.companyClick.desc,
            link : this.props.companyClick.link,
            image : this.props.companyClick.img,
            text : this.props.companyClick.text,
            showButton : true,
            disabled:false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props)
            this.setState({
                name : this.props.companyClick.company_name,
                desc : this.props.companyClick.desc,
                link : this.props.companyClick.link,
                image : this.props.companyClick.img,
                text : this.props.companyClick.text,
                disabled:false
            })
    }

    deleteCompany = () =>{
        Request.delete(`/companies/${this.props.companyClick.id}`)
            .then(response=>{
                if(response.status === 200){
                    this.props.showSnack();
                    this.props.deleteCompany(this.props.companyClick.id);
                    this.setState({
                        disabled:true
                    })
                }
            })
    };

    render() {
        return(
            <div className={this.props.show ? 'companies-info-box companies-info-box-show' : 'companies-info-box'}>
                <div>
                    <button className={'back-btn'} onClick={() => {this.props.updateShowInfo(!this.props.show)}}>
                        <ArrowIcon/>
                    </button>
                </div>
                <div>
                    {localStorage.getItem('post') === 'Manager' && <button className='companies-info-box-btn'
                            onClick={this.deleteCompany} disabled={this.state.disabled}>
                        <DeleteForeverIcon/>
                    </button>}
                </div>
                <div className='box-companies-info'>
                    <div className='box-companies-info-image'>
                        <img src={this.state.image} alt={this.state.name}/>
                    </div>
                    <div>
                        <a className='box-companies-info-link' href={this.state.link}>{this.state.name} </a>
                        <p className='box-companies-info-p'>{this.state.desc}</p>
                    </div>
                    <div className='box-companies-info-desc'>
                        <ExpansionPanel style={{minWidth:'70%',margin: '0 auto'}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography>Описание</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography style={{overflow:'scroll',maxHeight:'300px'}}>
                                    {this.state.text}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompaniesInfo);