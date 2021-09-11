import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class main extends Component {

    render() {
        return (
            <div>
                <Link to={"/equipment"}>
                    <Button> Equipment </Button>
                </Link>
                <Link to={"/stock"}>
                    <Button> Stock </Button>
                </Link>
            </div>
        );
    }
}