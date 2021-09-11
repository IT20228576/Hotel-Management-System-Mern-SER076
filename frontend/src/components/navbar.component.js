import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/equipment" className="nav-link">Equipment</Link>
          </li>
          <li className="navbar-item">
          <Link to="/stock" className="nav-link">Stock</Link>
          </li>
          <li className="navbar-item">
          <Link to="/equipment/add" className="nav-link">Create Equipment log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/stock/add" className="nav-link">Create Stock log</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}