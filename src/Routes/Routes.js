import React from "react";
import {Router} from 'react-router-dom'
import {Route} from 'react-router'
import {createBrowserHistory} from 'history'
import LoginForm from "../Form/Form";
import NavBar from "../NavigationBar/NavigationBar";
import UserInfo from '../My_Profile/My_Profile'
import Tasks from "../Tasks/Tasks";
import Companies from "../Companies/Companies";
import Clients from "../Clients/Clients";
import Archives from "../Archives/Archives";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import {Provider} from 'react-redux'
import {store} from "../Store/Store";
import userTasks from "../userTasks/userTasks";

const hist = createBrowserHistory();

class Routes extends React.Component{
    render() {
        return(
            <Provider store = {store}>
               <Router history={hist}>
                   <Route exact path ='/' component={LoginForm}/>
                   {window.location.pathname !== '/' && <Route component={NavBar}/>}
                   <Route>
                       <Route path='/main' render={(props) => (<LeftNavBar {...props} context='LeftNavBarMain'/>)}/>
                       <Route exact path='/main/tasks' component={Tasks}/>
                       <Route exact path='/main/companies' component={Companies}/>
                       <Route exact path='/main/clients' component={Clients}/>
                  </Route>
                  <Route>
                       <Route path='/mytasks' render={(props) => (<LeftNavBar {...props} context='LeftNavBarMyTasks'/>)}/>
                       <Route exact path='/mytasks/usertasks' component={userTasks}/>
                       <Route exact path='/mytasks/archive' component={Archives}/>
                    </Route>
                    <Route>
                       <Route exact path='/profile/my_profile' component={UserInfo}/>
                       <Route path='/profile' render={(props) => (<LeftNavBar {...props} context='LeftNavBarProfile'/>)}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}


export default Routes

