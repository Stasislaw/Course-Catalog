import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { he } from "zod/locales";

export default function Home() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
  }, []);

  return (
    <>
      <h1>Home</h1>
      {/* //pasek wyszukiwania */}
      <div>
        <h2>Reccomended categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id} style={{backgroundColor: category.color, color: "black"}}>
              <Link to={`courses?category=${category.slug}`}>
                <img src={"/img/" + category.icon + ".png"} alt={category.icon}
                style={{
                  width: 20,
                  height: 20
                }}
                />
                <h3>{category.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}