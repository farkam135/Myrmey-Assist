import React, { Component } from 'react';
import './style.css';

class Inspector extends Component {
    render() {
        //let CurrScreen = this.props.screens[this.props.screens.length - 1];
        return (
            <div> 
                {this.props.currScreen !== null &&
                    <this.props.screen.component user={this.props.user} {...this.props.screen.data} />
                }
            </div>
        );
    }
}

export default Inspector;
