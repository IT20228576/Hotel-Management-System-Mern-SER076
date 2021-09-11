import React, { Component } from 'react';
import axios from 'axios';

export default class StockAdd extends Component {
    constructor(props) {
        super(props);

        this.onChangeStockName = this.onChangeStockName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeUnitPrice = this.onChangeUnitPrice.bind(this);
        this.onChangeUnitCost = this.onChangeUnitCost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            stockName: '',
            category: '',
            quantity: 0,
            unitPrice: 0,
            unitCost: 0,
            categorys: []
        }
    }

    componentDidMount() {
        this.setState({
            categorys: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
            category: 'test1'
        })
    }

    onChangeStockName(e) {
        this.setState({
            stockName: e.target.value
        })
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    onChangeUnitPrice(e) {
        this.setState({
            unitPrice: e.target.value
        })
    }

    onChangeUnitCost(e) {
        this.setState({
            unitCost: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const stock = {
            stockName: this.state.stockName,
            category: this.state.category,
            quantity: this.state.quantity,
            unitPrice: this.state.unitPrice,
            unitCost: this.state.unitCost
        }

        console.log(stock);

        axios.post('http://localhost:5000/stock/add', stock)
            .then(res => console.log(res.data));

        window.location = '/stock';

    }

    render() {
        return (
            <div>
                <h3>Create New stock Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>stock Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.stockName}
                            onChange={this.onChangeStockName}
                        />
                    </div>
                    <div className="form-group">
                        <label>stock Category: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeCategory}>
                            {
                                this.state.categorys.map(function (categorys) {
                                    return <option
                                        key={categorys}
                                        value={categorys}>{categorys}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>quantity (in years): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.quantity}
                            onChange={this.onChangeQuantity}
                        />
                    </div>

                    <div className="form-group">
                        <label>unitPrice (in rupees): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.unitPrice}
                            onChange={this.onChangeUnitPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>unitCost (in rupees): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.unitCost}
                            onChange={this.onChangeUnitCost}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add New Eqquipment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}