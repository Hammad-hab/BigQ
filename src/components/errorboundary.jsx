import { Component } from "react";


class Error extends Component {
    
    state = {err: false}
    static getDerivedStateFromError() {
        return { err: true };
    }
    componentDidCatch(error, info) {
        console.error(error)
    }

    render() {
        if (this.state.err) {
            return <div className="alert alert-danger">An error occured please stand by</div>
        }
        return this.props.children
    }
}

export default Error