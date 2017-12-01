import React from 'react';
import { Image, TextInput, Text, View, StyleSheet } from 'react-native';

class Movie extends React.Component {
  render() {
    return (
      <View style={styles.movie}>
        <Image style={styles.backdrop}
               source={{uri: "http://image.tmdb.org/t/p/w500/" + this.props.movie.backdrop_path}} />
        <View style={styles.posterContainer}>
          <Image style={styles.poster}
                 source={{uri: "http://image.tmdb.org/t/p/w500/" + this.props.movie.poster_path}} />
        </View>
        <View style={styles.titleAndVotes}>
          <Text style={styles.title}>{this.props.movie.title}</Text>
          <Text style={styles.votes}>{this.props.movie.vote_average}</Text>
        </View>
        <Text style={styles.overview}>{this.props.movie.overview}</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movieNameInput: "",
      movie: null
      }
  }

  movieNameInputChanged(text) {
    this.setState({
      movieNameInput: text
    });
  }

  movieNameInputSubmitted() {
    let url = "http://api.themoviedb.org/3/search/movie?query=" + this.state.movieNameInput + "&api_key=8ad43d355fccbef40dc3527123bb25ff&language=en-US&page=1&include_adult=false";
    fetch(url).then(response => response.json()).then(json => {
      console.log(json.results[0])
      this.setState({
        movieNameInput: "",
        movie: json.results[0]
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.movieNameInput}
                   placeholder="Enter a movie name!"
                   placeholderTextColor="#aaa"
                   value={this.state.movieNameInput}
                   onChangeText={(text) => this.movieNameInputChanged(text)}
                   onSubmitEditing={() => this.movieNameInputSubmitted()}
        />
        {this.state.movie && <Movie movie ={this.state.movie} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  movieNameInput: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    height: '100%',
    borderWidth: 0,
    fontSize: 26,
    fontWeight: '300',
    textAlign: 'left',
    paddingLeft: 20
  },
  movie: {
    flex: 7,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.3
  },
  posterContainer: {
    flex: 4
  },
  poster: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover'
  },
  titleAndVotes: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'transparent'
  },
  title: {
    color: '#fff',
    flex: 4,
    fontSize: 30,
    fontWeight: '300'
  },
  votes: {
    color: '#fff',
    flex: 1,
    fontSize: 20,
    backgroundColor: '#F300CE',
    padding: 4,
    textAlign: 'center'
  },
  overview: {
    flex: 3,
    color: '#fff',
    width: 360,
    fontSize: 17,
    fontWeight: '300',
    lineHeight: 23,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'transparent'
  }
});
