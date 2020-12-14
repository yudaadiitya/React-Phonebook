import React, { Component } from 'react'

export default class SearchPhonebook extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', phone: '', nameFilter: '', phoneFilter: ''}
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value});
    }
    handleChangePhone(event) {
        this.setState({ phone: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div
                        className="card-header"
                        style={{ backgroundColor: 'rgb(200, 100, 111)', color: 'white' }}>Search Form</div>
                    <div className="card-body">
                        <form>
                            <div className="form-inline">
                                <label className="my-1 mr-2 mx-sm-1">Name</label>
                                <input
                                    className="form-control mx-sm-1"
                                    type="text"
                                    name="nameFilter"
                                    placeholder="Name"
                                    value={this.nameFilter}
                                    onChange={this.handleChangeName}
                                />
                                <label className="my-1 mr-2 mx-sm-1">Phone</label>
                                <input
                                    className="form-control mx-sm-1"
                                    type="text"
                                    name="phoneFilter"
                                    value={this.phoneFilter}
                                    placeholder="Phone"
                                    onChange={this.handleChangePhone}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};
