import React, { useState } from "react";
import { sendPassword } from '../../redux/actions';
import { Card, Button, Input } from "reactstrap";
import { connect } from 'react-redux';

const NewPassword = props => {
    const [password, setPassword] = useState('');

    const handleSubmit = (event) =>{
        const { history, match } = props;
        props.sendPassword({password, history, match});
        event.preventDefault();
    }

    return(
        <Card className="auth-card">
            <div className="container-login">
                <div className="container-forgot-password">
                    <h1 style={{textAlign: 'center'}}>INGRESAR NUEVA CONTRASEÑA</h1>
                    <h3>Ingrese su nueva contraseña</h3>
                    <form onSubmit={handleSubmit}>
                        <Input type="password" value={password} style={{marginTop: "40px"}} onChange={(event)=>setPassword(event.target.value)} placeholder="Ingresar Nueva Contraseña" required/>
                        <Button type="submit" style={{marginTop: "40px", float: "right"}} className="field">Enviar</Button>
                    </form>
                    <Button onClick={()=>props.history.push('/user/forgotPassword')} style={{marginTop: "40px"}} className="field">Cancelar</Button>
                </div>
            </div>
        </Card>
    )
}

const mapStateToProps = ({ usuarios }) => {
    return {usuarios}
}

const mapDispatchToProps = dispatch => ({
    sendPassword: value => dispatch(sendPassword(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPassword);