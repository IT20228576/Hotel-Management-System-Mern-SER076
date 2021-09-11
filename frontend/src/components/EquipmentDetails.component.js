import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class EquipmentDetails extends Component {
    constructor(props) {
        super(props);

        this.deleteEquipment = this.deleteEquipment.bind(this)

        this.state = {
            equipmentName: '',
            category: '',
            DOP: '',
            warranty: 0,
            lastRD: '',
            nextRD: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/equipment/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    equipmentName: response.data.equipmentName,
                    category: response.data.category,
                    DOP: response.data.DOP.substring(0, 10),
                    warranty: response.data.warranty,
                    lastRD: response.data.lastRD.substring(0, 10),
                    nextRD: response.data.nextRD.substring(0, 10)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    deleteEquipment(id) {
        axios.delete('http://localhost:5000/equipment/' + id)
            .then(response => { console.log(response.data) });

    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <h4>{this.state.equipmentName}</h4>
                <hr />

                <dl className="row">

                    <dt className="col-sm-3">Event ID</dt>
                    <dd className="col-sm-9">{this.state.category}</dd>

                    <dt className="col-sm-3">Description</dt>
                    <dd className="col-sm-9">{this.state.DOP}</dd>

                    <dt className="col-sm-3">Event Category</dt>
                    <dd className="col-sm-9">{this.state.warranty}</dd>

                    <dt className="col-sm-3">Event Category</dt>
                    <dd className="col-sm-9">{this.state.lastRD}</dd>

                    <dt className="col-sm-3">Calories</dt>
                    <dd className="col-sm-9">{this.state.nextRD}</dd>

                </dl>
                <div>
                    <Link to={"/equipment/edit/" + this.props.match.params.id}>
                        <Button> Edit </Button>
                    </Link>

                    <Link to={"/equipment/editdates/" + this.props.match.params.id}>
                        <Button> Update Dates </Button>
                    </Link>

                    <a href="/equipment" onClick={() => { this.deleteEquipment(this.props.match.params.id) }}>
                        <Button> Delete </Button>
                    </a>
                </div>
            </div>
        )
    }
}