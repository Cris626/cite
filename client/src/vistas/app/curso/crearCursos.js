import React, { useState } from 'react';
import Select from 'react-select';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";

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
                                        <Col md={6}>
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
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fecha de inicio y fin de curso</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_curso" name="apertura_curso"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="cierre_curso" name="cierre_curso"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col mmd={6}>
                                            <FormGroup>
                                                <Label>Fecha de pre-inscripcion:</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="fecha_preinscripcion" name="fecha_preinscripcion"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fecha examen psicológico</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_psicol" name="apertura_psicol"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="cierre_psicol" name="cierre_psicol"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fecha de examen médico</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_medico" name="apertura_medico"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="cierre_medico" name="cierre_medico"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fechas examen físico</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_fisico" name="apertura_fisico"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_fisico" name="apertura_fisico"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col mmd={6}>
                                            <FormGroup>
                                                <Label>Inaguración de curso:</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="inauguracion" name="inauguracion"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fechas de Entrenamiento en Tierra</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_tierra" name="apertura_tierra"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="cierre_tierra" name="cierre_tierra"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fechas de Entrenamiento en Tierra</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="apertura_saltos" name="apertura_saltos"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div class="form-row">
                                                    <div class="form-group ">
                                                        <input type="Date" class="form-control" id="cierre_saltos" name="cierre_saltos"  placeholder="Fecha" required></input>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup><br/>
                                                <Label>Jefe de Curso</Label>
                                                <Select
                                                    className="react-select-type"
                                                    classNamePrefix="react-select-type"
                                                    name="form-field-name"
                                                    options={selectInterval}
                                                    placeholder= "Jefe de curso"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Button color="danger" style={{float: "right"}}>Cancelar</Button>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Button color="secondary">Crear</Button>
                                            </FormGroup>
                                        </Col>
                                        
                                    </Row>
                                </Form>
                            </Formik>
                        </CardBody>    
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CrearCurso;