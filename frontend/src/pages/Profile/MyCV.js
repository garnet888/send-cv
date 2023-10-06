import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Axios from "../../Axios";
import Popup from "../../utils/Popup/Popup";
import PlanningJob from "../../components/Profile/PlanningJob/PlanningJob";
import Education from "../../components/Profile/Education/Education";
import JobHistory from "../../components/Profile/JobHistory/JobHistory";
import JobSkill from "../../components/Profile/UserSkills/JobSkill/JobSkill";
import SubSkill from "../../components/Profile/UserSkills/SubSkill/SubSkill";

const MyCV = ({ onAdmin = false, userID }) => {
  const { authConfig } = useAuthContext();

  const [myID, setMyID] = useState("");
  const [visibleSysErr, setVisibleSysErr] = useState(false);

  useEffect(() => {
    if (onAdmin) {
      setMyID(userID);
    } else {
      Axios.get("/auth/me", authConfig)
        .then((res) => {
          if (res.data) {
            setMyID(res.data.id);
          } else {
            setVisibleSysErr(true);
          }
        })
        .catch(() => setVisibleSysErr(true));
    }
  }, [onAdmin, userID, authConfig]);

  return (
    <div className="myCV">
      <Popup
        messageType="sys_error"
        visible={visibleSysErr}
        onOk={() => window.location.reload()}
      />

      <h3 className="myCV__title">
        {onAdmin ? "Хэрэглэгчийн" : "Миний"} анкет
      </h3>

      <PlanningJob onAdmin={onAdmin} userID={myID} />
      <Education onAdmin={onAdmin} userID={myID} />
      <JobHistory onAdmin={onAdmin} userID={myID} />
      <JobSkill onAdmin={onAdmin} userID={myID} />
      <SubSkill onAdmin={onAdmin} userID={myID} />
    </div>
  );
};

export default MyCV;
