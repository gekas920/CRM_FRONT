export const mapDispatchToProps = (dispatch)=>({
    pushTasks:(payload)=>{
        dispatch({
            type:'PUSH_TASKS',
            payload:payload
        })
    }
});

export const mapStateToProps = (state)=>{
    return state
};