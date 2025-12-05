import React, { useEffect, useState } from 'react'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:1911/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setWishlist(data.wishlist);
  };

  fetchWishlist();
}, []);
  return (
   <>
   {wishlist.map((course) => (
     <div key={course.id}>
       <h3>{course.title}</h3>
     </div>
   ))}
   </>
  )
}

export default Wishlist