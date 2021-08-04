import React, { useState } from 'react';
import Select from 'react-select';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";

const selectInterval = [
    { label: "Paracaidista", value: "Paracaidista", key: 0 },
    { label: "Plegador", value: "Plegador", key: 1 },
    { label: "Salto Libre", value: "Salto Libre", key: 2 },
];

const CrearCurso = props => {
    const [data, setData] = useState({ correo: "xxx@gmail.com", contraseña: "xxx123" });

    const submitCourses = (data) => {
        console.log(data)
    }

    return(
        <div className="form-create-course">
            <div className="container-create-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Cursos/crear curso</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Crear Cursos</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Formik
                                initialValues={data}
                                onSubmit={(val)=>submitCourses(val)}
                            >
                                <Form>
                                    <Row>
                                        <Col msd={6}>
                                            <FormGroup>
                                                <Label>Seleccione Curso:</Label>
                                                <Select
                                                    className="react-select-type"
                                                    classNamePrefix="react-select-type"
                                                    name="form-field-name"
                                                    options={selectInterval}
                                                    placeholder= "Tipo de Curso"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sd={6}>
                                            <FormGroup>
                                                <Label>Fecha de inicio y fin de curso</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group col-md-10">
                                                        <input type="Date" class="form-control" id="apertura_curso" name="apertura_curso"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col sd={6}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group col-md-10">
                                                        <input type="Date" class="form-control" id="cierre_curso" name="cierre_curso"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Formik>
                        </CardBody>    
                    </Card>
                </div>
            </div>
           {/* <div class="form-group col-md-6">
                 <label for="inputFecha4">Fechas de inicio y fin de Curso</label>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputFecha4">Fecha Inicio</label>
                        <input type="Date" class="form-control" id="apertura_curso" name="apertura_curso"  placeholder="Fecha" required></input>
                        <span id="fechas_cursos" class="error-message">*Revise las fechas.</span>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputFecha4">Fecha Fin</label>
                        <input type="Date" class="form-control" id="cierre_curso" name="cierre_curso"  placeholder="Fecha"  required></input>
                    </div>
                    
                </div> 
            </div>*/}
        </div>
    )
}

export default CrearCurso;