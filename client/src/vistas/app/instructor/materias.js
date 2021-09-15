import React, { useState, useEffect, useRef } from "react";
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import { connect } from 'react-redux';
import 'react-table-v6/react-table.css';
import { getCursoMateriasInstructor, getMateriasInstructor } from '../../../redux/actions';
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
            await props.getCursoMateriasInstructor(curso.curso_materia.materias);
            await props.getMateriasInstructor({...curso_materia});
            mounted.current = true;
        }else{
            // setMaterias(convertJsonToArray(props.curso.materias_instructor));
            // let array = Object.keys(props.curso.materias_instructor).map(function(k) { return props.curso.materias_instructor[k] });
            // setMaterias(array)
            // console.log(props.curso.materias_instructor)
            setMaterias(handleMaterias());
        }
    },[props.curso.materias_instructor])

    const handleMaterias = () => {
        const { curso_materia } = props.curso;
        const { nameToken } = props;
        let data = [];
        curso_materia.materias.map(x=>{
            data.push({code: x})
        })
        data.pop();
        return data;
    }

    // const convertJsonToArray = jsonData => {
    //     let result = [];
    //     console.log(jsonData)
    //     for (const i of jsonData) {
    //         result.push([i, jsonData [i]]);
    //     }
    //     return result;
    // }

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
                                                    Header: 'Casco N°',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'code',
                                                    Cell: data => <h6>{data.value}</h6>
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
                                <button onClick={()=>console.log(materias)}>Click</button>
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
    getCursoMateriasInstructor: value => dispatch(getCursoMateriasInstructor(value)),
    getMateriasInstructor: value => dispatch(getMateriasInstructor(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Materias);