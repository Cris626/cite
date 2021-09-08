import React, { useEffect, useState } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col, CustomInput } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { SelectField, convertSelectable } from '../../../helpers/Select';
import { connect } from 'react-redux';
import { getPostulantes, enablePostulante } from '../../../redux/actions';
import {getCourses} from '../../../redux/curso/actions';

const RegistrarAlumno = props => {
    const [alumno, setAlumno] = useState({
        cursos: [{label:"",value:"",key:-1}],
        num_casco: "",
        postulantes: [{label:"",value:"",key:-1}],
    })

    useEffect(()=>{
        props.getCourses();
        props.getPostulantes();
        setAlumno({
            cursos: props.curso.cursos,
            postulantes:props.alumno.postulantes,
            num_casco:"",
        })
    },[])

    const submitAlumno = value => {
        console.log(value);
    };

    const selectCursos = () => {
        if(!alumno.cursos)return
        return convertSelectable(
            props.curso.cursos.filter(e=>e.stado==false), 
            "curso_numero",
            "tipo"
        )
    }

    const selectAlumnos= (values) => {
        if(!alumno.postulantes||!values.cursos.label)return
        return convertSelectable(
            alumno.postulantes.filter(
                e=>e.curso_numero==values.cursos.label&&e.aceptado==false
            ),
          ["grado","apellido","nombre"],
          "ci"
        )
    }

    return(
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="title-cite">Cite</p>
                    <p>Alumnos/registrar alumnos</p>
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
                                                    name='cursos' 
                                                    options={selectCursos()} 
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
                                                    name='postulantes' 
                                                    options={selectAlumnos(values)} 
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

const mapStateToProps = ({alumno, curso}) => {
    return {alumno,curso};
}

const mapDispatchToProps = dispatch => ({
    getPostulantes: () => dispatch(getPostulantes()),
    enablePostulante: (value) => dispatch(enablePostulante(value)),
    getCourses: ()=> dispatch(getCourses())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrarAlumno);