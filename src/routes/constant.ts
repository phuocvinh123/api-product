import DefaultLayout from 'layouts/defaultlayout/DefaultLayout';
import { SignIn } from 'modules/Auth/SignIn/Loadable';
import { SignUp } from 'modules/Auth/SignUp/Loadable';
import { ChatPage } from 'modules/ChatPage/Loadable';
import { HomePage } from 'modules/HomePage/Loadable';

export const RoutesName = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  CHAT: '/chat',
};

export const PUBLIC_ROUTES = [
  {
    path: RoutesName.REGISTER,
    component: SignUp,
    layout: DefaultLayout,
    exact: true,
  },
  {
    path: RoutesName.LOGIN,
    component: SignIn,
    layout: DefaultLayout,
    exact: true,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: RoutesName.HOME,
    component: HomePage,
    layout: DefaultLayout,
    exact: true,
  },
  {
    path: RoutesName.CHAT,
    component: ChatPage,
    layout: DefaultLayout,
    exact: true,
  },
];

export const CUSTOME_ROUTE = [];

export default RoutesName;
