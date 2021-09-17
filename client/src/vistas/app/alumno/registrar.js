import React, { useEffect, useState, useRef } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col, CustomInput } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { SelectField } from '../../../helpers/Select';
import { convertSelectable } from '../../../helpers/dataMapping';
import { connect } from 'react-redux';
import { getPostulantes, enablePostulante } from '../../../redux/actions';
import {getCourses} from '../../../redux/curso/actions';

const RegistrarAlumno = props => {
    const mounted = useRef(false);
    const [alumno, setAlumno] = useState({
        cursos: [{label:"",value:"",key:-1}],
        num_casco: "",
        postulantes: [{label:"",value:"",key:-1}],
    })

    useEffect(async ()=>{
        if(!mounted.current){
            await props.getCourses();
            await props.getPostulantes();
            mounted.current = true;
        }else{
            setAlumno({
                cursos: props.curso.cursos,
                postulantes:props.alumno.postulantes,
                num_casco:"",
            })
        }
    },[props])

    const submitAlumno = value => {
        console.log(value);
    };

    const selectCursos = () => {
        return convertSelectable(
            props.curso.cursos.filter(e=>e.stado==true), 
            "curso_numero",
            "curso_numero"
        )
    }

    const selectAlumnos= (values) => {
        return convertSelectable(
            alumno.postulantes.filter(
                e=>e.curso_numero==values.cursos&&e.aceptado&&!e.register
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