import { GET_MY_BOLICHE } from "./actionsTypes";



const initialState = {
    myBoliche: {},
    categories: [
        "Tragos",
        "Cervezas",
        "Botellas",
        "Vinos",
        "Shots",
        "Sin Alcohol",
    ],
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_MY_BOLICHE:
            return {
                ...state,
                myBoliche: payload
            }

        default:
            return { ...state };
    }
}

export default reducer;