import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        // document.title=this.props.category;
        document.title = `${this.props.category}  -  NewsAnt`
    }
    async updatenews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c683a4604a54638b4993e0e84d69751&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(50);
        let paseddata = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: paseddata.articles, totalResults: paseddata.totalResults })
        this.setState({ loading: false });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updatenews();
        // this.props.setProgress(100);
    }
    // handleNextClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c683a4604a54638b4993e0e84d69751&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let paseddata = await data.json();
    //     console.log(paseddata);
    //     this.setState(
    //         {
    //             articles: paseddata.articles,
    //             page: this.state.page + 1,
    //             loading: false
    //         }
    //     )
    //     // console.log()

    // }
    // handlePreviousClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c683a4604a54638b4993e0e84d69751&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let paseddata = await data.json();
    //     console.log(paseddata);
    //     this.setState(
    //         {
    //             articles: paseddata.articles,
    //             page: this.state.page - 1,
    //             loading: false
    //         }
    //     )
    // }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c683a4604a54638b4993e0e84d69751&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let paseddata = await data.json();
        this.setState({ articles: this.state.articles.concat(paseddata.articles), totalResults: paseddata.totalResults })
        // console.log(paseddata);
        this.setState({ loading: false });
    };
    render() {
        return (
            <>
                <div className='container my-3'>
                    {!this.state.loading && <h2 className='text-center' style={{ marginBottom: '35px', marginTop: '30px' }}>NewsAnt - Top HeadLines</h2>}
                    {this.state.loading&&<Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">

                            <div className='row'>
                                {this.state.articles.map((element) => {
                                    return <div className='col-md-4' key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                    {/* {<Spinner style={{marginTop:'4000px'}} />} */}
                    {/* {<div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>} */}
                </div>
            </>
        )
    }
}

export default News
