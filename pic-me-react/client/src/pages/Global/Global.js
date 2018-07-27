
import React, { Component } from "react";
import axios from 'axios';
import Nav from "../../components/Nav";
import ImageCard from "../../components/ImageCard/ImageCard";
// import CommentForm from "../../components/CommentForm";

class Global extends Component {

    state = {
        userName: '',
        userId: '',
        imageUrl: '',
        imageId: 0,
        allImages: [ ],
        imageLikedBy: [ ],
        image: ''
    };

    componentDidMount = () => {

        if (localStorage.getItem('jwtToken')===null) {
            this.props.history.push("/login");
        }

        this.setState({userName: localStorage.getItem('userName')})
        this.setState({userId: localStorage.getItem('userId')})
        
        this.getAllPhotos();
    };

    handleLikeClick = id => {

        // event.preventDefault();
        console.log("like button clicked");

        console.log(id)
        const thisId = id;

        console.log(thisId);
        this.setState({imageId: thisId})
        console.log(this.state.imageId)

        const user = {
            usersWhoLiked: this.state.userName
        }
        // const like = 1

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.put('/api/photo/likes/' + id, user)
            .then((result) => {
                console.log(result.data.usersWhoLiked.length)
                const likes = result.data.usersWhoLiked.length
                console.log(likes);
                this.updatePhotoLikes(likes);
            })
    
        // axios.put('/api/photo/likes/' + id, like)
        //     .then((result) => {
        //         console.log(result)
        //         // this.updatePhotoLikes(id);
        //     })
    };

    updatePhotoLikes = (likes) => {
        console.log("Likes Updated")
        this.setState({likes: likes})
        console.log(this.state.likes)
        window.location.reload();
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        // axios.put('/api/photo/' + id, 5)
        //     .then((res) => {
        //         window.location.reload();
        //     })
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({comment: event.target.value})
    };

    getComments = () => {
        this.setState( { imageId: this.state.mostRecentUserImage._id }, () => {
            // console.log(this.state)

            const url = `/api/photo/${this.state.imageId}/comments`;
            // console.log(url)
    
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    
            axios.get(url)
                .then(res => {
                    console.log(res.data, 'comment data')

                    // const commentData = res.data.map(res.data.comments)
                    // console.log(commentData)
                    // this.setState({comments: res.data.comments})
                    // console.log(this.state.comments.body)
                })
        })

    };

    handleCommentAdd = (event) => {
        event.preventDefault();
        
        let commentObject = {
            author: this.state.userId,
            authorUserName: this.state.userName,
            body: this.state.comment,
        };

        console.log(commentObject);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.post(`/api/photo/${this.state.imageId}/comments`, commentObject)
            .then(res => {
                console.log(res);
            })
    };

    getAllPhotos = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/photo')
            .then(res => {
                console.log(res.data)
                this.setState({allImages: res.data})
            })
    };

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
        console.log("Logout!")
    };

    render() {
        return (

            <div className="container">

                <Nav onClick={() => this.logout()} />
                <h1>Global Leaderboard</h1>
                {this.state.allImages.map(image => (

                    <ImageCard
                        id={image._id}
                        key={image._id}
                        photo={image.url}
                        user={image.user}
                        likes={image.usersWhoLiked.length}
                        caption={image.caption}
                        liked="false"
                        usersWhoLiked={image.usersWhoLiked}
                        // onClick={this.handleLikeClick.bind(this)}
                        handleLikeClick={this.handleLikeClick}
                    />
                    /* <CommentForm 
                        onClick={this.handleCommentAdd}
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleInputChange}
                    /> */
                ))}

            </div> 
        );
    };

};

export default Global;