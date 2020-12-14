import React, { Component } from 'react'
import ListPhonebook from './ListPhonebook'
import SearchPhonebook from './SearchPhonebook'
import AddPhonebook from './AddPhonebook'
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class BoxPhonebook extends Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.addPhonebook = this.addPhonebook.bind(this)
        this.removePhonebook = this.removePhonebook.bind(this)

    }

    componentDidMount() {
        request.get('phonebooks')
            .then(function (response) {
                const data = response.data.map(item => {
                    item.sent = true;
                    return item
                })
                this.setState({ data: data })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    addPhonebook(name, phone) {
        const id = Date.now();
        this.setState((state, props) => {
            return {
                data: [...state.data, { id, name, phone, sent: true }]
            };
        });
        console.log('data')
        request.post('phonebooks', { id, name, phone })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                this.setState(function (state, props) {
                    return {
                        data: state.data.map(item => {
                            if (item.id === id) {
                                item.sent = false;
                            }
                            return item
                        })
                    }
                })

            }.bind(this));
    }

    removePhonebook(id) {
        this.setState(function (state, props) {
            return {
                data: state.data.filter(item => item.id !== id)
            };
        });
        request.delete(`phonebooks/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editPhonebook() {
        
    }

    searchPhonebook(name, phone) {
        let { phonebooks } = this.props;
        let { nameFilter, phoneFilter } = this.state;

        if (nameFilter && phoneFilter) {
            const filterItems = (name, phone) => {
                return phonebooks.filter(item => {
                    return (
                        item.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
                        item.phone.indexOf(phone) > -1
                    );
                });
            };
            phonebooks = filterItems(nameFilter, phoneFilter);
        }
        if (nameFilter) {
            const filterItems = name => {
                return phonebooks.filter(item => {
                    return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
                });
            };
            phonebooks = filterItems(nameFilter);
        }
        if (phoneFilter) {
            const filterItems = phone => {
                return phonebooks.filter(item => {
                    return item.phone.indexOf(phone) > -1;
                });
            };
            phonebooks = filterItems(phoneFilter);
        }

    }

    render() {
        return (
            <div>
                <SearchPhonebook search={this.searchPhonebook} />
                <AddPhonebook add={this.addPhonebook} />
                <ListPhonebook data={this.state.data} remove={this.removePhonebook} edit={this.editPhonebook} />
            </div>
        )
    }

}

