import React from "react";
import PageLable from "../../ui/PageLable";
import ModeratorUsersTable from "../../templates/moderator/users/ModeratorUsersTable";

function ModeratorUsers() {
  return (
    <div className="space-y-10">
      <PageLable lable="مدیریت کاربران" />
      <ModeratorUsersTable/> 
    </div>
  );
}

export default ModeratorUsers;
