import { RouteItemDef } from "../../../types/routes.types";
import { AuthPathsEnum } from "../constants/auth.paths";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";


export const SIGN_IN_SCREEN: RouteItemDef = {
  id: "auth",
  path: AuthPathsEnum.SIGN_IN,
  element: LoginScreen,
  isAuthRoute: true,
};

export const REGISTER_IN_SCREEN: RouteItemDef = {
  id: "auth",
  path: AuthPathsEnum.REGISTER,
  element: RegisterScreen,
  isAuthRoute: true,
};

const AUTH_ROUTES = [SIGN_IN_SCREEN, REGISTER_IN_SCREEN];

export default AUTH_ROUTES;
