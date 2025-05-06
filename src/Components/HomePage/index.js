import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

class HomePage extends Component {
  state = {popularMovies: {}, isLoading: true}

  componentDidMount = () => {
    this.getMoviesInfo()
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

  getMoviesInfo = async (page = 1) => {
    const {popularMovies} = this.state
    console.log(popularMovies)
    const API_KEY = '0d47fea40f1456909bb9a14f80d7f7fe'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&${page}`

    const response = await fetch(url)
    const data = await response.json()

    const updatedData = this.getFormattedData(data)

    this.setState({popularMovies: updatedData, isLoading: false})
  }

  renderPopularMovies = () => {
    const {popularMovies} = this.state
    const {results} = popularMovies

    return (
      <ul className="popular-unordered-list">
        {results.map(each => (
          <MovieCard key={each.id} movieDetails={each} />
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
    const {isLoading, popularMovies} = this.state

    return (
      <div className="home-bg-container">
        <Navbar />
        {isLoading ? this.renderLoaderView() : this.renderPopularMovies()}
        <Pagination
          totalPages={popularMovies.totalPages}
          apiCallback={this.getMoviesInfo}
        />
      </div>
    )
  }
}

export default HomePage
