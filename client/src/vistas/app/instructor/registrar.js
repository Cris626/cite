import React, { useState } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col, CustomInput } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { SelectField } from '../../../helpers/Select';
import { connect } from 'react-redux';
import { registerInstructor } from '../../../redux/actions';

const selectGenero = [
    { label: "Masculino", value: "Masculino", key: 0 },
    { label: "Femenino", value: "Femenino", key: 1 }
];

const selectGrado = [
    { label: "SARGENTO INICIAL", value: "Srgto. Ini.", key: 0 },
    { label: "SARGENTO PRIMERO", value: "Srgto. 1ro.", key: 1 },
    { label: "SARGENTO SEGUNDO", value: "Srgto. 2do.", key: 2 },
    { label: "SUBOFICIAL INICIAL", value: "Sof. Ini.", key: 3 },
    { label: "SUBOFICIAL PRIMERO", value: "Sof. 1ro.", key: 4 },
    { label: "SUBOFICIAL SEGUNDO", value: "Sof. 2do.", key: 5 },
    { label: "SUBTENIENTE", value: "Sbtte.", key: 6 },
    { label: "TENIENTE", value: "Tte.", key: 7 },
    { label: "CAPITAN", value: "Cap.", key: 8 },
    { label: "MAYOR", value: "My.", key: 9 },
    { label: "TENIENTE CORONEL", value: "Tcnl.", key: 10 },
    { label: "CORONEL", value: "Cnl.", key: 11 }
]

const Registrar = props => {
    const [instructor, setInstructor] = useState({
        apellido: "",
        certi: [],
        contraseña: "",
        correo: "",
        edad: "",
        genero: "",
        grado: "",
        nombre: "",
        servi: "",
        saltos: "",
    });

    const submitInstructor = (value) => {
        props.registerInstructor(value);
    };

    return(
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="title-cite">Cite</p>
                    <p>Instructores/registrar instructor</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Registrar Instructor</h3>
                </div>
                <div className="container-data-materia">
                    <Card body className="mb-4">
                        <CardBody>
                            <Formik
                                enableReinitialize
                                initialValues={instructor}
                                onSubmit={values=>submitInstructor(values)}
                            >{({values})=>
                                <Form>
                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Nombre:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="nombre"
                                                    type="input"
                                                    placeholder="Nombre"
                                                    required
                                                    values={values.nombre} 
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Apellidos:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="apellido"
                                                    type="input"
                                                    placeholder="apellido"
                                                    required
                                                    values={values.apellido} 
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Edad:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="edad"
                                                    type="number"
                                                    placeholder="Edad"
                                                    required
                                                    values={values.edad} 
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Género:</Label>
                                                <Field 
                                                    name='genero' 
                                                    options={selectGenero} 
                                                    component={SelectField} 
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"20px"}}>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Correo:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="correo"
                                                    type="email"
                                                    placeholder="Correo"
                                                    required
                                                    values={values.correo} 
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Contraseña:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="contraseña"
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    required
                                                    values={values.contraseña} 
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Grado:</Label>
                                                <Field 
                                                    name='grado' 
                                                    options={selectGrado} 
                                                    component={SelectField} 
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Años de servicio:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="servi"
                                                    type="number"
                                                    placeholder="Años de servicio"
                                                    required
                                                    values={values.servi} 
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"20px"}}>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Numero de saltos:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="saltos"
                                                    type="number"
                                                    placeholder="Cantidad de saltos realizados"
                                                    required
                                                    values={values.saltos} 
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"20px"}}>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label>CERTIFICADOS MILITARES:</Label><br/>
                                                <Field type="checkbox" value="ci" name="certi" id="exampleCustomCheckbox" label="CARNET" /><Label style={{margin: "10px 10px"}}>Carnet</Label>
                                                <Field type="checkbox" value="condor" name="certi" id="exampleCustomCheckbox2" label="CONDOR" /><Label style={{margin: "10px 10px"}}>Condor</Label>
                                                <Field type="checkbox" value="satinador" name="certi" id="exampleCustomCheckbox3" label="SATINADOR" /><Label style={{margin: "10px 10px"}}>Satinador</Label>
                                                <Field type="checkbox" value="paracaidista" name="certi" id="exampleCustomCheckbox4" label="PARACAIDISTA" /><Label style={{margin: "10px 10px"}}>Paracaidista</Label>
                                                <Field type="checkbox" value="salto-libre" name="certi" id="exampleCustomCheckbox5" label="SALTO LIBRE" /><Label style={{margin: "10px 10px"}}>Salto libre</Label>
                                                <Field type="checkbox" value="jefe-salto" name="certi" id="exampleCustomCheckbox6" label="JEFE-DE-SALTO" /><Label style={{margin: "10px 10px"}}>Jefe de salto</Label>
                                                <Field type="checkbox" value="plegador" name="certi" id="exampleCustomCheckbox7" label="PLEGADOR" /><Label style={{margin: "10px 10px"}}>Plegador</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button type="submit">REGISTRAR</Button>
                                </Form>}
                            </Formik>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ instructor }) => {
    return {instructor};
}

const mapDispatchToProps = dispatch => ({
    registerInstructor: value => dispatch(registerInstructor(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registrar);

