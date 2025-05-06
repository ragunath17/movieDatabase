import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './Components/HomePage'
import TopRatedMovies from './Components/TopRatedMoviesPage'
import UpcomingMovies from './Components/UpcomingMoviesPage'
import SearchedMoviesPage from './Components/SearchedMoviesPage'
import MovieDetails from './Components/SingleMovieDetailsPage'

import SearchMoviesContext from './Context/index'

import './App.css'

// write your code here
const API_KEY = '0d47fea40f1456909bb9a14f80d7f7fe'

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const getFormattedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchQuery = async () => {
    setApiStatus('IN_PROGRESS')
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1`
    const response = await fetch(url)
    const data = await response.json()
    setSearchResponse(getFormattedData(data))
    setApiStatus('SUCCESS')
  }

  const onChangeInput = text => setSearchInput(text)

  return (
    <SearchMoviesContext.Provider
      value={{
        onChangeInput,
        onTriggerSearchQuery,
        searchInput,
        apiStatus,
        searchResponse,
      }}
    >
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/search" component={SearchedMoviesPage} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    </SearchMoviesContext.Provider>
  )
}

export default App
