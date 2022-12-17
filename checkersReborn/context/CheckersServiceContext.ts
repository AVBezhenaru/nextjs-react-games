import { createContext } from "react";
import CheckersService from "../services/CheckersService";

const CheckersServiceContext = createContext(new CheckersService());

export default CheckersServiceContext;
