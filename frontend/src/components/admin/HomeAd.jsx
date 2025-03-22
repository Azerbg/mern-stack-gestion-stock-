import React, { useEffect, useState } from "react";
import SideAd from "./SideAd";
import "../../styles/Adhome.css";

const HomeAd = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://mern-gestion-de-stock-production.up.railway.app/users"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(
          data.filter(
            (user) => user.status === "approved" && user.name !== "admin"
          )
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/deleteuser/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete user");

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Nom,Email,Téléphone"].join(",") +
      "\n" +
      users
        .map((user) => `${user.name},${user.email},${user.phone_number}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[sortOption].localeCompare(b[sortOption]));

  return (
    <div style={{ display: "flex" }}>
      <SideAd />
      <div className="Users-content" style={{ marginLeft: "20px" }}>
        <h2>Utilisateurs approuvés</h2>

        {/* Recherche et Tri */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <select
            onChange={handleSortChange}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="name">Trier par Nom</option>
            <option value="email">Trier par Email</option>
          </select>
          <button
            onClick={exportToCSV}
            style={{
              padding: "8px 12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            📥 Export
          </button>
        </div>

        {/* Liste des utilisateurs */}
        <div className="Users space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="UserCard p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-all duration-300"
              >
                <p
                  title={user.name}
                  className="truncate-text text-sm font-semibold text-gray-800"
                >
                  <strong>Nom:</strong> {user.name}
                </p>
                <p
                  title={user.email}
                  className="truncate-text text-sm text-gray-600"
                >
                  <strong>Email:</strong> {user.email}
                </p>
                <p
                  title={user.phone_number}
                  className="truncate-text text-sm text-gray-600"
                >
                  <strong>Tel:</strong> {user.phone_number}
                </p>
                <button
                  className="buttonAR bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-500 focus:outline-none"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  ❌ Supprimer
                </button>
              </div>
            ))
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeAd;
