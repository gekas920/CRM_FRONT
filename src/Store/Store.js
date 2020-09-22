import {combineReducers, createStore} from "redux";
import {
    clientsData,
    companyClick,
    companyData,
    getClientId,
    needUpdate,
    pushName,
    snackContent,
    tasksData
} from "./Reducers";


export const store = createStore(combineReducers({
    companyClick,
    needUpdate,
    snackContent,
    getClientId,
    companyData,
    clientsData,
    tasksData,
    pushName
}));

// store.subscribe(()=>{
//      console.log(store.getState())
//  });