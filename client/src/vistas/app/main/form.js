import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { getInstructors } from '../../../redux/actions';

const Form = props => {

    useEffect(async ()=>{
        await props.getInstructors();
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
    getInstructors: () => dispatch(getInstructors())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);