import React from "react";
import "./Tasks.css";
import {StyledTableCell, StyledTableRow} from "./TaskElem";
import Request from "../Requests";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Warning} from "@material-ui/icons";
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from "./indexTasks";
import TaskInfo from "./TaskInfo/TaskInfo";
import AddTaskIcon from "./AddTask/AddTaskIcon";


class Tasks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            clicked:'',
            showInfo:false
        };
    }
    componentDidMount() {
        Request.get('/tasks')
            .then(response=>{
                this.setState({data:response.data});
                this.props.pushTasks(response.data);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            this.setState({
                data:this.props.tasksData.tasksData
            })
        }
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
                {this.state.showInfo && <TaskInfo show={this.state.showInfo}
                                                  updateShowInfo={this.updateShowInfo}
                                                  id = {this.state.clicked}
                                                  path='all'
                />}
            <div className='tasks-box'>
               {localStorage.getItem('post') === 'Manager' &&  <AddTaskIcon/>}
            <TableContainer component={Paper} style={{width:'70%',marginTop:'25px',overflowX:'hidden'}}>
                <Table className={{minWidth:'700px'}} aria-label="customized table">
                    <TableHead  style={{border:'2px solid #0080ff'}}>
                        <TableRow>
                            <StyledTableCell style={{backgroundColor:'#0080ff'}}>Название</StyledTableCell>
                            <StyledTableCell style={{backgroundColor:'#0080ff'}} align="right">Исполнитель</StyledTableCell>
                            <StyledTableCell style={{backgroundColor:'#0080ff'}} align="right">Результат</StyledTableCell>
                            <StyledTableCell style={{backgroundColor:'#0080ff',
                                display:'flex',marginBottom:'-3px'}}
                                             align="right">Срок сдачи <Warning style={{
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

export default connect(mapStateToProps,mapDispatchToProps)(Tasks);