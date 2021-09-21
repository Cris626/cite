export function convertSelectable (data,label,value) {
  let i=0
  return data.map(e=>{
      let name=""
      return {
          label: Array.isArray(label)?label.map(i=>name=e[i]+" "):e[label],
          value: e[value],
          key: i++,
      }
  })
}
export function convertJsonToArray(json, conditional=(value)=>{return true}){
  let array=[]
  for(let obj in json){
    if(conditional(obj)){
      array.push({key: obj, payload: json[obj]})
    }
  }
  return array
}

export function pullIndex(array, conditional=(value)=>true){
  let header=[]
  for(let data in Array.isArray(array)?array[0]:array){
    if(conditional(data)){
      header.push(data)
    }
  }
  return header
}

export function payloadCalification(json, history={}){
  //id-tema-periodo = 50-tema_1-semana_1
  let payload={}, type=true
  for(let alumno in json){
    let cut=alumno.split('-')
    if(!payload[cut[0]])payload[cut[0]]={}//id: {}

    if(cut[2]&&!payload[cut[0]][cut[2]])payload[cut[0]][cut[2]]={}//semanal? semana_1: {} : none
    if(cut[2]){
      payload[cut[0]][cut[2]][cut[1]]=json[alumno]//id: { semana_1: tema_1: 0 }
    }else{
      payload[cut[0]][cut[1]]=json[alumno] //id: { tema_1: 0 }
      type=false
    }
  }
  payload = calificacion(payload, type, history)
  return payload
}

export function calificacion(payload, type, history){
  let notaTema=0,notaPeriodo=0
  let cantTemas=0,cantPeriodos=0
  if(type){
    let id; for(id in payload){
      let semana;for(semana in payload[id]){
        let tema;for(tema  in payload[id][semana]){
          notaTema+=payload[id][semana][tema]
          cantTemas++
        }
        payload[id][semana]['final']=notaTema/cantTemas
        notaTema=0;cantTemas=0;
        notaPeriodo+=payload[id][semana]['final']
        cantPeriodos++
      }
      if(!payload[id]['final'])payload[id]['final']=history.find(e=>e.id===id)["final"]
      payload[id]['final'][semana]=notaPeriodo/cantPeriodos
      notaPeriodo=0;cantPeriodos=0;
      let total=0,div
      total=Object.entries(payload[id].final).reduce((sum, value) => (value[0] !== "final" ? sum + value[1] : sum), 0)
      div=Object.values(payload[id].final).length-1
      payload[id]['final']['final']=total/div
    }
  }else{
    let id; for(id in payload){
      let tema;for(tema  in payload[id]){
        notaTema+=payload[id][tema]
        cantTemas++
      }
      payload[id]['final']=notaTema/cantTemas
      if(!payload[id]['final'])payload[id]['final']={}
      payload[id]['final']=notaTema/cantTemas
      notaTema=0;cantTemas=0;
    }
  }
  return payload
}