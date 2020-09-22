export const mapDispatchToProps = (dispatch)=>({
    pushName: (payload) => {
        dispatch({
            type: 'PUSH_NAME',
            payload: payload
        })
    }
});

export const mapStateToProps = (state)=>{
    return state
};