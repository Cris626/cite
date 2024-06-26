import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';
import { getCursoByAp } from '../../../redux/actions';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'

const Curso = (props) => {
    const mounted = useRef(false);
    const [curso, setCurso] = useState([]);

    useEffect(async() => {
        if(!mounted.current){
            const {apellido} = props;
            await props.getCursoByAp(apellido);
            mounted.current = true;
        }else{
            const {curso} = props.curso;
            setCurso(curso);
        }
    }, [props.curso])

    return (
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="title-cite">Cite</p>
                    <p>Cursos/ver cursos</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver Cursos</h3>
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
                                                    Header: 'Tipo',
                                                    filterable: true,
                                                    accessor: 'tipo',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value.toUpperCase()}</h6>
                                                },{
                                                    Header: 'Instructor',
                                                    filterable: true,
                                                    accessor: 'jefe_curso',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Fecha Inicio',
                                                    filterable: true,
                                                    accessor: 'apertura_curso',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Fecha Fin',
                                                    filterable: true,
                                                    accessor: 'cierre_curso',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Codigo',
                                                    filterable: true,
                                                    accessor: 'curso_numero',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Estado',
                                                    accessor: 'stado',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'ACTIVO':'TERMINADO'}</h6>
                                                },{
                                                    Header: 'Instructores',
                                                    accessor: 'instructor',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'ASIGNADOS':'NO ASIGNADOS'}</h6>
                                                },{
                                                    Header: 'Acciones',
                                                    accessor: 'curso_numero',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <Link to={!data.original.instructores?`/app/materias/instructor/${data.value}/${data.original.tipo}`:'#'} key={'registrar_instructores'} className="link-router" ><Button color="secondary">Asignar instructores</Button></Link>
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