import React, { Component } from 'react';

class MessageBox extends Component {
    render() {
        return (
            <article className={`message ${this.props.type}`}>
                <div className="message-body">
                    {this.props.message}
                </div>
            </article>
        )
    }
}

export default MessageBox;
