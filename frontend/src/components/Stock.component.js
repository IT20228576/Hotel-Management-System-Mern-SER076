import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Stock = props => (
  <tr>
    <td>{props.stock.stockName}</td>
    <td>{props.stock.category}</td>
    <td>{props.stock.quantity}</td>
    <td>{props.stock.unitPrice}</td>
    <td>{props.stock.unitCost}</td>
    <td>
      <Link to={"stock/details/"+props.stock._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteStock(props.stock._id) }}>delete</a>
    </td>
  </tr>
)

export default class Stocklist extends Component {
  constructor(props) {
    super(props);

    this.deleteStock = this.deleteStock.bind(this)

    this.state = {stocks: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/stock/')
      .then(response => {
        this.setState({ stocks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteStock(id) {
    axios.delete('http://localhost:5000/stock/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        stocks: this.state.stocks.filter(el => el._id !== id)
    })
  }

  StockList() {
    return this.state.stocks.map(currentStock => {
      return <Stock stock={currentStock} deleteStock={this.deleteStock} key={currentStock._id}/>;
    })
  }

  render() {
    return (
      <div>
        <div>
          <Link to={"/stock/add"}>
            <Button> Add new Stock </Button>
          </Link>
        </div>
        <h3>Logged Stock</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>stockName</th>
              <th>category</th>
              <th>quantity</th>
              <th>unitPrice</th>
              <th>unitCost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.StockList() }
          </tbody>
        </table>
      </div>
    )
  }
}