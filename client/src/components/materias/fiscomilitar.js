import { Plegador } from './plegador'
import { useEffect, useState, useRef} from 'react'
import { pullIndex, convertJsonToArray } from '../../helpers/dataMapping'
import HeaderOptions from './headeroptions'

export const FisicoMilitar = props => {
  const [current, setCurrent] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [periodoActual, setPeriodoActual] = useState('')
  const mounted = useRef(false);
  const periodos = pullIndex(props.props.alumnos[0], (val)=>val!=='id'&&val!=='final').sort()
  const [initial, setInitial] = useState('')
  useEffect( () => {
    if(!mounted.current){
        setCurrent(props.props)
        setAlumnos(props.props.alumnos)
        for(let i=0; i<periodos.length;i++){
          if(props.props.alumnos[0][periodos[i]].final===0){
            setInitial(periodos[i])
            setPeriodoActual(periodos[i])
            break
          }
        }
        mounted.current = true;
    }else{
    }
  },[periodoActual,initial])
  periodos.push('final')
  return(
      <div>
        <h1>{periodoActual}</h1>
        <HeaderOptions elements={periodos} initial={initial} action={setPeriodoActual} />
        <Plegador values={props.values} periodo={periodoActual}
        props={{
          ...props.props,
          alumnos: alumnos.map(alumno=>{
            return {
              ...alumno[periodoActual],
              id: alumno.id,
            }
          })
        }}/>
      </div>
  )
}