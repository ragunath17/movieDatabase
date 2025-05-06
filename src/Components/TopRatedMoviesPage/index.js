import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import './index.css'

class TopRatedMovies extends Component {
  state = {topRatedMovies: {}, isLoading: true}

  componentDidMount = () => {
    this.getTopRatedMovies()
  }

  getFormattedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMovies = async () => {
    const API_KEY = '0d47fea40f1456909bb9a14f80d7f7fe'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`

    const response = await fetch(url)
    const data = await response.json()

    const updatedData = this.getFormattedData(data)

    this.setState({topRatedMovies: updatedData, isLoading: false})
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="Loader">
      <Loader type="ThreeDots" height={50} width={50} color="blue" />
    </div>
  )

  renderTopRatedMovies = () => {
    const {topRatedMovies} = this.state
    const {results} = topRatedMovies
    return (
      <ul className="popular-unordered-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="top-rated-bg-container">
        <Navbar />
        {isLoading ? this.renderLoaderView() : this.renderTopRatedMovies()}
      </div>
    )
  }
}

export default TopRatedMovies
