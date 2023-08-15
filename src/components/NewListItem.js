import React from "react";
import axios from "commons/axios";
import NewItem from "components/NewItem";

class NewListItem extends React.Component {
    
    // set the initial state
    state = {
        items: []
    };

    // get data from backend using lifecycle fucntions
    componentDidMount (){
        axios.get("/items?category="+this.props.mainCategory+"&_limit=3").then(response => {
            this.setState({
                items: response.data
            })
        })  
    
        // Update Cart Number when this page is rendered for the first time
        this.props.updateCartNum();
    }


    render (){
        return (
            <div className="listings-container">

                <h1 className="title is-1 has-text-centered">{this.props.mainCategory}</h1>

                <div className="columns is-multiline is-desktop">
                    {this.state.items.map(i => {
                        return (
                            <div className="column is-4" key={i.id}>
                                <NewItem item={i} updateCartNum={this.props.updateCartNum} />
                            </div>
                        )
                    })}
                </div>

                <div class="has-text-centered">
                    <button class="button is-primary">View More</button>
                </div>
            </div>
        )
    }
}

export default NewListItem;