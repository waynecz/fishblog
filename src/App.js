import React, { Component } from 'react';
import { loadPosts, load, save } from './services/posts';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import CodeBlock from './code-block';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/markdown/markdown');
require('codemirror/theme/mbo.css');
require('purecss/build/pure-min.css');

require('./App.css');

class Article extends Component {

  state = {
    'content': '',
    'title': '',
  };

  handleMarkdownChange = (editor, data, value) => {
    this.setState({ content: value });
  };

  componentWillReceiveProps(newProps) {
    const { match } = newProps;
    const title = match.params.title;
    this.setState({
      content: load(title),
      title: title,
    });
  }

  saveArticle = () => {
    save(this.state.title, this.state.content);
  };

  render() {
    const { content } = this.state;
    return (
      <ScrollSync>
        <div>
          <button onClick={this.saveArticle}>保存</button>
          <div className="article">
            <ScrollSyncPane>
              <div className="editor-pane">
                <CodeMirror options={{
                  mode: 'markdown',
                  theme: 'mbo',
                }} value={content} autoCursor={false} onChange={this.handleMarkdownChange} className="editor"/>
              </div>
            </ScrollSyncPane>

            <ScrollSyncPane>
              <div className="result-pane">
                <Markdown
                  source={content}
                  renderers={{ code: CodeBlock }}
                />
              </div>
            </ScrollSyncPane>
          </div>
        </div>
      </ScrollSync>

    )
      ;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: loadPosts(),
    };
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <header className="App-header">
            </header>
            <ul className="titles">
              {this.state.posts.map(p => <li><Link to={`/article/${p}`}>{p}</Link></li>)}
            </ul>
            <Route path={`/article/:title`} component={Article}/>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
