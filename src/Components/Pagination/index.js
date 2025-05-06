import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  state = {pageNo: 1}

  onNextPage = () => {
    const {pageNo} = this.state
    const {totalPages, apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        apiCallback(pageNo)
      },
    )
  }

  onPreviousPage = () => {
    const {pageNo} = this.state
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        if (pageNo > 1) {
          apiCallback(pageNo - 1)
        }
      },
    )
  }

  render() {
    const {pageNo} = this.state
    console.log(pageNo)

    return (
      <div className="pagination-bg-container">
        <button type="button" onClick={this.onPreviousPage} className="button">
          Previous
        </button>
        <p className="page-No">{pageNo}</p>
        <button type="button" onClick={this.onNextPage} className="button">
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
