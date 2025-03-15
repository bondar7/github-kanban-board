import {useDispatch} from "react-redux";
import {AppDispatch} from "../types/storeTypes";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;