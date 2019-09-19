import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => (
  <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/" >CICAM</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navCICAM" aria-controls="navCICAM" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navCICAM">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/Mantenimiento">Mantenimiento <span className="sr-only">(current)</span></Link>
            </li>

          </ul>
        </div>
    </nav>
  </React.Fragment>
);

export default NavBar;