import React from "react";
import PlanningJob from "../../components/Profile/PlanningJob/PlanningJob";
import Education from "../../components/Profile/Education/Education";
import JobHistory from "../../components/Profile/JobHistory/JobHistory";
import JobSkill from "../../components/Profile/JobSkill/JobSkill";
import SubSkill from "../../components/Profile/SubSkill/SubSkill";

const MyCV = () => {
  return (
    <div className="myCV">
      <h3 className="myCV__title">Миний анкет</h3>

      <PlanningJob />
      <Education />
      <JobHistory />
      <JobSkill />
      <SubSkill />
    </div>
  );
};

export default MyCV;
