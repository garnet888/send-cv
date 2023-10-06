import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Axios from "../../Axios";
import Popup from "../../utils/Popup/Popup";
import PlanningJob from "../../components/Profile/PlanningJob/PlanningJob";
import Education from "../../components/Profile/Education/Education";
import JobHistory from "../../components/Profile/JobHistory/JobHistory";
import JobSkill from "../../components/Profile/UserSkills/JobSkill/JobSkill";
import SubSkill from "../../components/Profile/UserSkills/SubSkill/SubSkill";

const MyCV = () => {
  const { authConfig } = useAuthContext();

  const [myID, setMyID] = useState("");
  const [visibleSysErr, setVisibleSysErr] = useState(false);

  useEffect(() => {
    Axios.get("/auth/me", authConfig)
      .then((res) => {
        if (res.data) {
          setMyID(res.data.id);
        } else {
          setVisibleSysErr(true);
        }
      })
      .catch(() => setVisibleSysErr(true));
  }, [authConfig]);

  return (
    <div className="myCV">
      <Popup
        messageType="sys_error"
        visible={visibleSysErr}
        onOk={() => window.location.reload()}
      />

      <h3 className="myCV__title">Миний анкет</h3>

      <PlanningJob userID={myID} />
      <Education userID={myID} />
      <JobHistory userID={myID} />
      <JobSkill userID={myID} />
      <SubSkill userID={myID} />
    </div>
  );
};

export default MyCV;
