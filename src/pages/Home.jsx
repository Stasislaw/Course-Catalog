import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { he } from "zod/locales";
import { useForm } from "react-hook-form";
import styles from './Home.module.css';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function Home() {

  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  const { register, watch } = useForm({
    defaultValues: {
      search: ""
    }
  });
  const search = watch("search");
  const debouncedSearch = useDebounce(search, 300);


  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      });
    }, []);
  useEffect(() => {
    if(debouncedSearch){
      const encodedSearch = encodeURIComponent(debouncedSearch);
      fetch(`http://localhost:3001/courses?q=${encodedSearch}&_page=1&_limit=12`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
      });
    }else{
      setCourses([]);
    }
  }, [debouncedSearch]);
    
    return (
    <>
      <h1 className={styles.Home}>Home</h1>
      {/* Search bar */}
      <form>
        <input className={styles.Search} type="text" placeholder="Search courses" {...register("search")}/>
      </form>
      {/* Search results */}
      <div>
        {courses.length === 0 ? (
          "Nothing to search"
        ) : (
          <ul>
            {courses.map(course => (
              <li key={course.id}>
                <Link to={`courseDetails?courseId=${course.id}`}>
                  <img src={course.thumbnail} alt={course.slug}
                  style={{
                    width: 20,
                    height: 20
                  }}
                  />
                  <h3>{course.title}</h3>
                  {course.shortDesc}<br/>
                  Rating: {course.rating}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Categories */}
      <div>
        <h2 className={styles.RC}>Reccomended categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id} style={{borderColor: category.color, backgroundColor: category.color+"aa",}} className={styles.RecCatCard}>
              <Link to={`courses?category=${category.slug}`} className={styles.RCLink}>
                <img src={"/img/" + category.icon + ".png"} alt={category.icon}
                // style={{
                //   width: 20,
                //   height: 20
                // }}
                className={styles.RCimg}
                />
                <h3 className={styles.RCh3}>{category.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}