import {useDispatch} from "react-redux";
import {AppDispatch} from "../types/storeTypes.ts";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;