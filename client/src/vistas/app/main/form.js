import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { resetStore } from '../../../redux/actions';

const Form = props => {

    useEffect(async ()=>{
        await props.resetStore();
    },[])


    return(
        <div className="form-main">
            <div className="title-cite">
                <h1>Centro de instrucción de tropas especiales</h1>
            </div>
            <div className="img-cite-logo">
            </div>
        </div>
    )
}

const mapStateToProps = ({ curso }) => {
    return { curso };
}

const mapDispatchToProps = dispatch => ({
    resetStore: () => dispatch(resetStore())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);