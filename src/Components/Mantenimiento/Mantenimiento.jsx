import React from 'react';
import Axios from 'axios';

import Excel from '../Excel/Excel.jsx'



class Mantenimiento extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			empleados : [],
			export : [],
			FechaInicial : '',
			FechaFinal : ''
		}
		this.FindCodigo = this.FindCodigo.bind(this);
		this.Ingresar = this.Ingresar.bind(this);
		this.FormIngresar = this.FormIngresar.bind(this);
		this.FindApellido = this.FindApellido.bind(this);
		this.FindPuesto = this.FindPuesto.bind(this);
		this.FechaReport = this.FechaReport.bind(this);
	}

	componentDidMount(){
		Axios.get("http://localhost:60141/CICAM/Empleados/")
			.then(response =>{
				this.setState({
					empleados : response.data,
					alertType : ""
				})
			})
	}

	FindCodigo(){
		let IDEmp = document.getElementById("iCode").value
		if(IDEmp !== ""){
			Axios.get("http://localhost:60141/CICAM/Empleados/Find?ID="+ IDEmp)
			.then(response => {
				this.setState({
					empleados : response.data
				});
			})
		}else{
			Axios.get("http://localhost:60141/CICAM/Empleados/")
			.then(response =>{
				this.setState({
					empleados : response.data
				})
			})
		}
	}

	FindApellido(){
		let IDEmp = document.getElementById("iApe").value
		if(IDEmp !== ""){
			Axios.get("http://localhost:60141/CICAM/Empleados/Find?APELLIDO="+ IDEmp)
			.then(response => {
				this.setState({
					empleados : response.data
				});
			})
		}else{
			Axios.get("http://localhost:60141/CICAM/Empleados/")
			.then(response =>{
				this.setState({
					empleados : response.data
				})
			})
		}
	}

	FindPuesto(){
		let IDEmp = document.getElementById("iPues").value
		if(IDEmp !== ""){
			Axios.get("http://localhost:60141/CICAM/Empleados/Find?PUESTO="+ IDEmp)
			.then(response => {
				this.setState({
					empleados : response.data
				});
			})
		}else{
			Axios.get("http://localhost:60141/CICAM/Empleados/")
			.then(response =>{
				this.setState({
					empleados : response.data
				})
			})
		}
	}

	Ingresar(){
		let Codigo = ""
		let Nombre = document.getElementById("txt_nombre").value
		let Apellido = document.getElementById("txt_apellido").value
		let Puesto = document.getElementById("txt_puesto").value

		if(Nombre !== ""	&& Apellido !== ""	&& Puesto !== ""){
			Axios.post("http://localhost:60141/CICAM/Empleados?CODIGO="+ Codigo +"&NOMBRE="+Nombre+"&APELLIDO="+Apellido+"&PUESTO="+Puesto+"&HUELLA=''")
			.then(response => {
				if(response.data.StatusCode === 200){
					document.getElementById("AlertContainer").style.display="block";
					this.setState({alertType : "success"});
					document.getElementById("AlertMessage").innerHTML = "Empleado Ingresado Exitosamente! "

					Axios.get("http://localhost:60141/CICAM/Empleados/")
					.then(response =>{
						this.setState({
							empleados : response.data
						})
					})

				}else{
					document.getElementById("AlertContainer").style.display="block";
					this.setState({alertType : "danger"});
					document.getElementById("AlertMessage").innerHTML = "Ha ocurrido un error, intenta de nuevo"
				}
			})
		}
	}

	FormIngresar(){
		var formIngreso = document.getElementById('FormIngresar');
		if(formIngreso.style.display == "block"){
			formIngreso.style.display = "none"
		}else{
			formIngreso.style.display = "block"
		}
		
	}

	GrabaHuella(IDe){
		document.getElementById(IDe+"spinner").style.display="block";
		document.getElementById("AlertContainer").style.display="block";
		document.getElementById("AlertMessage").innerHTML = "Coloca tu dedo en el lector 4 veces"
		this.setState({alertType : "warning"});
		
		Axios.post("http://localhost:60141/CICAM/Marcaje?ID="+ IDe +"&NOMBRE=''&APELLIDO=''&PUESTO=''&HUELLA=''")
			.then(response => {
				if(response != ""){
					document.getElementById(IDe+"spinner").style.display="none";
					document.getElementById("AlertMessage").innerHTML = "Huella Grabada Exitosamente! "
					this.setState({alertType : "success"});

					Axios.get("http://localhost:60141/CICAM/Empleados/")
					.then(response =>{
						this.setState({
							empleados : response.data
						})
					})

				}else{
					this.setState({alertType : "danger"});
					document.getElementById("AlertMessage").innerHTML = "Error Grabando Huella, intenta de nuevo!"
					document.getElementById(IDe+"spinner").style.display="none";
				}
			})

	}

	Eliminar(ID){
		Axios.delete("http://localhost:60141/CICAM/Empleados?ID="+ID)
			.then(response => {
				document.getElementById("AlertContainer").style.display="block";
				if(response.data.StatusCode === 200){
					this.setState({alertType : "success"});
					document.getElementById("AlertMessage").innerHTML = "Empleado Eliminado Exitosamente! "

					Axios.get("http://localhost:60141/CICAM/Empleados/")
					.then(response =>{
						this.setState({
							empleados : response.data
						})
					})
				}else{
					this.setState({alertType : "danger"});
					document.getElementById("AlertMessage").innerHTML = "Ha ocurrido un error, intente de nuevo"
				}
			})
	}

	FechaReport(){
		this.setState({
			FechaInicial : document.getElementById('FechaInicial').value,
			FechaFinal : document.getElementById('FechaFinal').value		
		})
	}
  render() {
		
		return (
			<div className="container mt-5" >
				<div className="row">
					<div className="col-md-12">
					<h3 className="text-center">BUSQUEDA EMPLEADOS</h3>
					</div>
				</div>

				<div className="row mt-5" id="AlertContainer" style={{display: "none"}}>
          <div className="col-md-12">
            <div className={`alert alert-${this.state.alertType}`} role="alert" id="AlertMessage">
              
            </div>
          </div>
        </div>

				<div className="row justify-content-center mt-5" >
					<div className="col-md-6 mt-md-0 mt-3 d-flex align-items-center justify-content-center flex-column"> 

					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Codigo" id="iCode"/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" type="button" id="btn-codigo" onClick={this.FindCodigo}>Buscar</button>
						</div>
					</div>

					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Apellido" id="iApe"/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" type="button" id="btn-codigo" onClick={this.FindApellido}>Buscar</button>
						</div>
					</div>

					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Puesto" id="iPues"/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" type="button" id="btn-codigo" onClick={this.FindPuesto}>Buscar</button>
						</div>
					</div>

					<div className="input-group mb-3">
						<input type="date" className="form-control" placeholder="FechaInicial" id="FechaInicial" onChange={this.FechaReport}/>
						<input type="date" className="form-control" placeholder="FechaFinal" id="FechaFinal" onChange={this.FechaReport}/>
						<div className="input-group-append">
							<Excel FechaInit={this.state.FechaInicial}  FechaFinal={this.state.FechaFinal}/>  
						</div>
					</div>

						<div className="col-md-5 col-7 mt-3">          
							<button className="btn btn-outline-primary btn-block"  id="btn_Nuevo" name="btn_Nuevo" onClick={this.FormIngresar}>Nuevo</button>     
							         
						</div>
					</div>
				</div>

				<div id="FormIngresar" className="row mt-5" style={{display: 'none'}}>
					<div className="offset-md-2 col-md-8">
						<div className="form-group">
							<input className="form-control" type="text" name="txt_nombre" id="txt_nombre" placeholder="Nombre"/>
						</div>
						<div className="form-group">
							<input className="form-control" type="text" name="txt_apellido" id="txt_apellido" placeholder="Apellido"/>
						</div>
						<div className="form-group">
							<input className="form-control" type="text" name="txt_puesto" id="txt_puesto" placeholder="Puesto"/>
						</div>
						<div className="form-group">
							<button className="btn btn-success" onClick={this.Ingresar}>Ingresar</button>
						</div>
					</div>
				</div>
				
				<div className="row mt-5">
					<div className="table-responsive">
						<table className="table">
							<thead className="thead-dark">
								<tr>
									<th scope="col">Codigo</th>
									<th scope="col">Nombres</th>
									<th scope="col">Apellidos</th>
									<th scope="col">Puesto</th>
									<th colSpan="2" scope="col">Huella</th>
									<th scope="col">Accion</th>
								</tr>
							</thead>
							<tbody>					
								{
									Object.keys(this.state.empleados).map(index =>{
										
										return (
											<tr key={this.state.empleados[index].ID}>
												<td>{this.state.empleados[index].ID}</td>
												<td>{this.state.empleados[index].NOMBRE}</td>
												<td>{this.state.empleados[index].APELLIDO}</td>
												<td>{this.state.empleados[index].PUESTO}</td>
												<td>
													{
														<button className="btn btn-outline-primary	" onClick={()=> this.GrabaHuella(this.state.empleados[index].ID)}>Grabar</button>															
													}
												</td>
												<td>
													<div id={this.state.empleados[index].ID+"spinner"} style={{display: "none"}} className="spinner-border text-primary" role="status">
														<span className="sr-only">Loading...</span>
													</div>
												</td>
												<td>
													<button className="btn btn-sm btn-outline-danger" onClick={()=> this.Eliminar(this.state.empleados[index].ID)}>Eliminar</button>
												</td>
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


export default Mantenimiento;