const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  //* action = { type:.., payload:...}
  // const { type, payload } = action;
  switch (type) {
    default:
      return { ...state };
  }
}
