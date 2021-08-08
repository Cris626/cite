import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { getCursoByAp } from '../../../redux/actions';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'

const Curso = (props) => {
    const [curso, setCurso] = useState([])

    useEffect(async() => {
        const {apellido} = props;
        await props.getCursoByAp(apellido);
        const {curso} = props.curso;
        await setCurso(curso);
    }, [])

    return (
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="titlte-cite">Cite</p>
                    <p>Materias/ver materia</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver Materia</h3>
                </div>
                <div className="container-data-materia">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable 
                                            data={curso}
                                            columns={[
                                                {
                                                    Header: 'ID',
                                                    accessor: 'curso_numero',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Nombre',
                                                    accessor: 'jefe_curso',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Fecha Inicio',
                                                    accessor: 'apertura_curso',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Fecha Fin',
                                                    accessor: 'cierre_curso',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Codigo',
                                                    accessor: 'curso_numero',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Estado',
                                                    accessor: 'stado',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'ACTIVO':'TERMINADO'}</h6>
                                                },{
                                                    Header: 'Acciones',
                                                    accessor: 'acciones',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <Button color="secondary">Ver materias</Button>
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            showPageJump={false}
                                            showPageSizeOptions={false}
                                            style={{height: "80vh"}}
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

const mapStateToProps = ({ curso }) => {
    return { curso };
}

const mapDispatchToProps = dispatch => ({
    getCursoByAp: (value) => dispatch(getCursoByAp(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Curso);