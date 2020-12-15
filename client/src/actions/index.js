import axios from 'axios'

const API_URL = 'http://localhost:3001/api/'

const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
});

// start load Phonebook data
export const loadPhonebookSuccess = (phonebooks) => ({
    type: 'LOAD_PHONEBOOK_SUCCESS',
    phonebooks
})

export const loadPhonebookFailure = () => ({
    type: 'LOAD_PHONEBOOK_FAILURE'
})

export const loadPhonebook = () => {
    return dispatch => {
        return request.get('phonebooks')
            .then(function (response) {
                dispatch(loadPhonebookSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadPhonebookFailure())
            });
    }
}

// end load Phonebook data

// start add Phonebook data

export const addPhonebookSuccess = (phonebooks) => ({
    type: 'ADD_PHONEBOOK_SUCCESS',
    phonebooks
})

export const addPhonebookFailure = (id) => ({
    type: 'ADD_PHONEBOOK_FAILURE', id
})

const addPhonebookRedux = (id, name, phone) => ({
    type: 'ADD_PHONEBOOK', id, name, phone
})


export const addPhonebook = (name, phone) => {
    let id = Date.now();
    return dispatch => {
        dispatch(addPhonebookRedux(id, name, phone))
        return request.post('phonebooks', { id, name, phone })
            .then(function (response) {
                dispatch(addPhonebookSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(addPhonebookFailure(id))
            });
    }
}

// start delete Phonebook data

const deletePhonebookRedux = (id) => ({
    type: 'DELETE_PHONEBOOK', id
})

export const deletePhonebookSuccess = () => ({
    type: 'DELETE_PHONEBOOK_SUCCESS'

})

export const deletePhonebookFailure = () => ({
    type: 'DELETE_PHONEBOOK_FAILURE'
})


export const deletePhonebook = (id) => {
    return dispatch => {
        dispatch(deletePhonebookRedux(id))
        return request.delete(`phonebooks/${id}`)
            .then(function (response) {
                dispatch(deletePhonebookSuccess())
            })
            .catch(function (error) {
                console.error(error);
                dispatch(deletePhonebookFailure())
            });
    }
}

// end delete Phonebook data

export const resendPhonebookSuccess = (id) => ({
    type: 'RESEND_PHONEBOOK_SUCCESS',
    id

})

export const resendPhonebookFailure = () => ({
    type: 'RESEND_PHONEBOOK_FAILURE'
})



export const resendPhonebook = (id, name, phone) => {
    return dispatch => {
        return request.post('phonebooks', { id, name, phone })
            .then(function (response) {
                dispatch(resendPhonebookSuccess(id))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(resendPhonebookFailure())
            });
    }
}

// EDIT

export const editPhonebookSuccess = phonebooks => ({
    type: 'EDIT_PHONEBOOK_SUCCESS',
    phonebooks
});

export const editPhonebookFailure = id => ({
    type: 'EDIT_PHONEBOOK_FAILURE',
    id
});

const editPhonebookRedux = (id, name, phone) => ({
    type: 'EDIT_PHONEBOOK',
    id,
    name,
    phone
});

export const editON = (Id) => ({
    type: 'EDIT_ON',
    Id
})

export const editOFF = (Id) => ({
    type: 'EDIT_OFF',
    Id
})

export const editPhonebook = (id, name, phone) => {
    return dispatch => {
        dispatch(editPhonebookRedux(id, name, phone));
        return request
            .put(`phonebooks/${id}`, { name, phone })
            .then(response => {
                dispatch(editPhonebookSuccess(response.data));
            })
            .catch(err => {
                console.error(err);
                dispatch(editPhonebookFailure());
            });
    };
};

// SEARCH


export const searchContact = (value) => ({
    type: "SEARCH_CONTACT",
    value: value.trim()
})

export const searchContactReset = () => ({
    type: "SEARCH_CONTACT_RESET"
})