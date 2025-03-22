import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/fournisseur.css";

const Fournisseur = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFournisseur, setNewFournisseur] = useState({
    nom: "",
    email: "",
    telephone: "",
  });
  const [editingFournisseur, setEditingFournisseur] = useState(null);

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await fetch(
          "https://mern-gestion-de-stock-production.up.railway.app/fournisseur"
        );
        if (!response.ok) throw new Error("Failed to fetch fournisseurs");
        const data = await response.json();
        setFournisseurs(data);
      } catch (error) {
        console.error("Error fetching fournisseurs:", error);
      }
    };
    fetchFournisseurs();
  }, []);

  const handleAddFournisseur = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mern-gestion-de-stock-production.up.railway.app/fournisseur",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFournisseur),
        }
      );
      if (!response.ok) throw new Error("Failed to add fournisseur");
      const savedFournisseur = await response.json();
      setFournisseurs([...fournisseurs, savedFournisseur]);
      setNewFournisseur({ nom: "", email: "", telephone: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding fournisseur:", error);
    }
  };

  const handleUpdateFournisseur = async () => {
    try {
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/fournisseur/${editingFournisseur.id_fournisseur}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingFournisseur),
        }
      );
      if (!response.ok) throw new Error("Failed to update fournisseur");
      const updatedFournisseur = await response.json();
      setFournisseurs(
        fournisseurs.map((fr) =>
          fr.id_fournisseur === updatedFournisseur.id_fournisseur
            ? updatedFournisseur
            : fr
        )
      );
      setEditingFournisseur(null);
    } catch (error) {
      console.error("Error updating fournisseur:", error);
    }
  };

  const handleDeleteFournisseur = async (id) => {
    try {
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/fournisseur/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete fournisseur");
      setFournisseurs(fournisseurs.filter((fr) => fr.id_fournisseur !== id));
    } catch (error) {
      console.error("Error deleting fournisseur:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="Fournisseur-content" style={{ marginLeft: "20px" }}>
        <h2>Fournisseurs</h2>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="ajouterFour">
            Ajouter
          </button>

          {isModalOpen && (
            <div className="modalf">
              <div className="modal-contentFat">
                <span
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </span>
                <form onSubmit={handleAddFournisseur}>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={newFournisseur.nom}
                    onChange={(e) =>
                      setNewFournisseur({
                        ...newFournisseur,
                        nom: e.target.value,
                      })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newFournisseur.email}
                    onChange={(e) =>
                      setNewFournisseur({
                        ...newFournisseur,
                        email: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Téléphone"
                    value={newFournisseur.telephone}
                    onChange={(e) =>
                      setNewFournisseur({
                        ...newFournisseur,
                        telephone: e.target.value,
                      })
                    }
                  />
                  <button type="submit">Ajouter Fournisseur</button>
                </form>
              </div>
            </div>
          )}

          {/* Fournisseurs List */}
          <div className="fournisseurs">
            {fournisseurs.map((fr) => (
              <div key={fr.id_fournisseur} className="CardF">
                <h3 title={fr.nom}>{fr.nom}</h3>
                <p>Email: {fr.email}</p>
                <p>Téléphone: {fr.telephone}</p>
                <button
                  className="buttonAR Del"
                  onClick={() => handleDeleteFournisseur(fr.id_fournisseur)}
                >
                  Supprimer
                </button>
                <button
                  className="buttonAR Ed"
                  style={{ backgroundColor: "#ffce3b" }}
                  onClick={() => setEditingFournisseur({ ...fr })}
                >
                  Modifier
                </button>
              </div>
            ))}

            {/* Edit Fournisseur Form */}
            {editingFournisseur && (
              <div className="editP">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateFournisseur();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nom"
                    value={editingFournisseur.nom}
                    onChange={(e) =>
                      setEditingFournisseur({
                        ...editingFournisseur,
                        nom: e.target.value,
                      })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editingFournisseur.email}
                    onChange={(e) =>
                      setEditingFournisseur({
                        ...editingFournisseur,
                        email: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Téléphone"
                    value={editingFournisseur.telephone}
                    onChange={(e) =>
                      setEditingFournisseur({
                        ...editingFournisseur,
                        telephone: e.target.value,
                      })
                    }
                  />
                  <button type="submit">Mettre à jour</button>
                  <button
                    onClick={() => setEditingFournisseur(null)}
                    type="button"
                  >
                    Annuler
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fournisseur;
