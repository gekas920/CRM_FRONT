export const mapDispatchToProps = (dispatch)=> ({
    pushClientsData:(payload)=>{
        dispatch({
            type:'PUSH_CLIENTS_DATA',
            payload:payload
        })
    }
});


export const mapStateToProps = (state) =>{
    return state
};