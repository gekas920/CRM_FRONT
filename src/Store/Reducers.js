const AppState = {
    name:'',
    desc:'',
    text:'',
    img:'',
    link:'',
    error:'',
    needUpdate:false,
    success:false,
    user_id:'',
    companyData:[],
    clientsData:[],
    tasksData:[],
    username:''
};

export function companyClick(state = AppState,action) {
    if (action.type === 'COMPANY_CLICK') {
        return {
            ...state,
            ...action.payload
        };
    }
    return state
}

export function needUpdate(state = AppState,action) {
    switch (action.type) {
        case 'NEED_UPDATE':
            return{
                ...state,
                needUpdate: true,
            };
        case 'NO_NEED_UPDATE':
            return {
                ...state,
                needUpdate: false
            };
        default:
            return state
    }
}

export function snackContent(state = AppState,action) {
    switch (action.type) {
        case 'SHOW_SNACK':
            return {
                ...state,
                success: true
            };
        case 'HIDE_SNACK':{
            return {
                ...state,
                success: false
            }
        }
        default:
            return state
    }
}

export function getClientId(state = AppState,action) {
    if(action.type === 'PUSH_USER_ID'){
        return{
            ...state,
            user_id: action.payload
        }
    }
    return state
}

export function companyData(state = AppState,action) {
    switch (action.type) {
        case 'PUSH_COMPANY_DATA':
            return{
                ...state,
                companyData: action.payload
            };
        case 'DELETE_COMPANY':
            let arr = state.companyData.filter(elem=>{
                return elem.id !== action.payload
            });
            return {
                ...state,
                companyData: arr
            };
        case 'ADD_COMPANY':
            let elems = state.companyData;
            elems.push(action.payload);
            return {
                ...state,
                companyData: elems
            };
        default:
            return state
    }
}

export function clientsData(state = AppState,action) {
    switch (action.type) {
        case 'PUSH_CLIENTS_DATA':{
            return{
                ...state,
                clientsData: action.payload
            }
        }

        case 'DELETE_CLIENT':{
            let clients = state.clientsData.filter(elem=>{
                return elem.id !== action.payload
            });
            return {
                ...state,
                clientsData: clients
            }
        }
        case 'ADD_CLIENT':{
            let client = {
                id:action.payload.id,
                client_name: action.payload.name,
                client_surname: action.payload.surname,
                thirdName: action.payload.thirdName,
                phone: action.payload.phone,
                date: action.payload.date,
                link: action.payload.link,
                company_name: action.payload.clickedCompany.company_name
            };
            let arr = state.clientsData;
            arr.push(client);
            return {
                ...state,
                clientsData: arr
            }
        }
        default:
            return state
    }
}

export function pushName(state = AppState,action) {
    if(action.type === 'PUSH_NAME'){
        return{
            ...state,
            username: action.payload
        }
    }
    return state
}

export function tasksData(state = AppState,action) {
    switch (action.type) {
        case 'PUSH_TASKS':
            return{
                ...state,
                tasksData:action.payload
            };
        case 'DELETE_TASK':
            let tasks = state.tasksData.filter(elem=>{
                return elem.id !== action.payload
            });
            return {
                ...state,
                tasksData: tasks
            };
        case 'TAKE_TASK':
            let taskArr = state.tasksData.map(elem=>{
                if(elem.id === action.payload.id){
                    elem.user_firstname = action.payload.name
                }
                return elem
            });
            return {
                ...state,
                tasksData: taskArr
            };
        case 'ADD_TASK':
            let arr = state.tasksData;
            let task = {
                id: action.payload.task.id,
                name: action.payload.task.name,
                deadline: action.payload.task.deadline,
                result_description: action.payload.result_description
            };
            arr.push(task);
            return {
                ...state,
                tasksData: arr
            };
        default:
            return state
    }
}