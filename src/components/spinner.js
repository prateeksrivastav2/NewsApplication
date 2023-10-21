import React, { Component } from 'react'
import loading from './loading.gif'

export class spinner extends Component {
  render() {
    return (
      <div className='text-center' style={{marginTop:'200px'}}>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default spinner
