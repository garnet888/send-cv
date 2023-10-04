import { RiGroupFill, RiFileTextLine, RiBankFill } from "react-icons/ri";
import Users from "./pages/Users/Users";
import ReceivedCVs from "./pages/ReceivedCVs/ReceivedCVs";
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
    title: "Ирсэн анкетууд",
    path: "/received-cvs",
    component: <ReceivedCVs />,
  },
  {
    icon: <RiBankFill />,
    title: "Ажлын байрнууд",
    path: "/works",
    component: <Works />,
  },
];

export default ROUTES;
