import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class StockDetails extends Component {
    constructor(props) {
        super(props);

        this.deleteStock = this.deleteStock.bind(this)

        this.state = {
            stockName: '',
            category: '',
            quantity: 0,
            unitPrice: 0,
            unitCost: 0,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/Stock/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            stockName: response.data.stockName,
            category: response.data.category,
            quantity: response.data.quantity,
            unitPrice: response.data.unitPrice,
            unitCost: response.data.unitCost
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    }

    deleteStock(id) {
        axios.delete('http://localhost:5000/stock/' + id)
            .then(response => { console.log(response.data) });
    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>
            <h4>{this.state.stockName}</h4>
            <hr />

            <dl className="row">

                <dt className="col-sm-3">Event ID</dt>
                <dd className="col-sm-9">{this.state.category}</dd>

                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{this.state.quantity}</dd>

                <dt className="col-sm-3">Event Category</dt>
                <dd className="col-sm-9">{this.state.unitPrice}</dd>

                <dt className="col-sm-3">Event Category</dt>
                <dd className="col-sm-9">{this.state.unitCost}</dd>

            </dl>
            <div>
                <Link to={"/stock/edit/" + this.props.match.params.id}>
                    <Button> Edit </Button>
                </Link>

                <a href="/stock" onClick={() => { this.deleteStock(this.props.match.params.id) }}>
                    <Button> Delete </Button>
                </a>
            </div>
        </div>
        )
    }
}