import React, { useState, useEffect, useRef } from "react";
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { getCursoMaterias } from '../../../redux/actions';

const jwt = require('jsonwebtoken');
let token = localStorage.getItem('Authorization');

function nameToken(){
    let jwToken = jwt.verify(token, 'keyPassword', (err, decoded)=>{
        if(err){
            return err;
        }else{
            return decoded.data.nombre;
        }
    });
    return jwToken;
}


const Cursos = props => {
    const mounted = useRef(false);
    const [curso, setCurso] = useState([]);

    useEffect(async () => {
        if(!mounted.current){
            await props.getCursoMaterias(nameToken());
            mounted.current = true;
        }else{
            setCurso([props.curso.curso_materia]);
        }
    },[props.curso])

    return(
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Instructores/cursos</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver cursos</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>CURSOS</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable 
                                            data={curso}
                                            columns={[
                                                {
                                                    Header: 'Curso',
                                                    accessor: 'curso_numero',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Tipo',
                                                    accessor: 'tipo',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Estado',
                                                    accessor: 'status',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'Abierto':'Cerrado'}</h6>
                                                },{
                                                    Header: 'IP de curso',
                                                    accessor: 'jefe_curso',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'Abierto':'Cerrado'}</h6>
                                                },{
                                                    Header: 'Acciones',
                                                    accessor: 'acciones',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
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
    getCursoMaterias: (id) => dispatch(getCursoMaterias(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cursos);