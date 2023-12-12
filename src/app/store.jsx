import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import colectionReduser from "../components/slices/CollectionSlice";
import charmsReducer from '../components/slices/CharmsSlice';
import categoryReduser from "../components/slices/CategorySlice";
import genReducer from "../components/slices/GenSlice";
import addbagReducer from "../components/slices/AddBagSlice"
import addbagcolectReducer from "../components/slices/AddBagColectSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    colection: colectionReduser,
    charms: charmsReducer,
    category: categoryReduser,
    gen: genReducer,
    addbag: addbagReducer,
    addbagcolect: addbagcolectReducer
  },
});
