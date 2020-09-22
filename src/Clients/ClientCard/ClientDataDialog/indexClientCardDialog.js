export const mapDispatchToProps = (dispatch)=> ({
    showSnack:()=>{
        dispatch({
            type:'SHOW_SNACK',
        })
    },
    updateData:(payload)=>{
        dispatch({
            type:'DELETE_CLIENT',
            payload:payload
        })
    },
});

export const mapStateToProps = (state) =>{
    return state
};