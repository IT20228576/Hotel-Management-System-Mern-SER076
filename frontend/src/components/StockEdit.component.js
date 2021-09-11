import React, { Component } from 'react';
import axios from 'axios';

export default class StockEdit extends Component {
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

        this.setState({
            categorys: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
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

        axios.post('http://localhost:5000/stock/update/' + this.props.match.params.id, stock)
            .then(res => console.log(res.data));


    }

    render() {
        return (
            <div>
                <h3>Edit stock Log</h3>
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
                        <input type="submit" value="Edit Eqquipment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}