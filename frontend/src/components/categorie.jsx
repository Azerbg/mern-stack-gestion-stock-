import React, { useState, useEffect } from 'react';
import "../styles/categorie.css";
import Sidebar from './Sidebar';

const Categorie = () => {
  const [categories, setCategories] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ nom: "" });
  const [editingCat, setEditingCat] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://mern-gestion-de-stock-production.up.railway.app/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeletecat = async (id) => {
    try {
      const response = await fetch(`https://mern-gestion-de-stock-production.up.railway.app/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      setCategories(categories.filter((cat) => cat.id_categorie !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddCategorie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mern-gestion-de-stock-production.up.railway.app/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCat),
      });
      if (!response.ok) throw new Error("Failed to add category");
      const savedCat = await response.json();
      setCategories([...categories, savedCat]);
      setNewCat({ nom: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCat = async () => {
    try {
      const response = await fetch(`https://mern-gestion-de-stock-production.up.railway.app/categories/${editingCat.id_categorie}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCat),
      });
      if (!response.ok) throw new Error("Failed to update category");
      const updatedCat = await response.json();
      setCategories(categories.map((cat) => (cat.id_categorie === updatedCat.id_categorie ? updatedCat : cat)));
      setEditingCat(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="categorie-container">
      <Sidebar />
      <div className="categorie-content">
        <h2>Categories</h2>
        <button onClick={() => setIsModalOpen(true)} className="add-category-btn">Add Category</button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
              <form onSubmit={handleAddCategorie}>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCat.nom}
                  onChange={(e) => setNewCat({ ...newCat, nom: e.target.value })}
                />
                <button type="submit" className="submit-btn">Add Category</button>
              </form>
            </div>
          </div>
        )}

        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id_categorie} className="category-card">
              <h3>{cat.nom}</h3>
              <button className="delete-btn" onClick={() => handleDeletecat(cat.id_categorie)}>Delete</button>
              <button className="edit-btn" onClick={() => setEditingCat({ ...cat })}>Edit</button>
            </div>
          ))}

          {editingCat && (
            <div className="edit-category-form">
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateCat(); }}>
                <input
                  type="text"
                  value={editingCat.nom}
                  onChange={(e) => setEditingCat({ ...editingCat, nom: e.target.value })}
                  placeholder="Edit Category Name"
                />
                <button type="submit" className="submit-btn">Update Category</button>
                <button onClick={() => setEditingCat(null)} type="button" className="cancel-btn">Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categorie;
