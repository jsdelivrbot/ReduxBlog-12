import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {

        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-xs-right text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
        
        
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Category"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/" className="btn btn-danger">Cancel</Link>
                    </div>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // Validate input from 'values'
    if (!values.title) {
        errors.title = "Title is a required field";
    }
    if (!values.categories) {
        errors.categories = "Category is a required field";
    }
    if (!values.content) {
        errors.content = "Content is required to post";
    }

    // If errors is empty the form contains valid data
    // If errors contains *ANY* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: "PostsNewForm"
})(
    connect(null, { createPost })(PostsNew)
    );
