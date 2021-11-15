import React, { useState } from "react";
import { sendCode } from '../../redux/actions';
import { Card, Button, Input } from "reactstrap";
import { connect } from 'react-redux';

const SendCode = props => {
    const [code, setCode] = useState('');

    const handleSubmit = (event) =>{
        const { history, match } = props;
        props.sendCode({code, history, match});
        event.preventDefault();
    }

    return(
        <Card className="auth-card">
            <div className="container-login">
                <div className="container-forgot-password">
                    <h1 style={{textAlign: 'center'}}>INGRESAR CODIGO</h1>
                    <h3>Ingrese el codigo para la restauracion de contraseña que fue enviado a su correo:</h3>
                    <form onSubmit={handleSubmit}>
                        <Input type="code" value={code} style={{marginTop: "40px"}} onChange={(event)=>setCode(event.target.value)} placeholder="Ingresar Codigo" required/>
                        <Button type="submit" style={{marginTop: "40px", float: "right"}} className="field">Enviar</Button>
                    </form>
                    <Button onClick={()=>props.history.push('/user/forgotPassword')} style={{marginTop: "40px"}} className="field">Atras</Button>
                </div>
            </div>
        </Card>
    )
}

const mapStateToProps = ({ usuarios }) => {
    return {usuarios}
}

const mapDispatchToProps = dispatch => ({
    sendCode: value => dispatch(sendCode(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SendCode);