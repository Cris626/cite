import React, { useEffect, useState, useRef } from 'react';
import { Card, Label, FormGroup, Button, CardBody, Row, Col } from "reactstrap";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { connect } from 'react-redux';
import { getNotas } from "../../../redux/actions";

const Notas = props => {
    const [notas, setNotas] = useState([])
    const mounted = useRef(false);

    useEffect(async() => {
        if(!mounted.current){
            await props.getNotas(props.match.params.curso_numero)
            mounted.current = true;
        }else{
            if(props.match.params.curso_numero==="SALTO LIBRE012021"){
                setNotas(getDataNotas);
            }else{
                setNotas([])
            }
        }
    }, [props.curso])

    const getDataNotas=()=>{
        return [{
            casco: 50,
            "ENF-013": 90,
            "HIS-093": 80,
            "NOT-083": 80,
            "PLE-053": 65,
            "POS-023": 70,
            "SAL-033": 74,
            "TRA-043": 70,
            "final": 77.71
        },{
            casco: 105,
            "ENF-013": 70,
            "HIS-093": 85,
            "NOT-083": 60,
            "PLE-053": 56,
            "POS-023": 61,
            "SAL-033": 45,
            "TRA-043": 54,
            "final": 65.57
        },{
            casco: 100,
            "ENF-013": 60,
            "HIS-093": 60,
            "NOT-083": 50,
            "PLE-053": 51,
            "POS-023": 90,
            "SAL-033": 52,
            "TRA-043": 60,
            "final": 60.42
        }];
    }

    return(
        <div className="form-ver-course">
            <div className="container-ver-course">
                <div className="title-form-course">
                    <p className="title-cite">Cite</p>
                    <p>Curso/notas</p>
                </div>
                <div className="title-primary-form-course">
                    <h3>Ver Notas</h3>
                </div>
                <div className="container-data-course">
                    <Card body className="mb-4">
                        <CardBody>
                            <Row style={{backgroundColor: "#ebeff1", padding: "10px", marginBottom: "15px"}}>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label style={{fontSize: "40px"}}>NOTAS</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <ReactTable
                                            data={notas}
                                            columns={[
                                                {
                                                    Header: 'Casco',
                                                    style: {textAlign: 'center', marginTop: '15px', color: 'red'},
                                                    width: 60,
                                                    accessor: 'casco',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'ENTRENAMIENTO FISICO MILITAR',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'ENF-013',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'HISTORIA Y TEORIA DE SALTO',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'HIS-093',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'NOMENCLATURA Y TERMINOLOGIA',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'NOT-083',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'FASES DEL PLEGADO',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'PLE-053',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'RTV',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    width: 60,
                                                    accessor: 'POS-023',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'SALTO LIBRE',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    accessor: 'SAL-033',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'TRA',
                                                    style: {textAlign: 'center', marginTop: '15px'},
                                                    width: 60,
                                                    accessor: 'TRA-043',
                                                    Cell: data => <h6>{data.value}</h6>
                                                },{
                                                    Header: 'Final',
                                                    width: 60,
                                                    style: {textAlign: 'center', marginTop: '15px', color: 'blue'},
                                                    accessor: 'final',
                                                    Cell: data => <h6>{data.value}</h6>
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            showPageJump={false}
                                            showPageSizeOptions={false}
                                            style={{height: "700px", overflow: "hidden"}}
                                            className={"react-table-fixed-height"}
                                            showPagination={false}
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
    getNotas: (value) => dispatch(getNotas(value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notas);