import React, { useState, useEffect, useRef } from "react";
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-table-v6/react-table.css';
// import { getCursoMateriasInstructor, getMateriasInstructor } from '../../../redux/actions';
import { getMateriasInstructor, postDataAlumnos } from '../../../redux/actions';
import nameCursos from "../../../helpers/nameCursos";
// import { nameCurso } from "../../../helpers/nameCursos";

const Materias = props => {
    const mounted = useRef(false);
    const [name, setName] = useState();
    const [curso, setCurso] = useState();
    const [materias, setMaterias] = useState([]);

    useEffect(async ()=>{
        if(!mounted.current){
            const {match, curso} = props;
            const { curso_materia } = curso;
            setCurso(curso.curso_materia.curso_numero);
            setName(match.params.name);
            // await props.getCursoMateriasInstructor(curso.curso_materia.materias);
            await props.getMateriasInstructor({...curso_materia});
            mounted.current = true;
        }else{
            setMaterias(handleMaterias());
        }
    },[props.curso.materias_instructor])

    const handleMaterias = () => {
        const { curso_materia, materias_instructor } = props.curso;
        const { nameToken } = props;
        const materias = curso_materia.materias;
        let data = [];
        for (let i = 0; i < materias.length; i++) {
            const element = materias[i];
            data.push({ 
                code: element, 
                name: nameCursos[element], 
                alumnos: materias_instructor[i], 
                curso_numero: curso_materia.curso_numero, 
                jefe_curso: curso_materia.jefe_curso,
                tipo: curso_materia.tipo,
                status: curso_materia.status,
                instructor: nameToken
            })
        }
        data.pop();
        return data;
    }

    return (
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Instructores/cursos/materias</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver materias</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>{curso}</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable 
                                            data={materias}
                                            columns={[
                                                {
                                                    Header: 'CODIGO',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    width: 90,
                                                    accessor: 'code',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'MATERIA',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    width: 300,
                                                    accessor: 'name',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'CURSO',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'curso_numero',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'JEFE DE CURSO',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'jefe_curso',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'INSTRUCTOR',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'instructor',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'ALUMNOS',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'alumnos',
                                                    width: 100,
                                                    Cell: data => <h6>{data.value.length}</h6>
                                                },{
                                                    Header: 'ESTADO',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'status',
                                                    width: 100,
                                                    Cell: data => <h6>{data.value?'ABIERTO':'CERRADO'}</h6>
                                                },{
                                                    Header: 'CALIFICAR',
                                                    style: {textAlign: 'center', marginTop: '5px'},
                                                    width: 200,
                                                    accessor: 'acciones',
                                                    Cell: data => <Link className="link-router" to={data.original.status?`/app/instructores/cursos/materia`:'#'} > <Button color="primary" onClick={()=>props.postDataAlumnos(data.original)}>CALIFICAR</Button> </Link>
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

const mapStateToProps = ({ curso }) => {
    return { curso };
}

const mapDispatchToProps = dispatch => ({
    // getCursoMateriasInstructor: value => dispatch(getCursoMateriasInstructor(value)),
    getMateriasInstructor: value => dispatch(getMateriasInstructor(value)),
    postDataAlumnos: value => dispatch(postDataAlumnos(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Materias);