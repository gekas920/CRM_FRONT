import React from "react";
import {StyledTableCell, StyledTableRow} from "../Tasks/TaskElem";
import Request from "../Requests";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Warning} from "@material-ui/icons";
import TaskInfo from "../Tasks/TaskInfo/TaskInfo";



class Archives extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            clicked:'',
            showInfo:false
        };
    }
    componentDidMount() {
        Request.get('/tasks/archive')
            .then(response=>{
                this.setState({data:response.data});
            })
    }


    rowElem = (data) =>{
        return(
            <StyledTableRow key={data.id}
                            onClick = {()=>this.setState({clicked:data.id,showInfo:true})}
                            className='tasks-box-elem'>
                <StyledTableCell component="th" scope="row">
                    {data.name}
                </StyledTableCell>
                <StyledTableCell align="right" >{data.user_firstname || '---'}</StyledTableCell>
                <StyledTableCell align="right">{data.result_description}</StyledTableCell>
                <StyledTableCell align="right" >{data.deadline}</StyledTableCell>
            </StyledTableRow>
        )
    };

    tableContent = () =>{
        return this.state.data.map(elem=>{
            return this.rowElem(elem)
        })
    };
    updateShowInfo = (value) => {
        this.setState({showInfo: value})
    };

    render() {
        return(
            <div>
                {this.state.showInfo && <TaskInfo
                    show={this.state.showInfo}
                    updateShowInfo={this.updateShowInfo}
                    id = {this.state.clicked}
                />}
                <div className='tasks-box'>
                    <TableContainer component={Paper} style={{width:'70%',marginTop:'25px',overflowX:'hidden'}}>
                        <Table className={{minWidth:'700px'}} aria-label="customized table">
                            <TableHead  style={{border:'2px solid #0080ff'}}>
                                <TableRow>
                                    <StyledTableCell style={{backgroundColor:'#0080ff'}}>Name</StyledTableCell>
                                    <StyledTableCell style={{backgroundColor:'#0080ff'}} align="right">Executor</StyledTableCell>
                                    <StyledTableCell style={{backgroundColor:'#0080ff'}} align="right">Result</StyledTableCell>
                                    <StyledTableCell style={{backgroundColor:'#0080ff',
                                        display:'flex',marginBottom:'-3px'}}
                                                     align="right">Deadline <Warning style={{
                                        width:'20px',
                                        marginRight:'5px',
                                        marginTop:'-2px'
                                    }}/>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.tableContent()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

export default Archives;