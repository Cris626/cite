import { Plegador } from './plegador'
import { useEffect, useState, useRef} from 'react'
import { pullIndex, convertJsonToArray } from '../../helpers/dataMapping'
import HeaderOptions from './headeroptions'

export const FisicoMilitar = props => {
  const [current, setCurrent] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [periodoActual, setPeriodoActual] = useState('semana_1')
  const mounted = useRef(false);

  useEffect( () => {
    if(!mounted.current){
        setCurrent(props.props)
        setAlumnos(props.props.alumnos)
        mounted.current = true;
    }else{
    }
  },[periodoActual])
  const periodos = pullIndex(props.props.alumnos[0], (val)=>val!=='id'&&val!=='final').sort()
  periodos.push('final')
  return(
      <div>
        <h1>{periodoActual}</h1>
        <HeaderOptions elements={periodos} action={setPeriodoActual} />
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