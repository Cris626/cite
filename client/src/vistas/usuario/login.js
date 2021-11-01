import React, { useState } from 'react';
import { Card, Label, FormGroup, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions';

const Login = props => {
    const [data, setData] = useState({ correo: "", contraseña: "" });

    const userLogin = (data) => {
        props.loginUser({data, props});
    }

    return(
        <Card className="auth-card">
            <div className="container-login">
                <div className="wrap-login">
                    <Formik
                        initialValues={data}
                        onSubmit={(val)=>userLogin(val)}
                    >{
                        <Form className="login-form av-tooltip tooltip-label-bottom">
                            <div className="img-login-photo"></div>
                            <p className="login-form-title">Iniciar Sesión</p>
                            <FormGroup className="form-group has-float-label">
                                <Label>Correo: </Label>
                                <Field 
                                    className="form-control"
                                    name="correo"
                                    autoComplete="off"
                                    placeholder="Correo"
                                />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                                <Label>Contraseña: </Label>
                                <Field 
                                    className="form-control"
                                    name="contraseña"
                                    type="password"
                                    placeholder="Contraseña"
                                />
                            </FormGroup>
                            <Button color="secondary" className="btn-user-login" type="submit">
                                <span>Ingresar</span>
                            </Button>
                        </Form>
                    }
                    </Formik>
                </div>
            </div>
        </Card>
    )
}

const mapStateToProps = ({ usuarios }) => {
    return {usuarios}
}

const mapDispatchToProps = dispatch => ({
    loginUser: value => dispatch(loginUser(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);