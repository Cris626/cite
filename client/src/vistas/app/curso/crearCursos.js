import React, { useState, useEffect, useRef } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { registerCourse, getInstructors } from '../../../redux/actions';
import { connect } from 'react-redux';
import { SelectField } from '../../../helpers/Select';

const selectInterval = [
    { label: "Paracaidista", value: "Paracaidista", key: 0 },
    { label: "Plegador", value: "Plegador", key: 1 },
    { label: "Salto Libre", value: "Salto Libre", key: 2 },
];

const CrearCurso = props => {
    const [data, setData] = useState({
        tipo: "",
        apertura_curso: "",
        cierre_curso: "",
        fecha_preinscripcion: "",
        apertura_psicol: "",
        cierre_psicol: "",
        apertura_medico: "",
        cierre_medico: "",
        apertura_fisico: "",
        cierre_fisico: "",
        inauguracion: "",
        apertura_tierra: "",
        cierre_tierra: "",
        apertura_saltos: "",
        cierre_saltos: "",
        jefe_curso: "",
    });
    const [instructores, setInstructores] = useState([]);
    const [optionEdit, setOptionEdit] = useState([]);
    const mounted = useRef(false);

    const submitCourses = (value) => {
        const edit = props.curso.num_curso;
        const { history } = props;
        props.registerCourse({value, history, edit});
    }

    /*
        condor - plegador - satinador - paracaidista - salto libre
        00001     00010       00100       01000          10000
    */

    const filtered = (value) =>{
        switch(value.tipo){
            case "Plegador":
                return instructores.filter(instructor=>instructor.certificados%1000==111)
                break
            case "Paracaidista":
                return instructores.filter(instructor=>instructor.certificados%10000==1111&&instructor.saltos>10)
                break
            case "Salto Libre":
                return instructores.filter(instructor=>instructor.certificados%100000==11111&&instructor.saltos>20)
                break
        }
        return instructores
    }
    const dataInstructors = async () => {
        let instructors = [];
        const { data } = props.curso;
        let vc
        data.map(x=>{
            let instructor = `${x.grado}. ${x.apellido} ${x.nombre}`;
            vc = 0
            x.certi.map(i=>{
                if(i=="condor"){vc+=1;return;}
                if(i=="plegador"){vc+=10;return}
                if(i=="satinador"){vc+=100;return}
                if(i=="paracaidista"){vc+=1000;return}
                if(i=="salto-libre"){vc+=10000;return}
            })
            if(x.saltos){
                instructors.push({label: instructor, value: x.apellido, key: x.nombre, certificados: vc, saltos: x.saltos});
            }else{
                instructors.push({label: instructor, value: x.apellido, key: x.nombre, certificados: vc});
            }
        })
        setInstructores(instructors);
    }

    useEffect(async ()=>{
        if(!mounted.current){
            props.getInstructors();
            if(props.curso.num_curso!==undefined){
                setOptionEdit(handleChangeCurso(props.curso.num_curso[0].tipo));
                setData(props.curso.num_curso[0]);
            }
            mounted.current = true;
        }else{
            dataInstructors();
        }
        
    },[props.curso.data])

    const handleChangeCurso=(tipoCurso)=>{
        return selectInterval.filter(x=>x.value===tipoCurso);
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
                                enableReinitialize
                                initialValues={data}
                                onSubmit={values=>submitCourses(values)}
                            >{({values})=>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                {props.curso.num_curso!==undefined?
                                                <div style={{fontSize:"20px", marginBottom: "-30px"}}>
                                                    <Label>CURSO:</Label><br/>
                                                    <Label>{props.curso.num_curso[0].tipo}</Label><br/>
                                                    <Label>{props.curso.num_curso[0].curso_numero}</Label>
                                                </div>:
                                                <div>
                                                    <Label>Seleccione Curso:</Label>
                                                    <Field name='tipo' options={selectInterval} component={SelectField} />
                                                </div>}
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fecha de inicio y fin de curso</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.apertura_curso} type="Date" className="form-control" id="apertura_curso" name="apertura_curso"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.cierre_curso} type="Date" className="form-control" id="cierre_curso" name="cierre_curso"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col mmd={6}>
                                            <FormGroup>
                                                <Label>Fecha de pre-inscripcion:</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.fecha_preinscripcion} type="Date" className="form-control" id="fecha_preinscripcion" name="fecha_preinscripcion"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fecha examen psicológico</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.apertura_psicol} type="Date" className="form-control" id="apertura_psicol" name="apertura_psicol"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.cierre_psicol} type="Date" className="form-control" id="cierre_psicol" name="cierre_psicol"  placeholder="Fecha" required></Field>
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
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.apertura_medico} type="Date" className="form-control" id="apertura_medico" name="apertura_medico"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.cierre_medico} type="Date" className="form-control" id="cierre_medico" name="cierre_medico"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fechas examen físico</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.apertura_fisico} type="Date" className="form-control" id="apertura_fisico" name="apertura_fisico"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.cierre_fisico} type="Date" className="form-control" id="cierre_fisico" name="cierre_fisico"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col mmd={6}>
                                            <FormGroup>
                                                <Label>Inaguración de curso:</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.inauguracion} type="Date" className="form-control" id="inauguracion" name="inauguracion"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label>Fechas de Entrenamiento en Tierra</Label><br/>
                                                <Label>Fecha Inicio</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.apertura_tierra} type="Date" className="form-control" id="apertura_tierra" name="apertura_tierra"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.cierre_tierra} type="Date" className="form-control" id="cierre_tierra" name="cierre_tierra"  placeholder="Fecha" required></Field>
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
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.apertura_saltos} type="Date" className="form-control" id="apertura_saltos" name="apertura_saltos"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup><br/>
                                                <Label>Fecha Fin</Label>
                                                <div className="form-row">
                                                    <div className="form-group ">
                                                        <Field values={values.cierre_saltos} type="Date" className="form-control" id="cierre_saltos" name="cierre_saltos"  placeholder="Fecha" required></Field>
                                                    </div>
                                                </div> 
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup><br/>
                                                <Label>Jefe de Curso</Label>
                                                <Field name='jefe_curso' options={filtered(values)} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Button style={{float: 'right'}} color="secondary" type="submit">Crear</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            }
                            </Formik>
                                <Button color="danger" style={{marginTop: "-40px", position: 'absolute'}} onClick={()=>props.history.push('/app/cursos/ver')}>Cancelar</Button>
                        </CardBody>    
                    </Card>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({ curso }) => {
    return {curso};
}

const mapDispatchToProps = dispatch => ({
    registerCourse: value => dispatch(registerCourse(value)),
    getInstructors: () => dispatch(getInstructors())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CrearCurso);