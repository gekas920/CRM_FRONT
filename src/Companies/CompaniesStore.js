
export const mapDispatchToProps = (dispatch)=> ({
    clickCompany:(payload)=>{
        dispatch({
            type:'COMPANY_CLICK',
            payload:payload
        })
    },
    pushData:(payload)=>{
        dispatch({
            type: 'PUSH_COMPANY_DATA',
            payload:payload
        })
    },
    updateData:(payload)=>{
        dispatch({
            type:'DELETE_COMPANY',
            payload:payload
        })
    }
});


export const mapStateToProps = (state) =>{
    return state
};