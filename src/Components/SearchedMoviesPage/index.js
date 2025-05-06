import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'

import SearchMoviesContext from '../../Context/index'

import './index.css'

const SearchedMoviesPage = () => {
  const renderEmptyView = () => (
    <div className="empty-view">
      <p className="empty-para1">No Results Found</p>
      <p className="empty-para2">Try again</p>
    </div>
  )

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="Loader">
      <Loader type="ThreeDots" height={50} width={50} color="blue" />
    </div>
  )

  const renderSearchMovies = searchResponse => {
    const {results} = searchResponse
    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="popular-unordered-list">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderAllView = value => {
    const {searchResponse, apiStatus} = value
    console.log(searchResponse)

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoaderView()
      case 'SUCCESS':
        return renderSearchMovies(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value

        return (
          <div>
            <Navbar />
            <div>{renderAllView(value)}</div>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchedMoviesPage
