import React from 'react';
import Workbook from 'react-excel-workbook'
import Axios from 'axios';


class Excel extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      export : []
    }
  }

  componentDidUpdate(prevProps){
    if((this.props.FechaInit !== prevProps.FechaInit)|| (this.props.FechaFinal !== prevProps.FechaFinal) ){
      Axios.get("http://localhost:60141/CICAM/Export?FechaInit='"+this.props.FechaInit+"'&FechaFinal='"+this.props.FechaFinal+"'")
        .then(response =>{
          this.setState({
            export : response.data
          })
        })
    }
      

      console.log(this.state.export)
  }

  render (){
    let date =  new Date();
    let filedate = date.toString().split(" ")
    return(
      <button className="btn btn-secondary btn-block">
        <Workbook filename={`Reporte ${filedate[1]+filedate[2]+filedate[3]}.xlsx`} element={<span>Reporte</span>}>
          <Workbook.Sheet data={this.state.export} name="Reporte">
            <Workbook.Column label="FECHA" value="FECHA"/>
            <Workbook.Column label="CODIGO" value="CODIGO"/>
            <Workbook.Column label="PUESTO" value="PUESTO"/>
            <Workbook.Column label="NOMBRE" value="NOMBRE"/>
            <Workbook.Column label="APELLIDO" value="APELLIDO"/>
            <Workbook.Column label="ENTRADA" value="ENTRADA"/>
            <Workbook.Column label="SALIDA" value="SALIDA"/>
            <Workbook.Column label="TOTAL HORAS" value="TOTAL_HORAS"/>
          </Workbook.Sheet>
        </Workbook>
      </button>
    )
  }
}

export default Excel;