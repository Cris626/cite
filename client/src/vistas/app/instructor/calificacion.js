import React, { useState, useEffect, useRef } from "react";
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import nameCursos from '../../../helpers/nameCursos';
import { Formik, Form, Field } from "formik";
import { Plegador } from '../../../components/materias/plegador';
import { FisicoMilitar } from '../../../components/materias/fiscomilitar';
import { getCursoMaterias } from '../../../redux/curso/actions'
import { payloadCalification } from "../../../helpers/dataMapping";

const Calificacion = props => {
    const [data, setData] = useState("")
    const [table, setTable] = useState([])
    const [semanal, setSemanal] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const mounted = useRef(false);

    useEffect(async ()=>{
        if(!mounted.current){
            const {alumnos_data} = props;
            setData(alumnos_data)
            setTable([])
            setInitialValues({})
            if(alumnos_data.alumnos&&alumnos_data.alumnos[0]){
                alumnos_data.alumnos[0].semana_1?setSemanal(true):setSemanal(false)
            }
            mounted.current = true;
        }else{
            setInitialValues({})
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
                            <Formik 
                                initialValues={initialValues}
                                onSubmit={(values)=>{
                                    console.log(payloadCalification(values))
                                }
                            }>{({values,resetForm})=>
                                <Form>
                                    <Row>
                                        {semanal===true?
                                            <FisicoMilitar props={props.alumnos_data} values={values} reset={()=>{resetForm({values: {}})}}/>
                                        :
                                            <Plegador props={props.alumnos_data} values={values}/>
                                        }
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <button type="submit">Registrar</button>
                                    </Row>
                                </Form>
                            }
                            </Formik>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = ({ curso }) => {
    return {
        alumnos_data: curso.data_alumnos,
    };
}

const mapDispatchToProps = dispatch => ({
    getCursoMaterias: (value)=>dispatch(getCursoMaterias(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calificacion);