import React, { useState, useEffect, useRef } from "react";
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import nameCursos from '../../../helpers/nameCursos';
import { Formik, Form, Field } from "formik";
import { Plegador } from '../../../components/materias/plegador';

const Calificacion = props => {
    const [data, setData] = useState("")
    const mounted = useRef(false);

    useEffect(async ()=>{
        if(!mounted.current){
            const {alumnos_data} = props;
            setData(alumnos_data)
            console.log('mount')
            mounted.current = true;
        }else{
            
            console.log('update')
        }
    },[props])

    return (
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Instructores/cursos/materia/{nameCursos[data.code]}</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Calificar alumnos</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>{data.curso_numero}/{nameCursos[data.code]}/{data.code}</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Formik>
                                <Form>
                                    <Row>
                                        <Plegador/>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <h1>asdasdasd</h1>
                                    </Row>
                                </Form>
                            </Formik>
                            <button onClick={()=>console.log(props)}>Click</button>

                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = ({ curso }) => {
    return {alumnos_data: curso.data_alumnos};
}

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calificacion);