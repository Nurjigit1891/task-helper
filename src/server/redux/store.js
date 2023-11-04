import { createStore } from "redux";
import grSlice from "./grSlice";

const store = createStore(grSlice);

export default store