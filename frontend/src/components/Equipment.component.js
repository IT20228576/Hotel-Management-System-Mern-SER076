import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Equipment = props => (
  <tr>
    <td>{props.equipment.equipmentID}</td>
    <td>{props.equipment.equipmentName}</td>
    <td>{props.equipment.category}</td>
    <td>{props.equipment.nextRD.substring(0, 10)}</td>
    <td>
      <Link to={"/equipment/details/" + props.equipment._id}>edit</Link>
    </td>
  </tr>
)

export default class Equipmentlist extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCateSearch = this.onChangeCateSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.deleteEquipment = this.deleteEquipment.bind(this);


    this.state = {
      equipments: [],
      searchKey: '',
      search: [],
      catesearch: '',
      total: 9,
    };
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    axios.get('http://localhost:5000/equipment/')
      .then(response => {
        this.setState({ equipments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    this.setState({
      search: ['', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteEquipment(id) {
    axios.delete('http://localhost:5000/equipment/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      equipments: this.state.equipments.filter(el => el._id !== id)
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  equipmentList() {
    return this.state.equipments.map(currentequipment => {
      return <Equipment equipment={currentequipment} deleteEquipment={this.deleteEquipment} key={currentequipment._id} />;
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeSearch(e) {
    this.setState({
      searchKey: e.currentTarget.value
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeCateSearch(e) {
    this.setState({
      catesearch: e.currentTarget.value
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickSearch() {
    console.log(this.state.catesearch);
    console.log(this.state.searchKey);
    axios.get('http://localhost:5000/equipment/')
      .then(response => {
        this.filterData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filterData(equipments) {

    if (this.state.searchKey !== '' && this.state.catesearch !== '') {
      const result = equipments.filter((equipments) =>
        equipments.equipmentName.toLowerCase().includes(this.state.searchKey) &&
        equipments.category.toLowerCase().includes(this.state.catesearch)
      )
      this.setState({ equipments: result })
    }
    if (this.state.searchKey === '' && this.state.catesearch !== '') {
      const result = equipments.filter((equipments) =>
        equipments.category.toLowerCase().includes(this.state.catesearch)
      )
      this.setState({ equipments: result })
    }
    if (this.state.searchKey !== '' && this.state.catesearch === '') {
      const result = equipments.filter((equipments) =>
        equipments.equipmentName.toLowerCase().includes(this.state.searchKey)
      )
      this.setState({ equipments: result })
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div>
        {this.state.equipments.id}
        <div className="form-group">
          <label>Equipment Category: </label>
          <select ref="userInput"
            required
            className="form-control"
            value={this.state.catesearch}
            onChange={this.onChangeCateSearch}>
            {
              this.state.search.map(function (search) {
                return <option
                  key={search}
                  value={search}>{search}
                </option>;
              })
            }
          </select>
        </div>

        <div className="input-group">
          <div className="form-outline">
            <input type="search" onChange={this.onChangeSearch} className="form-control rounded" placeholder="Search" aria-label="Search"
              aria-describedby="search-addon" />
          </div>
          <button type="button" onClick={this.onClickSearch} className="btn btn-primary" >
            Search
          </button>
        </div>

        <div>
          <Link to={"/equipment/add"}>
            <Button> Add new equipment </Button>
          </Link>
        </div>
        <h3>Logged Equipments</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>nextRD</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.equipmentList()}
          </tbody>
        </table>
      </div>
    )
  }
}