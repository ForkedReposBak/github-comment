import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/Main.css';

export default class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnClickComment(e) {
    const itemText = this.state.value;
    this.props.createComment(itemText);
    this.setState({value: ''});
  }
  _handleOnClickLogin(e) {
    this.props.tryLogin();
  }
  _handleOnChange(e) {
    this.setState({value: e.target.value});
  }
  _handleOnFocus(e) {
    this.props.authRequest();
  }
  render() {
    return (
      <footer>
        <input className="new-comment"
               onChange={ this._handleOnChange.bind(this) }
               onFocus={ this._handleOnFocus.bind(this) }
               type="text" />
        {
          this.props.display.get('submit_comment') ?
          <button className={ styles.comment_button } onClick={ this._handleOnClickComment.bind(this) }>comment</button>
          :
          ''
        }
        {
          this.props.display.get('login_url') ?
          <a onClick={ this._handleOnClickLogin.bind(this) } className={ styles.login_github_button } href={this.props.login.get('url')} target="_blank">login with github</a>
          :
          ''
        }
      </footer>
    )
  }
};
