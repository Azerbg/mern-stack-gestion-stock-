import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/home.css";

// Reusable API Fetch Hook
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const Home = () => {
  const [newArticle, setNewArticle] = useState({
    nom: "",
    id_categorie: "",
    quantite: "",
    seuil_critique: "",
    prix: "",
    imagebase64: "",
  });
  const [editingArticle, setEditingArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useFetchData(
    "https://mern-gestion-de-stock-production.up.railway.app/articles"
  );
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchData(
    "https://mern-gestion-de-stock-production.up.railway.app/categories"
  );

  // Handle Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewArticle((prev) => ({
          ...prev,
          imagebase64: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Article
  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mern-gestion-de-stock-production.up.railway.app/articles",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newArticle),
        }
      );
      if (!response.ok) throw new Error("Failed to add article");
      const savedArticle = await response.json();
      setNewArticle({
        nom: "",
        id_categorie: "",
        quantite: "",
        seuil_critique: "",
        prix: "",
        imagebase64: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id) => {
    try {
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/articles/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete article");
      articles((prev) =>
        prev.filter((article) => article.id_article !== id)
      );
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Update Article
  const handleUpdateArticle = async () => {
    try {
      const newQuantity =
        editingArticle.quantite_originale - Number(editingArticle.quantite);
      if (newQuantity < 0) {
        alert("La quantité ne peut pas être inférieure à zéro.");
        return;
      }
      const response = await fetch(
        `https://mern-gestion-de-stock-production.up.railway.app/articles/${editingArticle.id_article}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantite: newQuantity }),
        }
      );

      if (!response.ok) throw new Error("Failed to update article");

      const updatedArticle = await response.json();
      articles((prev) =>
        prev.map((article) =>
          article.id_article === updatedArticle.id_article
            ? updatedArticle
            : article
        )
      );
      setEditingArticle(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="home-content" style={{ marginLeft: "20px" }}>
        <div className="Ban">Articles</div>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="ajouter">
            Ajouter
          </button>

          {isModalOpen && (
            <div className="modalA">
              <div className="modal-contentA">
                <span
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </span>
                <form onSubmit={handleAddArticle}>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={newArticle.nom}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, nom: e.target.value })
                    }
                  />
                  <select
                    style={{ height: "40px" }}
                    value={newArticle.id_categorie}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        id_categorie: Number(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.id_categorie}
                        value={category.id_categorie}
                      >
                        {category.nom}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Quantité"
                    value={newArticle.quantite}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, quantite: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Seuil Critique"
                    value={newArticle.seuil_critique}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        seuil_critique: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Prix"
                    value={newArticle.prix}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, prix: e.target.value })
                    }
                  />
                  <input type="file" onChange={handleImageChange} />
                  <button type="submit">Ajouter Article</button>
                </form>
              </div>
            </div>
          )}

          {articlesLoading ? (
            <p>Loading...</p>
          ) : articlesError ? (
            <p>{articlesError}</p>
          ) : (
            <div className="Articlez">
              {articles.map((article) => (
                <div key={article.id_article} className="Card">
                  <img
                    src={`data:image/jpeg;base64,${article.imagebase64}`}
                    alt={article.nom}
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                  <h3 title={article.nom}>{article.nom}</h3>
                  <p>Quantité : {article.quantite}</p>
                  <p>Prix : {article.prix} $ </p>
                  <button
                    className="buttonAR Del"
                    onClick={() => handleDeleteArticle(article.id_article)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="buttonAR Ed"
                    style={{ backgroundColor: "#ffce3b" }}
                    onClick={() =>
                      setEditingArticle({
                        ...article,
                        quantite_originale: article.quantite,
                      })
                    }
                  >
                    Modifier
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {editingArticle && (
          <div className="editP">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateArticle();
              }}
            >
              <input
                type="text"
                placeholder="Quantité à soustraire"
                value={editingArticle.quantite}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    quantite: e.target.value,
                  })
                }
              />
              <button type="submit">Update Article quantity</button>
              <button onClick={() => setEditingArticle(null)} type="button">
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
