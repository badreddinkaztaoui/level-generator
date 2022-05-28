// Global State
import { createGlobalState } from "react-hooks-global-state";

const initialState = { score: 0 };
const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { setGlobalState, useGlobalState };
