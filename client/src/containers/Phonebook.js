import { connect } from 'react-redux'
import { editON, deletePhonebook, resendPhonebook } from '../actions'
import ItemPhonebook from '../components/ItemPhonebook'

const mapDispatchToProps = (dispatch, ownProps) => ({
    hapus : () => dispatch(deletePhonebook(ownProps.id)),
    ulang : () => dispatch(resendPhonebook(ownProps.id, ownProps.name, ownProps.phone)),
    edit : () => dispatch(editON(ownProps.id))
})

export default connect(
    null,
    mapDispatchToProps
)(ItemPhonebook)