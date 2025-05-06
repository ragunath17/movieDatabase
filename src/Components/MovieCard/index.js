import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="list-items">
      <img src={posterPath} alt={title} className="movie-poster" />
      <div className="movie-title-card">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="movie-link-item">
        <button type="button" className="view-details-button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
