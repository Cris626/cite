import { Plegador } from './plegador'
import { useEffect, useState, useRef} from 'react'
import { pullIndex, convertJsonToArray } from '../../helpers/dataMapping'
import HeaderOptions from './headeroptions'

export const FisicoMilitar = props => {
  const [current, setCurrent] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [periodoActual, setPeriodoActual] = useState([])
  const mounted = useRef(false);

  useEffect( () => {
    if(!mounted.current){
        setCurrent(props.props)
        setAlumnos(props.props.alumnos)
        setPeriodoActual('semana_1')
        mounted.current = true;
        // do componentDidMount logic
    }else{
        setPeriodoActual(localStorage.getItem('periodo'))
        console.log(localStorage.getItem('periodo'))
        // do componentDidUpdate logic
    }
  },[localStorage])

  const periodos = pullIndex(props.props.alumnos[0], (val)=>val!=='id').sort()
  periodos.push(periodos.shift())

  return(
      <div>
        <h1>{periodoActual}</h1>
        <HeaderOptions elements={periodos}/>
        <Plegador props={{
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