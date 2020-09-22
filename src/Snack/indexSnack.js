export const mapDispatchToProps = (dispatch)=> ({
    changeSuccess:()=>{
        dispatch({
            type:'HIDE_SNACK',
        })
    }
});


export const mapStateToProps = (state) => {
    return state.snackContent
};
