import React, { PureComponent, PropTypes } from "react";

export default class Todo extends PureComponent
{
    static defaultProps = {
        task: "say hello"
    };

    static propTypes = {
        task: PropTypes.string
    };

    state = {
        title: "do something"
    };

    clickHandler(e)
    {
        this.setState(
            Object.assign({}, this.state, {
                title: `${this.state.title} clicked`
            })
        );
    }

    render()
    {
        return (
            <div className="Todo">
                <p className="title">{this.state.title}</p>
                <button onClick={(e) => this.clickHandler(e)}>{this.props.task}</button>
            </div>
        );
    }
}
