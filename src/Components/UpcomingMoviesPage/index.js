import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import './index.css'

class UpcomingMovies extends Component {
  state = {upcomingMovies: {}, isLoading: true}

  componentDidMount = () => {
    this.getUpcomingMovies()
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

  getUpcomingMovies = async () => {
    const API_KEY = '0d47fea40f1456909bb9a14f80d7f7fe'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`

    const response = await fetch(url)
    const data = await response.json()

    const updatedData = this.getFormattedData(data)

    this.setState({upcomingMovies: updatedData, isLoading: false})
  }

  renderUpcomingMovies = () => {
    const {upcomingMovies} = this.state
    const {results} = upcomingMovies
    return (
      <ul className="popular-unordered-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="Loader">
      <Loader type="ThreeDots" height={50} width={50} color="blue" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Navbar />
        {isLoading ? this.renderLoaderView() : this.renderUpcomingMovies()}
      </div>
    )
  }
}

export default UpcomingMovies
