import { FormGroup } from 'reactstrap'
import ReactTable from 'react-table-v6'
import HeaderOptions from './headeroptions'
import Materias from '../../helpers/nameMaterias'
import Cursos from '../../helpers/nameCursos'
import { convertJsonToArray } from '../../helpers/dataMapping'

export const Plegador = props => {
    const materias = [10,10,10,10]
    const current = Materias[props.props.code]
    const notas = convertJsonToArray(current.header_nota)
    const alumnos = props.props.alumnos
    alumnos.notas = notas
    return(
        <div>
            {current.header?<HeaderOptions elements={['Semana 1', 'Semana 2', 'Semana 3', 'Promedio final']}/>:<hr/>}
            <ReactTable 
            data={alumnos}
            columns={
                notas.map((tema,index)=>{
                    return {
                        Header: tema.key,
                        style: {textAlign: 'center', marginTop: '15px'},
                        width: (100/current.header_nota.length).toString()+"%",
                        accessor: 'id',
                        Cell: data => {
                            return <input style={{width: '50%', border: 0, outline: 0}} placeholder={data.value}></input>
                        }
                    }
                })
            }
            defaultPageSize={5}
            showPageJump={false}
            showPageSizeOptions={false}
            style={{height: "250px"}}
            className={"react-table-fixed-height"}
            showPagination={true}
            resizable={false}
            />
        </div>
    )
}