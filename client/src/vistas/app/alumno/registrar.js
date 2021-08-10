import React, { useState } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col, CustomInput } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { SelectField } from '../../../helpers/Select';
import { connect } from 'react-redux';

const selectCurso = [
    { label: "Paracaidista", value: "Paracaidista", key: 0 },
    { label: "Plegador", value: "Plegador", key: 1 },
    { label: "Salto Libre", value: "Salto Libre", key: 2 },
]


const RegistrarAlumno = props => {
    const [alumno, setAlumno] = useState({
        curso: "",
        num_casco: "",
        postulante: ""
    })

    const submitAlumno = value => {
        console.log(value);
    };

    return(
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="title-cite">Cite</p>
                    <p>Alumnos/registrar alumnos</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver alumnos</h3>
                </div>
                <div className="container-data-materia">
                    <Card>
                        <CardBody>
                            <Formik
                                enableReinitialize
                                initialValues={alumno}
                                onSubmit={values=>submitAlumno(values)}
                            >{({values})=>
                                <Form>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>CURSO:</Label>
                                                <Field 
                                                    name='curso' 
                                                    options={selectCurso} 
                                                    component={SelectField}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"20px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Postulante:</Label>
                                                <Field 
                                                    name='postulante' 
                                                    options={selectCurso} 
                                                    component={SelectField}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>Numero de Casco:</Label>
                                                <Field 
                                                    className="form-control"
                                                    name="num_casco"
                                                    type="number"
                                                    placeholder="Años de servicio"
                                                    required
                                                    values={values.servi}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button type="submit">REGISTRAR</Button>
                                </Form>
                            }</Formik>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RegistrarAlumno;