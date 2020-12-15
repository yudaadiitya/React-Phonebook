import React, { Component } from 'react'
import ItemPhonebook from './Phonebook'
import { connect } from 'react-redux'
import { loadPhonebook } from '../actions'
import EditPhonebook from './EditPhonebook'


class ListPhonebook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameSearch: '',
            phoneSearch: ''
        }
        this.handleChangeNameSearch = this.handleChangeNameSearch.bind(this);
        this.handleChangePhoneSearch = this.handleChangePhoneSearch.bind(this);
    }

    componentDidMount() {
        this.props.loadPhone();
    }

    handleChangeNameSearch(e) {
        this.setState({ nameSearch: e.target.value })
    }

    handleChangePhoneSearch(e) {
        this.setState({ phoneSearch: e.target.value })
    }

    search(){
        const { nameSearch, phoneSearch } = this.state;
        return (
            <div className='card'>
                <div className='card-header'>
                    Search Form
                    </div>
                <div className='card-body'>
                    <form>
                        <div className="form-inline">
                            <label className="my-1 mr-2 mx-sm-1">Name</label>
                            <input
                                className="form-control mx-sm-1"
                                type="text"
                                name="nameFilter"
                                placeholder="Name"
                                value={nameSearch}
                                onChange={this.handleChangeNameSearch}
                            />
                            <label className="my-1 mr-2 mx-sm-1">Phone</label>
                            <input
                                className="form-control mx-sm-1"
                                type="text"
                                name="phoneFilter"
                                value={phoneSearch}
                                placeholder="Phone"
                                onChange={this.handleChangePhoneSearch}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        let { nameSearch, phoneSearch } = this.state
        let { phonebook } = this.props

        if (nameSearch && phoneSearch) {
            const searchItems = (name, phone) => {
                return phonebook.filter(item => {
                    return (
                        item.name.toLowerCase().indexOf(name.toLowerCase()) > -1 &&
                        item.phone.indexOf(phone) > -1
                    );
                });
            };
            phonebook = searchItems(nameSearch, phoneSearch);
        }
        if (nameSearch) {
            const searchItems = name => {
                return phonebook.filter(item => {
                    return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
                });
            };
            phonebook = searchItems(nameSearch);
        }
        if (phoneSearch) {
            const searchItems = phone => {
                return phonebook.filter(item => {
                    return item.phone.indexOf(phone) > -1;
                });
            };
            phonebook = searchItems(phoneSearch);
        }

        let listPhone = phonebook.map((item, no) => {
            return (
                <ItemPhonebook
                    no={no}
                    key={no}
                    id={item.id}
                    name={item.name}
                    phone={item.phone}
                    sent={item.sent} />
            )
        })
        return (
            <div>
                {this.search()}
                <table className="table table-striped my-3">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPhone}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    phonebook: state.phonebooks
})

const mapDispatchToProps = (dispatch) => ({
    loadPhone: () => dispatch(loadPhonebook())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPhonebook)