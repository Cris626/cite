import React, { useEffect, useState } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { getInstructors } from '../../../redux/actions';

const Instructores = props => {
    const [instructores, setInstructores] = useState([])

    useEffect(()=>{
        props.getInstructors();
        setInstructores(props.curso.data)
    },[])

    return(
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Cursos/lista de instructores</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver instructores</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>INSTRUCTORES</Label>
                                        <Link to={'/app/instructores/crear'} key={'crear_curso'} className="link-router" >
                                            <Button style={{float: "right", marginTop:"11px"}} color="secondary">Crear Curso</Button>
                                        </Link>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable 
                                            data={instructores}
                                            columns={[
                                                {
                                                    Header: 'Grado',
                                                    accessor: 'grado',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Apellido',
                                                    accessor: 'apellido',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Nombre',
                                                    accessor: 'nombre',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Edad',
                                                    accessor: 'edad',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Tiempo de servicio',
                                                    accessor: 'servi',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Correo',
                                                    accessor: 'correo',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
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
    getInstructors: () => dispatch(getInstructors())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Instructores);