import React, { useState } from "react";
import { forgotPasswordEmail } from '../../redux/actions';
import { Card, Button, Input } from "reactstrap";
import { connect } from 'react-redux';

const ForgotPass = props => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) =>{
        const { history } = props;
        props.forgotPassword({email, history});
        event.preventDefault();
    }
    return(
        <Card className="auth-card">
            <div className="container-login">
                <div className="container-forgot-password">
                    <h1 style={{textAlign: 'center'}}>Recuperar contraseña</h1>
                    <h3>Ingrese su correo registrado:</h3>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" value={email} style={{marginTop: "40px"}} onChange={(event)=>setEmail(event.target.value)} placeholder="Ingresar Correo" required/>
                        <Button type="submit" style={{marginTop: "40px", float: "right"}} className="field">Enviar</Button>
                    </form>
                    <Button onClick={()=>props.history.push('/')} style={{marginTop: "40px"}} className="field">Atras</Button>
                </div>
            </div>
        </Card>
    )
}

const mapStateToProps = ({ usuarios }) => {
    return {usuarios}
}

const mapDispatchToProps = dispatch => ({
    forgotPassword: value => dispatch(forgotPasswordEmail(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPass);