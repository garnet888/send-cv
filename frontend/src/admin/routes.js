import { RiGroupFill, RiFileTextLine, RiBankFill } from "react-icons/ri";
import Users from "./pages/Users/Users";
import ReceivedCVs from "./pages/ReceivedCVs/ReceivedCVs";
import Jobs from "./pages/Jobs/Jobs";

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
    path: "/jobs",
    component: <Jobs />,
  },
];

export default ROUTES;
