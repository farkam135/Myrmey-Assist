import React, { Component } from 'react';

class Inspector extends Component {
    render() {
        //let CurrScreen = this.props.screens[this.props.screens.length - 1];
        return (
            <div className="box">
                {this.props.currScreen !== null &&
                    <this.props.screen.component {...this.props.screen.data} />
                }
            </div>
        );
    }
}

export default Inspector;
