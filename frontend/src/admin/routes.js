import { RiGroupFill, RiFileTextLine, RiBankFill } from "react-icons/ri";
import Users from "./pages/Users/Users";
import CVs from "./pages/CVs/CVs";
import Works from "./pages/Works/Works";

const ROUTES = [
  {
    icon: <RiGroupFill />,
    title: "Хэрэглэгчид",
    path: "/users",
    component: <Users />,
  },
  {
    icon: <RiFileTextLine />,
    title: "Анкетууд",
    path: "/cvs",
    component: <CVs />,
  },
  {
    icon: <RiBankFill />,
    title: "Ажлын байрнууд",
    path: "/works",
    component: <Works />,
  },
];

export default ROUTES;
