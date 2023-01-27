const ALL_INSPECTION_TYPES = "inspectionTypes/ALL_INSPECTION_TYPES";
const SINGLE_INSPECTION_TYPE = "inspectionTypes/SINGLE_INSPECTION_TYPE";

const allInspectionTypes = (inspectionTypes) => ({
    type: ALL_INSPECTION_TYPES,
    payload: inspectionTypes,
});

const singleInspectionType = (inspectionType) => ({
    type: SINGLE_INSPECTION_TYPE,
    payload: inspectionType,
});

export const loadAllInspectionTypes = () => async (dispatch) => {
    const response = await fetch(`/api/inspection-types/`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(allInspectionTypes(data));
        return;
    }
};

export const loadSingleInspectionType =
    (inspectionTypeId) => async (dispatch) => {
        const response = await fetch(
            `/api/inspection-types/${inspectionTypeId}`
        );

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                return;
            }
            dispatch(singleInspectionType(data));
            return;
        }
    };

const initialState = { allInspectionTypes: null, singleInspectionType: null };

export default function reducer(state = initialState, action) {
    let newState = {};
    switch(action.type) {
        case ALL_INSPECTION_TYPES:
            newState = {
                ...state,
                allInspectionTypes: { ...action.payload },
                singleInspectionType: { ...state.singleInspectionType },
            };
            return newState;
        case SINGLE_INSPECTION_TYPE:
            newState = {
                ...state,
                singleInspectionType: { ...action.payload },
                allInspectionTypes: { ...state.allInspectionTypes },
            };
            return newState;
        default:
            return state;
    }
}
