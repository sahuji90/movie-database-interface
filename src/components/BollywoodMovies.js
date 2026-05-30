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
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnRk7TswsZzN8F4__fNP9waBRCp8Jg7RclSX3VGU46K_TsVgcmfn4AMOCAGZDMPlR9i9sfIw&s=10",
        cast: ["Akshay Kumar", "Tiger Shroff"]
    },
    {
        id: 2,
        title: "Silent Shadows",
        rating: 7.5,
        genre: "Thriller",
        year: 2023,
        director: "Anurag Kashyap",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP7ULS-9bVtW6K5PYCGU4BZrw41oDwFhdR3A&s",
        cast: ["Nawazuddin Siddiqui", "Radhika Apte"]
    },
    {
        id: 3,
        title: "Dreamscape",
        rating: 9.1,
        genre: "Sci-Fi",
        year: 2024,
        director: "Christopher Nolan",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2UoHkUEY0597xiQH9OnwCq7E_VNNGlpgxgg&s",
        cast: ["Cillian Murphy", "Florence Pugh"]
    },
    {
        id: 4,
        title: "The Last Melody",
        rating: 8.2,
        genre: "Drama",
        year: 2022,
        director: "Zoya Akhtar",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4qLzj5Qrhvex34wPxYsR-4uKZzu266Yk1A&s",
        cast: ["Alia Bhatt", "Ranveer Singh"]
    },
    {
        id: 5,
        title: "Crimson Tide",
        rating: 7.8,
        genre: "Adventure",
        year: 2021,
        director: "James Cameron",
        image:"https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p16733_p_v8_aj.jpg",
        cast: ["Sam Worthington", "Zoe Saldana"]
    },
    {
        id: 6,
        title: "Chennai Express 2",
        rating: 7.2,
        genre: "Comedy",
        year: 2025,
        director: "ROhit shetty",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqABCovQnniAtXffPqtaUPRsvVG9kl9yYHZz-ocLCzA&s",
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
    };

    const filteredMovies = movies.filter(movie => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = movie.title.toLowerCase().includes(searchLower) || 
        movie.genre.toLowerCase().includes(searchLower)||
        movie.director.toLowerCase().includes(searchLower)||
        movie.year.toString().includes(searchTerm)||
        movie.cast.some(actor => actor.toLowerCase().includes(searchLower))

        const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });
    const sortedAndFilteredMovies = filteredMovies.sort((a,b)=> {
        switch(sortBy){
            case 'rating':
                return b.rating - a.rating;
            case 'year':
                return b.year - a.year;
            case 'genre':
                return a.genre.localeCompare(b.genre);
            case 'title':
            default:
                return a.title.localeCompare(b.title);
        }
    })
    const genres = ['All', ...new Set(movies.map(movie => movie.genre))];
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
                    <div className="search-section">
                        <input type="text"
                                placeholder="search bollywood movies"
                                value={searchTerm}
                                onChange={(e)=> setSearchTerm(e.target.value)}
                                className="search-input"/>
                    </div>
                    {searchTerm && (
                        <p className="search-results">
                            Founded {filteredMovies.length} movie{filteredMovies.length!==1?'s':''} for "{searchTerm}"
                        </p>
                    )}
                    <div className='filter-section'>
                        <h4>Filter by Genre:</h4>
                        <div className="genre-buttons">
                            {
                                genres.map(genre => (
                                    <button
                                        key={genre}
                                        className={`genre-button ${selectedGenre === genre ?'active':'' }`}
                                        onClick={()=> setSelectedGenre(genre)}>
                                               {genre} 
                                        </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="sort-selection">
                        <label htmlFor='sort-select'>sortBy:</label>  
                        <select
                            id='sort-select'
                            value={sortBy}
                            onChange={(e)=> setSortBy(e.target.value)}>
                                <option value="title">Title (A-Z)</option>
                                <option value="rating">Rating (High-Low)</option>
                                <option value="year">Year (Newest first)</option>
                                <option value="genre">Genre (A-Z)</option>
                            </select>        
                    </div>
                    {
                        (searchTerm || selectedGenre !=='All') && (
                            <button
                                className="clear-filters"
                                onClick={()=> {setSearchTerm('');
                                    setSelectedGenre('All');
                                }}>Clear All Filters</button>
                        )
                    }
                    <div className="movies-grid">
                        {sortedAndFilteredMovies.length > 0 ? 
                        (sortedAndFilteredMovies.map((movie)=> (
                            <div className={`movie-card ${getRatingCategory(movie.rating)}`} key={movie.id}>
                                <img src={movie.image}
                                alt={`{movie.title} poster`}
                                className="movie-image" />
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-year">{movie.year}</p>
                                <p className="movie-genre">{movie.genre}</p>
                                <p className="movie-director">{movie.director}</p>
                                <p className="movie-cast">Cast : {movie.cast.join(', ')}</p>
                                <div className={`movie-rating rating-${getRatingCategory(movie.rating)}`}>{movie.rating}/10</div>        
                            </div>
                        ))) : (
                            <div className="empty-state">
                                <h3>No bollywood movie found !</h3>
                                <p>
                                    {searchTerm || selectedGenre !== 'All' ?
                                    "try adjusting your search or filter criteria":
                                    "start searching to find amazing bollywood movies!"}
                                </p>
                            </div>
                        )}
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