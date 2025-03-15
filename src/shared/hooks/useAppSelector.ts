import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../types/storeTypes";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;