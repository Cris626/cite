
const headeroptions = (props) => {
  return(<div style={{
    zIndex:1,display:'flex',
    justifyContent:'space-between',
    alignItems:'stretch',
    flexWrap:'wrap',padding:'3px',
    boxShadow:'0 0 15px 0 rgb(0 0 0 / 10%)',
    borderTop:'2px solid rgba(0,0,0,0.1)',
    boxSizing:'border-box',
    wordWrap:'break-word',
    color:'#566073',
  }}>
    {props.elements.map(e=>{
      return (
        <div style={{
          flex: '1 1',
          textAlign: 'center',
          boxSizing: 'border-box',
          display: 'block',
        }}>
          <button className="-btn" onClick={()=>localStorage.setItem('periodo',e)}
          >{e}</button>
        </div>
      )
    })}
  </div>)
}
export default headeroptions