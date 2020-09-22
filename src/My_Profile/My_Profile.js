import React from "react";
import Request from "../Requests";
import "./My_Profile.css";
import FormPropsTextField from "../Form/FormPropsTextField";
import AddWorkerIcon from "./AddWorkers/AddWorkersIcon";



class UserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            secondName:'',
            thirdName:'',
            date:'',
            post:'',
        }
    }

    componentDidMount() {
        Request.get('/user')
            .then(response=>{
                this.setState({
                    firstName:response.data.firstName,
                    secondName: response.data.secondName,
                    thirdName: response.data.thirdName,
                    date: response.data.date,
                    post: response.data.post
                });
            })
    }
    logOut() {
        localStorage.clear();
        window.location.href = '/';
    }
    render() {
        return(
            <div>
                <AddWorkerIcon/>
                <div className='my--profile--box'>
                    <div className='card'>
                        <div>
                            {FormPropsTextField(this.state.secondName,'Second Name')}
                        </div>
                        <div>
                            {FormPropsTextField(this.state.firstName, 'First Name')}
                        </div>
                        <div>
                            {FormPropsTextField(this.state.thirdName,'Third Name')}
                        </div>
                        <div>
                            {FormPropsTextField(this.state.post,'Post')}
                        </div>
                        <div>
                            {FormPropsTextField(this.state.date,'Date')}
                        </div>
                        <div>
                            <button type={'submit'} className='logout-btn' onClick={this.logOut}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;