


const initialState = {}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        //  case ....:
        //   return {
        //     ...state,
        //   }


        default:
            return { ...state };
    }
}

export default reducer;