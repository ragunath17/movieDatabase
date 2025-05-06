import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../Context/index'
import './index.css'

const Navbar = props => {
  const renderSearchInput = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {onChangeInput, onTriggerSearchQuery, searchInput} = value

        const onchangeSearchInput = event => onChangeInput(event.target.value)

        const onSearchInput = event => {
          event.preventDefault()
          onTriggerSearchQuery()
          const {history} = props
          history.push('/search')
        }

        return (
          <div className="search-input-container">
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                onChange={onchangeSearchInput}
                value={searchInput}
                placeholder="Search"
                className="input-box"
              />
            </label>

            <button
              type="button"
              onClick={onSearchInput}
              className="search-btn"
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <div className="navbar-bg-container">
      <h1 className="heading">MovieDB</h1>
      <nav className="navbar-container">
        {renderSearchInput()}
        <Link to="/" className="link-item">
          <button type="button" className="link-btn">
            Popular
          </button>
        </Link>
        <Link to="/top-rated" className="link-item">
          <button type="button" className="link-btn">
            Top Rated
          </button>
        </Link>
        <Link to="/upcoming" className="link-item">
          <button type="button" className="link-btn">
            Upcoming
          </button>
        </Link>
      </nav>
    </div>
  )
}
export default withRouter(Navbar)
