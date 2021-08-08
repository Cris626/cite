import React, { useEffect, useState } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from 'react-redux';
import { getInstructors, setInstructor } from '../../../redux/actions';
import { SelectField } from '../../../helpers/Select';

const Materias = props => {
    const [plegador, setPlegador] = useState({
        'EFM-014': "",
        'NOM-024': "",
        'FAB-034': "",
        'PLE-044': "",
        'MAN-054': "",
    })
    const [codigo, setCodigo] = useState(props.match.params.codigo);
    const [tipo, setTipo] = useState(props.match.params.tipo)
    const [instructores, setInstructores] = useState([]);

    const dataInstructors = async () => {
        let instructores = [];
        const { data } = props.curso;
        data.map(x=>{
            let instructor = `${x.grado}. ${x.apellido} ${x.nombre}`;
            instructores.push({label: instructor, value: x.apellido, key: x.nombre});
        })
        return setInstructores(instructores);
    }

    const submitMaterias = value => {
        props.setInstructor({value, codigo});
    }

    useEffect(async()=>{
        await props.getInstructors();
        await dataInstructors();
    },[])

    return(
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="title-cite">Cite</p>
                    <p>Cursos/ver curso</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Curso {tipo} - {codigo}</h3>
                </div>
                <div className="container-data-materia">
                    <Card body className="mb-4">
                        <CardBody>
                            {tipo==="Plegador"?
                            <Formik
                                enableReinitialize
                                initialValues={plegador}
                                onSubmit={values=>submitMaterias(values)}
                                >{({values})=>
                                <Form>
                                    <Label style={{fontSize: "25px"}}>Materias: </Label>
                                    <Row style={{margin: "10px 0px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>EFM-014</Label>
                                                <Field name='EFM-014' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>NOM-024</Label>
                                                <Field name='NOM-024' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>FAB-034</Label>
                                                <Field name='FAB-034' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{margin: "15px 0px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>PLE-044</Label>
                                                <Field name='PLE-044' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>MAN-054</Label>
                                                <Field name='MAN-054' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Button color="danger">Cancelar</Button>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Button color="secondary" style={{float: "right"}} type="submit">Asignar instructores</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>}
                            </Formik>
                            :''}
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
    getInstructors: () => dispatch(getInstructors()),
    setInstructor: value => dispatch(setInstructor(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Materias);