import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EquipmentAdd extends Component {
    constructor(props) {
        super(props);

        this.onChangeEquipmentName = this.onChangeEquipmentName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDOP = this.onChangeDOP.bind(this);
        this.onChangeWarranty = this.onChangeWarranty.bind(this);
        this.onChangeLastRD = this.onChangeLastRD.bind(this);
        this.onChangeNextRD = this.onChangeNextRD.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            equipmentName: '',
            category: '',
            DOP: new Date(),
            warranty: 0,
            lastRD: new Date(),
            nextRD: new Date(),
            categorys: []
        }
    }

    componentDidMount() {
        this.setState({
            categorys: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
            category: 'test1'
        })
    }

    onChangeEquipmentName(e) {
        this.setState({
            equipmentName: e.target.value
        })
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    onChangeDOP(date) {
        this.setState({
            DOP: date
        })
    }

    onChangeWarranty(e) {
        this.setState({
            warranty: e.target.value
        })
    }

    onChangeLastRD(date) {
        this.setState({
            lastRD: date
        })
    }

    onChangeNextRD(date) {
        this.setState({
            nextRD: date
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const equipment = {
            equipmentName: this.state.equipmentName,
            category: this.state.category,
            DOP: this.state.DOP,
            warranty: this.state.warranty,
            lastRD: this.state.lastRD,
            nextRD: this.state.nextRD
        }

        console.log(equipment);

        axios.post('http://localhost:5000/equipment/add', equipment)
            .then(res => console.log(res.data));

        window.location = '/equipment';

    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Equipment Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.equipmentName}
                            onChange={this.onChangeEquipmentName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Equipment Category: </label>
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
                        <label>DOP: </label>
                        <div>
                            <DatePicker
                                selected={this.state.DOP}
                                onChange={this.onChangeDOP}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>warranty (in years): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.warranty}
                            onChange={this.onChangeWarranty}
                        />
                    </div>
                    <div className="form-group">
                        <label>lastRD: </label>
                        <div>
                            <DatePicker
                                selected={this.state.lastRD}
                                onChange={this.onChangeLastRD}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>nextRD: </label>
                        <div>
                            <DatePicker
                                selected={this.state.nextRD}
                                onChange={this.onChangeNextRD}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add New Eqquipment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}