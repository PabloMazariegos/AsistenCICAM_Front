import React from 'react';
import Axios from 'axios';

class Home extends React.Component {

  constructor (props){
    super(props);

    this.state = {
      Empleado : [],
      alertType : ""
    }

    this.Procesar =  this.Procesar.bind(this);
    
  }

  Procesar = () => {
    Axios({
      method: 'GET',
      url : "http://localhost:60142/CICAM/Marcaje",
      headers: {
        'content-type' : 'application/json'
      },
      data : {
        "CMBX_IDENTIY": "",
        "EMPE_IDENTITY": "",
        "HORA" : "",
        "FECHA" : ""
      }      
    })
    .then(response => {
      if(response.data.status === "Registro no encontrado"){
        this.setState({
          alertType: "danger"
        })
        document.getElementById("RowEmpleado").style.display = "none";

      }else{
        this.setState({alertType: "success"})
        Axios.get("http://localhost:60141/CICAM/Empleados/Find?ID="+parseInt(response.data.ID))
        .then(response =>{
          this.setState({
            Empleado : response.data
          });
          document.getElementById("RowEmpleado").style.display = "block";
        })
      }
      document.getElementById("AlertMessage").innerHTML = response.data.status;
      document.getElementById("AlertContainer").style.display= "block";
    })
  }
  
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">CONTROL DE ASISTENCIA</h3>
          </div>
        </div>

        <div className="row mt-5" id="AlertContainer" style={{display: "none"}}>
          <div className="col-md-12">
            <div className={`alert alert-${this.state.alertType}`} role="alert" id="AlertMessage">
              
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-md-6">
            <div className="form-group row justify-content-center mt-5">
              <div className="col-6">
                <button id="btn_submit" className="btn btn-primary btn-block" onClick={this.Procesar}>Marcar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5" id= "RowEmpleado" style={{display: "none"}}>
					<div className="table-responsive">
						<table className="table">
							<thead className="thead-dark">
								<tr>
									<th scope="col">Codigo</th>
									<th scope="col">Nombres</th>
									<th scope="col">Apellidos</th>
									<th scope="col">Puesto</th>
								</tr>
							</thead>
							<tbody>	
                {   
                  Object.keys(this.state.Empleado).map(index => {
                    return (
                      <tr key={this.state.Empleado[index].ID}>
                        <td>{this.state.Empleado[index].ID}</td>
                        <td>{this.state.Empleado[index].NOMBRE}</td>
                        <td>{this.state.Empleado[index].APELLIDO}</td>
                        <td>{this.state.Empleado[index].PUESTO}</td>
                      </tr>
                    )
                  })                
                }
              </tbody>
            </table>
          </div>
        </div>		
      </div>
    )
  }
}

export default Home;