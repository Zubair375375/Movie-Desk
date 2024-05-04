import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movie, setMovieName] = useState("");
  const [review, setMovieReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [updateReview, setUpdateReview] = useState("");

  function submitHandle(e) {
    if (movie && review) {
      e.preventDefault();

      axios.post("http://localhost:3001/api/insert", {
        movieName: movie,
        movieReview: review,
      });

      setMovieName("");
      setMovieReview("");
      setMovieList([...movieList, { movieName: movie, movieReview: review }]);
    }
  }
  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((Response) => {
      setMovieList(Response.data);
      console.log(movieList);
      console.log(Response.data);
    });
  }, []);

  function deleteReview(movie, review) {
    axios
      .delete(`http://localhost:3001/api/delete/${movie}/${review}`, {
        movieName: movie,
        movieReview: review,
      })
      .then((response) => {
        console.log("deleted successfully", response.data);
      })
      .catch((error) => {
        console.log("Error deleting", error);
      });
  }

  function updateReviewFunc(movie) {
    axios
      .put("http://localhost:3001/api/update", {
        movieName: movie,
        movieReview: updateReview,
      })
      .then(() => {
        setUpdateReview("");
      });
  }
  return (
    <div className="App">
      <form
        action="form.php"
        onSubmit={(e) => {
          e.preventDefault();
          setMovieName("");
          setMovieReview("");
        }}
      >
        <h1 className="app-title">Movie Desk</h1>
        <div className="searches">
          <input
            type="text"
            name="movieName"
            placeholder="Movie name"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
          <input
            type="text"
            name="review"
            placeholder="Review"
            onChange={(e) => {
              setMovieReview(e.target.value);
            }}
          />

          <button className="btn-style" type="submit" onClick={submitHandle}>
            Submit
          </button>
        </div>
      </form>
      <div className="whole">
        {movieList.map((val, index) => {
          return (
            <div className="card" key={index}>
              <img />
              <h1 className="movie-title">Movie Name: {val.movienames}</h1>
              <p className="movie-para">Movie review: {val.moviereviews}</p>
              <div className="baseline-div">
                <button
                  className="btn-style3"
                  onClick={() => {
                    deleteReview(val.movienames, val.moviereviews);
                    console.log(
                      val.movienames + " and " + val.moviereviews + " deleted"
                    );
                  }}
                >
                  Delete
                </button>
                <input
                  type="text"
                  name="updateReview"
                  className="update-review"
                  onChange={(e) => {
                    setUpdateReview(e.target.value);
                  }}
                />
                <button
                  className="btn-style2"
                  onClick={() => {
                    updateReviewFunc(val.movienames);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
