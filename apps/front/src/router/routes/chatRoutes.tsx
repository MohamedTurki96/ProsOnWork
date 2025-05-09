import { RouteObject } from "react-router-dom";

import { UserRole } from "../../api";
import { Chat } from "../../pages/chat";
import { PublicLayout } from "../../pages/layout/public";
import Granted from "../components/Granted";

import { Routes } from "./routes";

export const chatRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <Granted roles={[UserRole.Client, UserRole.ServiceProvider, UserRole.Admin]}>
        <PublicLayout noFooter />
      </Granted>
    ),
    children: [
      { path: Routes.chat, element: <Chat /> },
    ],
  },
];