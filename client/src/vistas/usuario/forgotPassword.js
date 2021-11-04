import React, { useState } from "react";
import { forgotPassword } from '../../redux/actions';
import { Card, Label, FormGroup, Button, Input } from "reactstrap";
import { connect } from 'react-redux';

const ForgotPass = props => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('')

    const handleSubmit = (event) =>{
        const { history } = props;
        event.preventDefault();
        props.forgotPassword({email, newPassword, history});
    }

    return(
        <Card className="auth-card">
            <div className="container-login">
                <div className="container-forgot-password">
                    <h1 style={{textAlign: 'center'}}>Recuperar contraseña</h1>
                    <h3>Ingrese su correo registrado:</h3>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" value={email} style={{marginTop: "40px"}} onChange={(event)=>setEmail(event.target.value)} placeholder="Ingresar Correo" required/>
                    <h3>Ingrese su nueva contraseña:</h3>
                        <Input type="password" value={newPassword} style={{marginTop: "30px"}} onChange={(event)=>setNewPassword(event.target.value)} placeholder="Ingresar Nueva contraseña" required/>
                        <Button type="submit" style={{marginTop: "40px", float: "right"}} className="field">Cambiar</Button>
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
    forgotPassword: value => dispatch(forgotPassword(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPass);