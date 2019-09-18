import React from 'react';
import Axios from 'axios';


class Mantenimiento extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			empleados : []
		}

		this.FindCodigo = this.FindCodigo.bind(this);
	}

	componentDidMount(){
		Axios.get("http://localhost:60141/CICAM/Empleados/")
			.then(response =>{
				this.setState({
					empleados : response.data
				})
			})
	}

	componentWillUnmount(){
		Axios.Cancel();
	}

	FindCodigo(){
		let IDEmp = document.getElementById("iCode").value
		if(IDEmp != ""){
			Axios.get("http://localhost:60141/CICAM/Empleados/Find?"+"ID="+ parseInt(IDEmp))
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

  render() {
		
		return (
			<div className="container mt-5" >
				<div className="row">
					<div className="col-md-12">
					<h3 className="text-center">BUSQUEDA EMPLEADOS</h3>
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

						<div className="col-md-5 col-7 mt-3">          
							<button className="btn btn-outline-secondary btn-block"  id="btn_Nuevo" name="btn_Nuevo">Nuevo</button>            
							<button className="btn btn-outline-primary btn-block"  id="btn_Nuevo" name="btn_Nuevo">Reporte</button>            
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
									<th scope="col">Huella</th>
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
														this.state.empleados[index].HUELLA 
															? <button className="btn btn-success" onClick={this.GrabaHuella}>Actualizar</button>
															: <button className="btn btn-danger" onClick={this.GrabaHuella}>Grabar</button>
													}
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