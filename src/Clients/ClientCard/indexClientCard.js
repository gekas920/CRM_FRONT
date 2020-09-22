export const mapDispatchToProps = (dispatch)=> ({
    clientClick:(payload)=>{
        dispatch({
            type:'PUSH_USER_ID',
            payload:payload
        })
    }
});


export const mapStateToProps = (state) =>{
    return state
};