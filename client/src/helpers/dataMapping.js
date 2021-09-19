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

export function payloadCalification(json){
  let payload={}
  for(let alumno in json){
    let cut=alumno.split('-')
    if(!payload[cut[0]])payload[cut[0]]={}
    if(cut[2]&&!payload[cut[0]][cut[2]])payload[cut[0]][cut[2]]={}
    if(cut[2]){
      payload[cut[0]][cut[2]][cut[1]]=json[alumno]
    }else{
      payload[cut[0]][cut[1]]=json[alumno]
    }
  }
  return payload
}