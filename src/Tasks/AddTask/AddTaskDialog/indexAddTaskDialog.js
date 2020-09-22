export const mapDispatchToProps = (dispatch)=>({
   showSnack:()=>{
       dispatch({
           type:'SHOW_SNACK'
       })
   },
    addTask:(payload)=>{
       dispatch({
           type: 'ADD_TASK',
           payload:payload
       })
    }
});
export const mapStateToProps = (state)=>{
    return state
};