import { FormGroup } from 'reactstrap'
import ReactTable from 'react-table-v6'
import { pullIndex } from '../../helpers/dataMapping'
import { useEffect, useState, useRef } from 'react'
import { Field } from 'formik'
export const Plegador = props => {
    const current = props.props
    const temas = pullIndex(current.alumnos,(e)=>e!=='final'&&e!=='id').sort()
    temas.unshift('id')
    temas.push('final')
    const alumnos = current.alumnos
    const mounted = useRef(false);
    useEffect(async ()=>{
        if(!mounted.current){
            mounted.current = true;
        }else{
        }
    },[props.values])
    let table = temas.map(tema=>{
        return {
            Header: tema==='id'?'N° DE CASCO':tema==='final'?'PROMEDIO FINAL':tema.toUpperCase(),
            style: {textAlign: 'center', marginTop: '15px'},
            width: (100/temas.length).toString()+"%",
            accessor: tema,
            Cell: data => {
                return <Field style={{width: '50%', border: 0, outline: 0}}  
                disabled={tema==='final'||tema==='id'||props.periodo==='final'?true:false}
                className="form-control"
                name={alumnos[data.index].id+"-"+tema+(props.periodo?"-"+props.periodo:"")}
                type="number"
                placeholder={data.value}
                style= {{textAlign: "center"}}
                />
            }
        }
    })
    return(
        <div>
            <ReactTable 
            data={alumnos}
            columns={table}
            defaultPageSize={9}
            showPageJump={false}
            showPageSizeOptions={false}
            style={{height: "650px", overflowY: "hidden !important"}}
            className={"react-table-fixed-height"}
            showPagination={true}
            resizable={false}
            />
        </div>
    )
}