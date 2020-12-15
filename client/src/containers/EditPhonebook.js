import React, {Component} from 'react';
import { connect } from 'react-redux';
import { editOFF, editPhonebook } from '../actions';


class EditPhonebook extends Component {
    constructor(props) {
        super(props)
        console.log('props', this.props)
        this.state = {
            id: props.id,
            name: props.name,
            phone: props.phone
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleNameChange(event) {
        this.setState({
            Name: event.target.value,
            isValid: true
        })
    }

    handlePhoneChange(event) {
        this.setState({
            Phone: event.target.value,
            isValid: true
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.editPhonebook(this.state.id, this.state.name, this.state.phone)
    }

    render() {
        console.log(this.state.id === this.props.id, this.state.name === this.props.name, this.state.phone === this.props.phone, 'ini state dan props')
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input type="text" className="form-control" name="Name" value={this.state.id} disabled={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input type="text" className="form-control" name="Name" value={this.state.name} onChange={this.handleNameChange} required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="col-8">
                            <input type="number" className="form-control" name="Name" value={this.state.phone} onChange={this.handlePhoneChange} required={true} />
                        </div>
                    </form>
                </td>
                <td>
                    <button type="submit" className="btn  mr-2" onClick={this.handleSubmit}><i className="fas fa-check"></i> Save</button>
                    <button type="button" className="btn " onClick={() => this.props.onCancel()}><i className="fas fa-times"></i> Cancel</button>
                </td>
            </tr>
        )
    }


}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCancel: () => dispatch(editOFF(ownProps.id)),
    editPhone: (id, name, phone) => {
        dispatch(editPhonebook(id, name, phone))
        dispatch(editOFF(ownProps.id))
    }
})

export default connect(
    null,
    mapDispatchToProps
)(EditPhonebook)