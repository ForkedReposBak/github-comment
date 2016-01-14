var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./app.scss');
var $ = require('jquery');

var auth_url = "http://localhost:5000/fake/auth";
var comment_url = "http://localhost:5000/fake/comments";
var comments_url = "http://localhost:5000/fake/comments";
var loading_img = "http://localhost:5000/images/boohee.gif";

var default_avatar_url = "http://github-comment.herokuapp.com/images/boohee.png";

comments_url = "http://github-comment.herokuapp.com/comments?page_id=4&user_name=teddy-ma&repo=teddy-ma.github.io";
auth_url = "http://github-comment.herokuapp.com/users/auth";

// 评论表单容器组件
//{"auth":false,"login_url":"https://github.com/login/oauth/authorize?scope=public_repo&client_id=c518ebe97832f22e306a"}
var FormBox = React.createClass({
  getInitialState: function() {
    var ret = null;
    // 初始化登录状态
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      xhrFields: {
        withCredentials: true
      },
      url: auth_url,
      async: false
    }).done(function(data) {
      if(data.auth){
        ret = {name: data.user_name, avatar: data.avatar_url, auth: true};
      }else{
        ret = {name: "请登录", avatar: default_avatar_url, auth: false, login_url: data.login_url};
      }
    }).fail(function(xhr)  {
       ret = {name: "请登录", avatar: default_avatar_url, auth: false};
    });
    return ret;
  },
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        <Avatar name={this.state.name} avatar={this.state.avatar} />
        <Form auth={this.state.auth} login_url={this.state.login_url}/>
      </div>
    );
  }
});

// 头像组件
var Avatar = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_avatar}>
        <img className={style.avatar} title={this.props.name} src={this.props.avatar} />
      </div>
    );
  }
});

// 表单组件
var Form = React.createClass({
  getInitialState: function() {
    return({submited: false});
  },
  handleClick: function(){
    $.post(comment_url, function(data){
      this.setState({
        submited: true
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className={style.github_comment_input} id="status_default">
        {
          this.props.auth ?
            <div>
              <input className={style.input} type="text" name="body" id="github-comment-default-input" placeholder="TODO: "/>
              <button disabled={this.state.submited} onClick={this.handleClick} type="button">提交</button>
            </div>
            :
            <a className="button" target="_blank" href={this.props.login_url}>Login via GitHub</a>
        }
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_item}>
        <div className={style.github_comment_avatar}>
          <img src={this.props.avatar} title={this.props.name} className={style.avatar}/>
        </div>
        <div className={style.github_comment_content}>
          <p>{this.props.content}</p>
        </div>
      </div>
    )
  }
});

// 评论内容组件
var List = React.createClass({
  getInitialState: function() {
    return { loading: true, comments: [] }
  },
  componentDidMount: function() {
    $.get(comments_url, function(result) {
      if (this.isMounted()) {
        this.setState({
          loading: false,
          comments: result
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div className={style.github_comment_items_wrapper}>
        {
          this.state.loading ? <img src={loading_img} /> : this.state.comments.map(function(item){
            return <Comment key={item.id} content={item.body} avatar={item.user.avatar_url} name={item.user.login}/>
          })
        }
      </div>
    );
  }
});

ReactDOM.render(
  <FormBox />,
    document.getElementById('github-comment-form'));
ReactDOM.render(
  <List />, document.getElementById('github-comments-container'));
