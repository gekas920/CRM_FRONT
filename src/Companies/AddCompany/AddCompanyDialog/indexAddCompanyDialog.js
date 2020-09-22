export const mapDispatchToProps = (dispatch)=>({
   addCompany:(payload)=>{
       dispatch({
           type:'ADD_COMPANY',
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