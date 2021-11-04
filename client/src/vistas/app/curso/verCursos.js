import React, { useEffect, useState, useRef } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import { getCourses, getCursoByNum } from '../../../redux/actions';
import { connect } from 'react-redux';

const VerCursos = props => {
    const mounted = useRef(false);
    const [cursos, setCursos] = useState([])

    useEffect(async() => {
        if(!mounted.current){
            await props.getCourses();
            mounted.current = true;
        }else{
            setCursos(props.curso.cursos);
        }
    }, [props.curso])

    const handleEdit= async (numCurso)=>{
        const {history} = props;
        await props.getCursoByNum(numCurso);
        history.push(`/app/cursos/crear`);
    }

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
                                            data={cursos}
                                            columns={[
                                                {
                                                    Header: 'ID',
                                                    accessor: 'curso_numero',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    filterable: true,
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Jefe de curso',
                                                    accessor: 'jefe_curso',
                                                    filterable: true,
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Fecha Inicio',
                                                    accessor: 'apertura_curso',
                                                    filterable: true,
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Fecha Fin',
                                                    accessor: 'cierre_curso',
                                                    filterable: true,
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Estado',
                                                    accessor: 'stado',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'ACTIVO':'TERMINADO'}</h6>
                                                },{
                                                    Header: 'Acciones',
                                                    accessor: 'curso_numero',
                                                    style: {textAlign: 'center', marginTop: '5px'},
                                                    width: 100,
                                                    Cell: data => <Button onClick={()=>props.history.push(`${props.match.path}/notas/${data.original.curso_numero}`)} color="primary">Ver notas</Button>
                                                },{
                                                    Header: 'Acciones',
                                                    accessor: 'curso_numero',
                                                    style: {textAlign: 'center', marginTop: '5px'},
                                                    width: 100,
                                                    Cell: data => <Button onClick={()=>handleEdit(data.value)} color="primary">Editar</Button>
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

const mapStateToProps = ({ curso }) => {
    return { curso };
}

const mapDispatchToProps = dispatch => ({
    getCourses: () => dispatch(getCourses()),
    getCursoByNum: (numCurso) => dispatch(getCursoByNum(numCurso))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerCursos);