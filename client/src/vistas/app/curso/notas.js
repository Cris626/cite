import React, { useEffect, useState, useRef } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { getNotas } from "../../../redux/actions";

const Notas = props => {
    const mounted = useRef(false);

    // useEffect(async() => {
    //     if(!mounted.current){
    //         await props.getCourses();
    //         mounted.current = true;
    //     }else{
    //         setCursos(props.curso.cursos);
    //     }
    // }, [props.curso])

    return(
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Curso/notas</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver Notas</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>NOTAS</Label>
                                        <button onClick={()=>props.getNotas(props.match.params.curso_numero)}>Click props</button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable
                                            data={[]}
                                            columns={[
                                                {
                                                    Header: 'Curso',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'curso_numero',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'Tipo',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'tipo',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'Estado',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'status',
                                                    Cell: data => <h6>{data.value?'Abierto':'Cerrado'}</h6>
                                                },{
                                                    Header: 'IP de curso',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'jefe_curso',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'Acciones',
                                                    style: {textAlign: 'center', marginTop: '5px'},
                                                    accessor: 'acciones',
                                                    Cell: data => <Button color="primary" >Ver Materias</Button>
                                                }
                                            ]}
                                            showPageJump={false}
                                            showPageSizeOptions={false}
                                            style={{height: "700px", overflow: "hidden"}}
                                            className={"react-table-fixed-height"}
                                            showPagination={false}
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
}

const mapStateToProps = ({ curso }) => {
    return { curso };
}

const mapDispatchToProps = dispatch => ({
    getNotas: (value) => dispatch(getNotas(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notas);