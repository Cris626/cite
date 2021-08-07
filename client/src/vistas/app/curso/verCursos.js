import React from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'

const VerCursos = props => {
    return(
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Cursos/lista de cursos</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver Curso</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>CURSOS</Label>
                                        <Link to={'/app/cursos/crear'} key={'crear_curso'} className="link-router" >
                                            <Button style={{float: "right", marginTop:"11px"}} color="secondary">Crear Curso</Button>
                                        </Link>
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
                                                    Header: 'ID',
                                                    accessor: 'id'
                                                },{
                                                    Header: 'Nombre',
                                                    accessor: 'nombre'
                                                },{
                                                    Header: 'Fecha Inicio',
                                                    accessor: 'fecha inicio'
                                                },{
                                                    Header: 'Fecha Fin',
                                                    accessor: 'fecha fin'
                                                },{
                                                    Header: 'Codigo',
                                                    accessor: 'codigo'
                                                },{
                                                    Header: 'Estado',
                                                    accessor: 'estado'
                                                },{
                                                    Header: 'Acciones',
                                                    accessor: 'acciones'
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
}

export default VerCursos;