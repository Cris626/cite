import React, { useState, useEffect, useRef } from "react";
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import { connect } from 'react-redux';
import 'react-table-v6/react-table.css';

const Materias = props => {
    const mounted = useRef(false);
    const [name, setName] = useState();
    const [curso, setCurso] = useState();

    useEffect(()=>{
        if(!mounted.current){
            const {match, curso} = props;
            setCurso(curso.curso_materia.curso_numero);
            setName(match.params.name);
        }else{

        }
    },[])

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
                                <button onClick={()=>console.log(name, props)}>Click</button>
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Materias);