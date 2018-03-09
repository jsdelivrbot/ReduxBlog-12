import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/index";

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            const postUrl = `/posts/${post.id}`;

            return (
                <li key={post.id} className="list-group-item">
                    <Link to={postUrl}>
                        <div>Title: {post.title}</div>
                    </Link>
                    <div>Category: {post.categories}</div>
                    <div>Content: {post.content}</div>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary">
                        New Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">{this.renderPosts()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
