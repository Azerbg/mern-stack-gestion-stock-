import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Commandes.css";

const Commandes = () => {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [articles, setArticles] = useState([]);
  const [newCommande, setNewCommande] = useState({
    id_article: "",
    quantite: "",
    id_fournisseur: "",
    statut: "",
    date_commande: "",
  });
  const [commandes, setCommandes] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [articleNames, setArticleNames] = useState({});
  const [fournisseurNames, setFournisseurNames] = useState({});
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://mern-gestion-de-stock-production.up.railway.app/articles"
        );
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
        const names = {};
        data.forEach((article) => {
          names[article.id_article] = article.nom;
        });
        setArticleNames(names);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setErrorMessage("Failed to load articles.");
      }
    };

    const fetchCommandes = async () => {
      try {
        const response = await fetch(
          "https://mern-gestion-de-stock-production.up.railway.app/commandes"
        );
        if (!response.ok) throw new Error("Failed to fetch commandes");
        const data = await response.json();
        setCommandes(data);
      } catch (error) {
        console.error("Error fetching commandes:", error);
        setErrorMessage("Failed to load commandes.");
      }
    };

    const fetchFournisseurs = async () => {
      try {
        const response = await fetch(
          "https://mern-gestion-de-stock-production.up.railway.app/fournisseur"
        );
        if (!response.ok) throw new Error("Failed to fetch fournisseurs");
        const data = await response.json();
        setFournisseurs(data);
        const names = {};
        data.forEach((fournisseur) => {
          names[fournisseur.id_fournisseur] = fournisseur.nom;
        });
        setFournisseurNames(names);
      } catch (error) {
        console.error("Error fetching fournisseurs:", error);
        setErrorMessage("Failed to load fournisseurs.");
      }
    };

    fetchCommandes();
    fetchArticles();
    fetchFournisseurs();
  }, []);

  const handleDeleteCommande = async (id) => {
    try {
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/commandes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete commande");
      setCommandes(commandes.filter((commande) => commande.id_commande !== id));
    } catch (error) {
      console.error("Error deleting commande:", error);
      setErrorMessage("Failed to delete commande.");
    }
  };

  const handleAddCommande = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mern-gestion-de-stock-production.up.railway.app/commandes/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCommande),
        }
      );
      if (!response.ok) throw new Error("Failed to add commande");
      const savedCommande = await response.json();
      setCommandes([...commandes, savedCommande]);
      setNewCommande({
        id_article: "",
        quantite: "",
        id_fournisseur: "",
        statut: "",
        date_commande: "",
      });
      setIsModalOpen2(false);
    } catch (error) {
      console.error("Error adding commande:", error);
      setErrorMessage("Failed to add commande.");
    }
  };

  const addquantity = async (q, id_article) => {
    try {
      const oldqResponse = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/articles/${id_article}`
      );
      if (!oldqResponse.ok) throw new Error("Failed to fetch article details");

      const oldq = await oldqResponse.json();

      const newQuantity = oldq.quantite + q;

      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/articles/${id_article}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantite: newQuantity }),
        }
      );

      if (!response.ok) throw new Error("Failed to update article quantity");

      console.log("Article quantity updated successfully");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const validateStatus = async (id, statut, quantite, id_article) => {
    try {
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/commandes/${id}/statut`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statut }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to validate status");
      }

      const updatedCommande = await response.json();
      setCommandes(
        commandes.map((commande) =>
          commande.id_commande === id
            ? { ...commande, statut: updatedCommande.message }
            : commande
        )
      );

      addquantity(quantite, id_article);
    } catch (error) {
      console.error("Error validating status:", error);
      setErrorMessage("Failed to update status.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="Commande-content" style={{ marginLeft: "20px" }}>
        <h2>Commandes</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          
          <button onClick={() => setIsModalOpen2(true)} className="ajouterCom">
            Ajouter
          </button>
          {isModalOpen2 && (
            <div className="modalCom">
              <div className="modal-contentCom">
                <span
                  className="close-btn"
                  onClick={() => setIsModalOpen2(false)}
                >
                  &times;
                </span>
                <form
                  onSubmit={handleAddCommande}
                  style={{ paddingTop: "60px" }}
                >
                  <select
                    style={{ height: "40px" }}
                    value={newCommande.id_article}
                    onChange={(e) =>
                      setNewCommande({
                        ...newCommande,
                        id_article: e.target.value,
                      })
                    }
                  >
                    <option value="">Sélectionnez un article</option>
                    {articles.map((article) => (
                      <option
                        key={article.id_article}
                        value={article.id_article}
                      >
                        {article.nom}
                      </option>
                    ))}
                  </select>

                  <select
                    style={{ height: "40px" }}
                    value={newCommande.id_fournisseur}
                    onChange={(e) =>
                      setNewCommande({
                        ...newCommande,
                        id_fournisseur: e.target.value,
                      })
                    }
                  >
                    <option value="">Sélectionnez un fournisseur</option>
                    {fournisseurs.map((fournisseur) => (
                      <option
                        key={fournisseur.id_fournisseur}
                        value={fournisseur.id_fournisseur}
                      >
                        {fournisseur.nom}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Quantité"
                    value={newCommande.quantite}
                    onChange={(e) =>
                      setNewCommande({
                        ...newCommande,
                        quantite: e.target.value,
                      })
                    }
                  />

                  <button type="submit">Ajouter Commande</button>
                </form>
              </div>
            </div>
          )}
          <div className="commandes">
            <div>
              <table className="commande-table">
                <thead>
                  <tr>
                    <th>id_commande</th>
                    <th>nom article</th>
                    <th>nom fournisseur</th>
                    <th>Quantité</th>
                    <th>Date de Commande</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {commandes
                    .filter((commande) => commande.statut === "non")
                    .map((commande) => (
                      <tr key={commande.id_commande}>
                        <td>{commande.id_commande}</td>
                        <td>{articleNames[commande.id_article]}</td>
                        <td>{fournisseurNames[commande.id_fournisseur]}</td>
                        <td>{commande.quantite}</td>
                        <td>
                          {new Date(
                            commande.date_commande
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          {commande.statut === "non" ? (
                            <>
                              <div>
                                <button
                                  className="validate-button"
                                  onClick={() => {
                                    validateStatus(
                                      commande.id_commande,
                                      "arrive",
                                      commande.quantite,
                                      commande.id_article
                                    );
                                  }}
                                >
                                  Valider
                                </button>
                                <button
                                  className="delete-button"
                                  onClick={() =>
                                    handleDeleteCommande(commande.id_commande)
                                  }
                                >
                                  Supprimer
                                </button>
                              </div>
                            </>
                          ) : (
                            <span>{commande.statut}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commandes;
