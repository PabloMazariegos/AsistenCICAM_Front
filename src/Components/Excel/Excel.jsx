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

  componentDidMount(){
    Axios.get("http://localhost:60141/CICAM/Export")
			.then(response =>{
				this.setState({
					export : response.data
				})
			})
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
          </Workbook.Sheet>
        </Workbook>
      </button>
    )
  }
}

export default Excel;