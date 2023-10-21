// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
// import Spinner from './components/Spinner';


export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (

      <div>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <NavBar />
        <Routes>
          {/* <Route exact path="/" element={<NavBar />} /> */}
          {/* <News setProgress={this.setProgress} pageSize={5} country="in" category="Science"/> */}
          <Route exact path="/" element={<News setProgress={this.setProgress} key="General" pageSize={6} country="in" category="General" />} />
          <Route exact path="/Sports" element={<News setProgress={this.setProgress} key="Sports" pageSize={6} country="in" category="Sports"/>} />
          <Route exact path="/Science" element={<News setProgress={this.setProgress} key="Science" pageSize={6} country="in" category="Science" />} />
          <Route exact path="/Technology" element={<News setProgress={this.setProgress} key="Technology" pageSize={6} country="in" category="Technology" />} />
          <Route exact path="/Health" element={<News setProgress={this.setProgress} key="Health" pageSize={6} country="in" category="Health" />} />
          <Route exact path="/Business" element={<News setProgress={this.setProgress} key="Business" pageSize={6} country="in" category="Business" />} />
          {/* <Route exact path="/About" element={<About/>}/> */}
        </Routes>
      </div>
    )
  }
}
