import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../types/storeTypes.ts";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;