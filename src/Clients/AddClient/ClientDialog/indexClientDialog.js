export const mapDispatchToProps = (dispatch)=> ({
    updateData:(payload)=>{
        dispatch({
            type:'ADD_CLIENT',
            payload:payload
        })
    },
    showSnack:()=>{
        dispatch({
            type: 'SHOW_SNACK'
        })
    }
});


export const mapStateToProps = (state) =>{
    return state
};