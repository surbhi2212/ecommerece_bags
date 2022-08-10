import {combineReducers} from "redux";
import { cartreducer } from "./reducer";
import {wishreducer} from './reducer';
import { viewreducer } from "./reducer";


const rootred = combineReducers({
    cartreducer, wishreducer, viewreducer
});


export default rootred
