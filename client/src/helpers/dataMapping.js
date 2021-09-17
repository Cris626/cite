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
export function convertJsonToArray(json){
  let array=[]
  for(let obj in json){
    array.push({key: obj, payload: json[obj]})
  }
  return array
}