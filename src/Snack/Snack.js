import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from "./indexSnack";





class Snack extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open:false
        }
    }

    handleClose = ()=>{
        this.setState({
            open:false
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.success){
            this.props.changeSuccess();
            this.setState({
                open:true
            })
        }
    }

    render() {
        return(
            <Snackbar
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                message="Done"
            />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Snack)