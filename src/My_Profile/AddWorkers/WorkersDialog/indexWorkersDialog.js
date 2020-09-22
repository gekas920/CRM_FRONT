export const mapDispatchToProps = (dispatch)=>({
    showSnack:()=>{
        dispatch({
            type: 'SHOW_SNACK'
        })
    }
});
export const mapStateToProps = (state) =>{
    return state
};