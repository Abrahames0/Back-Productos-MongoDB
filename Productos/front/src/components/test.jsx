import { useState } from "react";
import { useFetch } from "../useFetch";

export function Test() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [postId, setPostId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch("https://reqres.in/api/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => setPostId(data.id));
  };

  return (
    <div className="App">
      <header className="App-header">
        {error && <li> Error: {error} </li>}
        {loading && <li>Loading...</li>}
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
        {postId && <p>Post ID: {postId}</p>}
      </header>
    </div>
  );
}
