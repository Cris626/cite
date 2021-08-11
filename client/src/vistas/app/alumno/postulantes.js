import React, {useEffect, useState} from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { getPostulantes, enablePostulante } from '../../../redux/actions';

const Postulantes = props => {
    const [postulantes, setPostulantes] = useState([]);

    useEffect(async () => {
        await props.getPostulantes();
        setPostulantes(props.alumno.postulantes)
    },[])

    const handleEditPostulante= async (ci)=>{
        let newList = [];
        await props.enablePostulante(ci);
        await postulantes.map(x=>{
            if(x.ci!==ci){
                newList.push(x)
            }
        })
        props.alumno.postulantes = newList;
        setPostulantes(newList);
    }
    
    return(
        <div className="form-create-materia">
            <div className="container-create-materia">
                <div className="title-form-materia">
                    <p className="title-cite">Cite</p>
                    <p>Alumnos/lista de postulantes</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver postulantes</h3>
                </div>
                <div className="container-data-materia">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable 
                                            data={postulantes}
                                            columns={[
                                                {
                                                    Header: 'CI',
                                                    accessor: 'ci',
                                                    style: {marginTop: '22px'},
                                                    width: 90,
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Apellido',
                                                    accessor: 'apellido',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Nombre',
                                                    accessor: 'nombre',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Grado',
                                                    accessor: 'grado',
                                                    style: {marginTop: '22px'},
                                                    width: 90,
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Certificado de nacimiento',
                                                    accessor: 'certificado_nac_pdf',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}><a href={data.value}>ver</a></h6>
                                                },{
                                                    Header: 'Carnet de identidad',
                                                    accessor: 'ci_pdf',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}><a href={data.value}>ver</a></h6>
                                                },{
                                                    Header: 'Solicitud',
                                                    style: {marginTop: '22px'},
                                                    accessor: 'solicitud_pdf',
                                                    Cell: data => <h6 style={{textAlign: 'center'}}><a href={data.value}>ver</a></h6>
                                                },{
                                                    Header: 'Estado',
                                                    accessor: 'aceptado',
                                                    style: {marginTop: '22px'},
                                                    width: 105,
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value?'ACEPTADO':'RECHAZADO'}</h6>
                                                },{
                                                    Header: 'Curso',
                                                    accessor: 'curso_numero',
                                                    style: {marginTop: '22px'},
                                                    Cell: data => <h6 style={{textAlign: 'center'}}>{data.value}</h6>
                                                },{
                                                    Header: 'Habilitar',
                                                    accessor: 'ci',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    width: 115,
                                                    Cell: data => <Button color="primary" onClick={()=>handleEditPostulante(data.value)}>Habilitar</Button>
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

const mapStateToProps = ({ alumno }) => {
    return { alumno };
}

const mapDispatchToProps = dispatch => ({
    getPostulantes: () => dispatch(getPostulantes()),
    enablePostulante: (value) => dispatch(enablePostulante(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Postulantes);