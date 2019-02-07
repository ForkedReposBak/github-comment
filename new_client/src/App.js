import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header.js';
import Comments from './Comments.js';
import Footer from './Footer.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      init: {
        valid: true,
        error_message: '',
        loading: true,
      },
      url: {
        comments_url: this.props.config.comments_url,
        create_comment_url: this.props.config.create_comment_url,
        auth_url: this.props.config.auth_url
      },
      login: {
        auth: false,
        login_url: ""
      },
      comments: [
        // {
        //   user: {avatar_url: "https://via.placeholder.com/150"},
        //   content: "hello world"
        // },
        // {
        //   user: {avatar_url: "https://via.placeholder.com/150"},
        //   content: "foo bar"
        // }
      ]
    };
    // this.combine_config();
    // this.load_comments();
  }

  combine_config() {

  }

  load_comments() {

    // this.props.config.comments_url,
  }

  componentDidMount() {
    fetch(this.props.config.comments_url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            comments: result
          });
        },
        (error) => {
          alert('error loading comments');
        }
      )

    fetch(
      this.props.config.auth_url,
      {
        method: 'POST'
      }
      )
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          login: result
        });
        // console.log(result);
      },
      (error) => {
        alert('error loading auth');
      }
    )
  }

  render() {
    return (
      <div>
        <Header init={this.state.init} />
        <Comments comments={this.state.comments} />
        <Footer login={this.state.login} url={this.state.url} />
      </div>
    );
  }
}

export default App;
