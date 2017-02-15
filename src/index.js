import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDwObmq6TIPf8xdGoddF3Gz2gXJ-vgn_nE';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('dinosaurs');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term}, videos => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce(term => this.videoSearch(term), 300);

        return (
            <div className="container">
                <div className="row">
                    <SearchBar onSearchTermChange={videoSearch} />
                </div>
                <div className="row">
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                        onVideoSelect = { selectedVideo => this.setState({selectedVideo}) }
                        videos = {this.state.videos} />
                </div>
            </div>
        );
    };
}

ReactDOM.render(<App />, document.querySelector('.container'));
