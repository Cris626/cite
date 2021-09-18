import { FormGroup } from 'reactstrap'
import ReactTable from 'react-table-v6'
import { pullIndex } from '../../helpers/dataMapping'
import { useEffect, useState } from 'react'

export const Plegador = props => {
    const current = props.props
    const temas = pullIndex(current.alumnos,(e)=>e!=='final'&&e!=='id').sort()
    temas.unshift('id')
    temas.push('final')
    const [alumnos, setAlumnos] = useState([])
    useEffect(async () => {
        setAlumnos(props.props.alumnos)
    })
    return(
        <div>
            <ReactTable 
            data={alumnos}
            columns={
                temas.map(tema=>{
                    return {
                        Header: tema==='id'?'N° DE CASCO':tema==='final'?'PROMEDIO FINAL':tema.toUpperCase(),
                        style: {textAlign: 'center', marginTop: '15px'},
                        width: (100/temas.length).toString()+"%",
                        accessor: tema,
                        Cell: data => {
                            return <input style={{width: '50%', border: 0, outline: 0}} 
                            placeholder={data.value} 
                            disabled={tema==='final'?true:false}
                            />
                        }
                    }
                })
            }
            defaultPageSize={10}
            showPageJump={false}
            showPageSizeOptions={false}
            style={{height: "700px"}}
            className={"react-table-fixed-height"}
            showPagination={true}
            resizable={false}
            />
        </div>
    )
}