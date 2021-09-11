import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EquipmentEdit extends Component {
    constructor(props) {
        super(props);

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
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/equipment/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            equipmentName: response.data.equipmentName,
            category: response.data.category,
            DOP: new Date(response.data.DOP),
            warranty: response.data.warranty,
            lastRD: new Date(response.data.lastRD),
            nextRD: new Date(response.data.nextRD)
        })   
      })
      .catch(function (error) {
        console.log(error);
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
        e.preventDefault();

        const equipment = {
            equipmentName: this.state.equipmentName,
            category: this.state.category,
            DOP: this.state.DOP,
            warranty: this.state.warranty,
            lastRD: this.state.lastRD,
            nextRD: this.state.nextRD
        }

        console.log(equipment);

        axios.post('http://localhost:5000/equipment/update/' + this.props.match.params.id, equipment)
            .then(res => console.log(res.data));

            window.location = '/equipment';


    }

    render() {
        return (
            <div>
                <h3>Edit date equipment Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Equipment Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.equipmentName}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Equipment Category: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.category}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>DOP: </label>
                        <div>
                            <DatePicker
                                selected={this.state.DOP}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>warranty (in years): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.warranty}
                            disabled
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
                        <input type="submit" value="Edit date Equipment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}