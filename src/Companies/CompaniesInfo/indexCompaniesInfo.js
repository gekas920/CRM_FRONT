export const mapDispatchToProps = (dispatch) => ({
    showSnack:()=>{
        dispatch({
            type:'SHOW_SNACK',
        })
    },
    deleteCompany:(payload)=>{
        dispatch({
            type: 'DELETE_COMPANY',
            payload:payload
        })
    }
});
export const mapStateToProps = (state) =>{
    return state
};