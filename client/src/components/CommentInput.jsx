import React from 'react';
import ReactDOM from 'react-dom';


export default class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleOnClick(e) {
    const itemText = this.state.value;
    this.props.createComment(itemText);
    this.setState({value: ''});
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
          this.props.login.get('auth') ?
          <button  onClick={ this._handleOnClick.bind(this) }>comment</button>
          :
          <a href={this.props.login.get('url')} target="_blank">login with github</a>
        }
      </footer>
    )
  }
};
