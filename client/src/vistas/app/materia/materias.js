import React, { useEffect, useState, useRef } from 'react';
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
        'MAN-054': ""
    })
    const [salto, setSalto] = useState({
        'ENF-013': "",
        'HIS-093': "",
        'NOT-083': "",
        'PLE-053': "",
        'POS-023': "",
        'SAL-033': "",
        'TRA-043': ""
    })
    const [paracaidista, setParacaidista] = useState({
        'ACU-112': "",
        'ARA-032': "",
        'ARS-042': "",
        'CVT-072': "",
        'EFM-012': "",
        'FUC-122': "",
        'HIP-102': "",
        'NOT-082': "",
        'PLA-022': "",
        'PLT-092': "",
        'RVT-062': "",
        'TOS-052': ""
    })
    const [codigo, setCodigo] = useState(props.match.params.codigo);
    const [tipo, setTipo] = useState(props.match.params.tipo)
    const [instructores, setInstructores] = useState([]);
    const mounted = useRef(false);

    const dataInstructors = async () => {
        let instructores = [];
        const { data } = props.curso;
        data.map(x=>{
            let instructor = `${x.grado} ${x.apellido} ${x.nombre}`;
            instructores.push({label: instructor, value: x.apellido, key: x.nombre, state: x.state});
        })
        return setInstructores(instructores);
    }

    const submitMaterias = value => {
        props.setInstructor({value, codigo, tipo});
    }

    useEffect(async()=>{
        if(!mounted.current){
            await props.getInstructors();
            await dataInstructors();
        }
        else{

        }
    },[props.curso])

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
                                                <Field name='EFM-014' options={instructores.filter(i=>i.state)} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>NOM-024</Label>
                                                <Field name='NOM-024' options={instructores.filter(i=>i.state)} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>FAB-034</Label>
                                                <Field name='FAB-034' options={instructores.filter(i=>i.state)} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{margin: "15px 0px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>PLE-044</Label>
                                                <Field name='PLE-044' options={instructores.filter(i=>i.state)} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>MAN-054</Label>
                                                <Field name='MAN-054' options={instructores.filter(i=>i.state)} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Button color="secondary" style={{float: "right"}} type="submit">Asignar instructores</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>}
                            </Formik>
                            :tipo==="Salto Libre"?
                            <Formik
                                enableReinitialize
                                initialValues={salto}
                                onSubmit={values=>submitMaterias(values)}
                                >{({values})=>
                                <Form>
                                    <Label style={{fontSize: "25px"}}>Materias: </Label>
                                    <Row style={{margin: "10px 0px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>ENF-013</Label>
                                                <Field name='ENF-013' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>HIS-093</Label>
                                                <Field name='HIS-093' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>NOT-083</Label>
                                                <Field name='NOT-083' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{margin: "15px 0px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>PLE-053</Label>
                                                <Field name='PLE-053' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>POS-023</Label>
                                                <Field name='POS-023' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>SAL-033</Label>
                                                <Field name='SAL-033' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{margin: "10px 0px"}}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>TRA-043</Label>
                                                <Field name='TRA-043' options={instructores} component={SelectField}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: "20px"}}>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Button color="secondary" style={{float: "right"}} type="submit">Asignar instructores</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>}
                            </Formik>
                            :<Formik
                            enableReinitialize
                            initialValues={paracaidista}
                            onSubmit={values=>submitMaterias(values)}
                            >{({values})=>
                            <Form>
                                <Label style={{fontSize: "25px"}}>Materias: </Label>
                                <Row style={{margin: "10px 0px"}}>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>ACU-112</Label>
                                            <Field name='ACU-112' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>ARA-032</Label>
                                            <Field name='ARA-032' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>ARS-042</Label>
                                            <Field name='ARS-042' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{margin: "15px 0px"}}>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>CVT-072</Label>
                                            <Field name='CVT-072' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>EFM-012</Label>
                                            <Field name='EFM-012' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>FUC-122</Label>
                                            <Field name='FUC-122' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{margin: "10px 0px"}}>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>HIP-102</Label>
                                            <Field name='HIP-102' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>NOT-082</Label>
                                            <Field name='NOT-082' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>PLA-022</Label>
                                            <Field name='PLA-022' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{margin: "10px 0px"}}>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>PLT-092</Label>
                                            <Field name='PLT-092' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>RVT-062</Label>
                                            <Field name='RVT-062' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label>TOS-052</Label>
                                            <Field name='TOS-052' options={instructores} component={SelectField}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "20px"}}>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Button color="secondary" style={{float: "right"}} type="submit">Asignar instructores</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>}
                        </Formik>}
                        <Col md={6} style={{marginTop: "-38px"}}>
                            <FormGroup>
                                <Button onClick={()=>props.history.push('/app/materias')} color="danger">Cancelar</Button>
                            </FormGroup>
                        </Col>
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