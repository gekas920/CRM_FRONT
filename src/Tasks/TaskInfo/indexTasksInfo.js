export const mapDispatchToProps = (dispatch)=>({
    removeTask: (payload) => {
        dispatch({
            type: 'DELETE_TASK',
            payload: payload
        })
    },
    takeTask: (payload) => {
        dispatch({
            type: 'TAKE_TASK',
            payload:payload
        })
    },
    showSnack: ()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});

export const mapStateToProps = (state)=>{
    return state
};