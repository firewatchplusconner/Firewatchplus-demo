const ALL_ADDRESSES = "addresses/ALL_ADDRESSES";
const SINGLE_ADDRESS = "addresses/SINGLE_ADDRESS";
const DELETE_ADDRESS = "addresses/DELETE_ADDRESS";

const allAddresses = (addresses) => ({
    type: ALL_ADDRESSES,
    payload: addresses,
});

const singleAddress = (address) => ({
    type: SINGLE_ADDRESS,
    payload: address,
});

const deleteSingleAddress = (id) => ({
    type: DELETE_ADDRESS,
    payload: id,
});

export const loadAllAddresses = () => async (dispatch) => {
    const response = await fetch("/api/address/");

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(allAddresses(data));
        return;
    }
};

export const loadSingleAddress = (id) => async (dispatch) => {
    const response = await fetch(`/api/address/${id}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(singleAddress(data));
        return;
    }
};

export const deleteAddress = (id) => async (dispatch) => {
    const response = await fetch(`/api/address/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(deleteSingleAddress(id));
        return;
    }
};

export const addAddress = (address) => async (dispatch) => {
    const response = await fetch("/api/address/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(singleAddress(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const updateAddress = (id, address) => async (dispatch) => {
    const response = await fetch(`/api/address/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(singleAddress(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

const initialState = { allAddresses: null, singleAddress: null };

export default function reducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case ALL_ADDRESSES:
            newState = {
                ...state,
                allAddresses: { ...action.payload },
                singleAddress: { ...state.singleAddress },
            };
            return newState;
        case SINGLE_ADDRESS:
            newState = {
                ...state,
                singleAddress: { ...action.payload },
                allAddresses: { ...state.allAddresses },
            };
            return newState;
        case DELETE_ADDRESS:
            newState = {
                ...state,
                singleAddress: null,
                allAddresses: { ...state.allAddresses },
            };
            delete newState.allAddresses[action.payload];
            return newState;
        default:
            return state;
    }
}
