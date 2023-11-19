//import React from "react";
import GroupCard from "../../components/GroupCard";
import ExploreGroupNavBanner from "../../components/ExploreGroupNavBanner";
// import "../../styles/exploreGroups.css";
import ExploreGroupHeader from "../../components/ExploreGroupHeader";
import { useState } from "react";
import JoinGroupModal from "../../components/JoinGroupModal";

//type Props = {}

const ExploreGroups = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="">
      <ExploreGroupNavBanner />
      <ExploreGroupHeader />
      <GroupCard setShowModal={setShowModal} />
      <JoinGroupModal visible={showModal} onClose={handleShow} />
    </div>
  );
};

export default ExploreGroups;
