import React, { useState, useEffect } from "react";
import "./Admin.css";

import PendingUserContainer from "../../shared/components/PendingUserContainer/PendingUserContainer";
import UserListContainer from "../../shared/components/UserListContainer/UserListContainer";

import { getPendings } from "../../services/api";
import { verifyAdminToken } from "../../shared/utils/authFunctions";

export default function Admin() {
  const [pendingList, setPendingList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const changePending = (value) => {
    setPendingList(value);
    setIsReady(true);
  };

  const refresh = async () => {
    return await getPendings("/api/admin/get-all").then((response) => {
      changePending(response);
    });
  };

  useEffect(() => {
    verifyAdminToken();

    async function queryPendingUsers() {
      const userData = JSON.parse(localStorage.getItem("userData"));

      const payload = {
        token: userData.token,
      };

      return await getPendings("/api/admin/get-all");
    }

    queryPendingUsers().then((response) => {
      changePending(response);
    });
  }, []);

  return (
    <>
      <section className="admin-section">
        <p>Demandes d'inscription en attente:</p>
        <div className="pending-list-container">
          {isReady && pendingList.length >= 1 ? (
            pendingList.map((element) => (
              <PendingUserContainer
                key={element.username}
                username={element.username}
                email={element.email}
                refresh={() => refresh()}
              />
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
        <p>Liste des utilisateurs:</p>
        <UserListContainer />
      </section>
    </>
  );
}

// params {users} array , params {pendingList} array
