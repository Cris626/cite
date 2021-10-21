import React, { useEffect, useState } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import { connect } from 'react-redux';

const VerAlumnos = props =>{
    const [alumnos, setAlumnos] = useState([])

    useEffect(async() => {
        if(props.alumno.alumnos){
            setAlumnos(props.alumno.alumnos);
        }else{
            setAlumnos([]);
        }
    }, []);

    return(
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Alumnos/{props.match.params.curso}</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>{props.match.params.curso}</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>ALUMNOS</Label>
                                        <Button style={{float: 'right', marginTop: '14px'}} onClick={()=>props.history.push('/app/alumnos/ver-cursos')}>Ver Cursos</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable 
                                            data={alumnos}
                                            columns={[
                                                {
                                                    Header: 'Numero de casco',
                                                    accessor: 'num_casco',
                                                    width: 150,
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Alumno',
                                                    accessor: 'apellido',
                                                    width: 300,
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{`${data.original.grado}. ${data.value+data.original.nombre}`}</h6>
                                                },{
                                                    Header: 'CI',
                                                    accessor: 'ci',
                                                    width: 100,
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    // width: 100,
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Curso',
                                                    accessor: 'curso_numero',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'SOLICITUD',
                                                    accessor: 'solicitud_pdf',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}><a href={data.value} target="_blank">PDF</a></h6>
                                                },{
                                                    Header: 'CI',
                                                    accessor: 'ci_pdf',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}><a href={data.value} target="_blank">PDF</a></h6>
                                                },{
                                                    Header: 'CERTIFICADO',
                                                    accessor: 'certificado_nac_pdf',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}><a href={data.value} target="_blank">PDF</a></h6>
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            showPageJump={false}
                                            showPageSizeOptions={false}
                                            style={{height: "700px"}}
                                            className={"react-table-fixed-height"}
                                            showPagination={true}
                                            resizable={false}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )

};

const mapStateToProps = ({ alumno }) => {
    return { alumno };
}

const mapDispatchToProps = dispatch => ({
    // getCourses: () => dispatch(getCourses()),
    // getAlumnos: (value) => dispatch(getAlumnos(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerAlumnos);