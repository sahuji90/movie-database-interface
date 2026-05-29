import React, {useState} from "react";
import './BollywoodMovies.css';

const bollywoodMovies = [
    {
        id: 1,
        title: "Bade Miya Chote Miya 2",
        rating: 8.9,
        genre: "Action",
        year: 2025,
        director: "Bala",
        image:"",
        cast: ["Akshay Kumar", "Tiger Shroff"]
    },
    {
        id: 2,
        title: "Silent Shadows",
        rating: 7.5,
        genre: "Thriller",
        year: 2023,
        director: "Anurag Kashyap",
        cast: ["Nawazuddin Siddiqui", "Radhika Apte"]
    },
    {
        id: 3,
        title: "Dreamscape",
        rating: 9.1,
        genre: "Sci-Fi",
        year: 2024,
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Florence Pugh"]
    },
    {
        id: 4,
        title: "The Last Melody",
        rating: 8.2,
        genre: "Drama",
        year: 2022,
        director: "Zoya Akhtar",
        cast: ["Alia Bhatt", "Ranveer Singh"]
    },
    {
        id: 5,
        title: "Crimson Tide",
        rating: 7.8,
        genre: "Adventure",
        year: 2021,
        director: "James Cameron",
        cast: ["Sam Worthington", "Zoe Saldana"]
    },
    {
        id: 6,
        title: "Chennai Express 2",
        rating: 7.8,
        genre: "Comedy",
        year: 2025,
        director: "ROhit shetty",
        cast: ["Shahrukh Khan", "Deepika Padukone"]
    }
];

function BollywoodMovies(){
    //state for loading indicator
    const [loading,setLoading] = useState(false);
    //state for genre filtering
    const[selectedGenre, setSelectedGenre] = useState('All');
    //state for movies
    const[movies,setMovies] = useState(bollywoodMovies);
    const[searchTerm,setSearchTerm] = useState('');
    const[sortBy, setSortBy] = useState('title');

    const getRatingCategory=(rating) => {
        if(rating >= 9.0) return 'blockbuster';
        if(rating >= 8.5) return 'superhit';
        if(rating>=7.5) return 'hit';
        return 'average';
    }
    //{ condition && <Component/>}
    //condition ? valueIfTrue : valueIfFalse
    return (
        <div className="bollywood-movies">
            <h1>Bollywood Hits</h1>
            {loading ? (
                <div className="loading-spinner">
                    <p>Loading Bollywood Movies ...</p>
                </div>
            ):(
                <div className="main-content">
                    <div className="movies-grid">
                        {movies.map((movie)=> (
                            <div className={`movie-card ${getRatingCategory(movie.rating)}`} key={movie.id}>
                                <img src={movie.image}
                                alt={`{movie.title} poster`}
                                className="movie-image" />
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-year">{movie.year}</p>
                                <p className="movie-genre">{movie.genre}</p>
                                <p className="movie-director">{movie.director}</p>
                                <p className="movie-cast">Cast : {movie.cast.join(', ')}</p>
                                <div className={`movie-rating ${getRatingCategory(movie.rating)}`}>{movie.rating}/10</div>        
                            </div>
                        ))}
                        </div>
                </div>
            )}
            {/* <button onClick={()=> setLoading(!loading)}>
                {loading ? 'Stop Loading' : 'Start Loading'}
            </button> */}

        </div>
    );
}

export default BollywoodMovies;