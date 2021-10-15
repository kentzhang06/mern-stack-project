import React from "react";
import { withRouter } from "react-router";

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: ""
    }
    
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllPosts(this.state)
      .then(() => this.props.fetchFollows());
  }

  updateKeyword (e) {
    this.setState({ keyword: e.target.value });
  }

  onSubmitSearch(e) {
    e.preventDefault();
    const { fetchAllPosts } = this.props;

    fetchAllPosts(this.state.keyword);
    this.setState({keyword: this.state.keyword});
  }

  followPlantButton(e, plantId) {
    e.preventDefault();
    this.props.followPlant(plantId)
  }

  unfollowPlantButton(e, plantId) {
    e.preventDefault();
    this.props.unfollowPlant(plantId)
  }

  render() {
    const { posts, follows, history } = this.props;
    if (!posts) return null;

    const followUnfollowButton = (plantId) => {
      if (follows.includes(plantId)) {
        return (
          <button onClick={(e) => this.unfollowPlantButton(e, plantId)}>
            Unfollow Plant
          </button>
        )
      }else {
        return (
          <button onClick={(e) => this.followPlantButton(e, plantId)}>
            Follow Plant
          </button>
        )
      }
    }

    const displayPosts = posts.map((post, i) => {
      let newDate = new Date(post.createdAt);
      const time = newDate.toLocaleTimeString("en-US", {timeZone: "America/Los_Angeles"});
      const date = newDate.toDateString();
      if (i > 10) return null;
      return (
        <div key={i}>
          <img onClick={() => history.push(`/plant/${post.plantId}`)} src={post.imageUrl} alt="" width="150px" height="auto"/>
          <div>
            {date} {time}
          </div>
          <div>
            {post.caption}
          </div>
          {followUnfollowButton(post.plantId)}

        </div>
      )
      
    });

    return(
      <div>
        <form onSubmit={this.onSubmitSearch}>
          <input
            type="text"
            onChange={(e) => this.updateKeyword(e)}
            value={this.state.keyword}
            placeholder="...Look up a plant"
          />
          <button>Search</button>
        </form>
        { displayPosts }
      </div>
    )
  }
}

export default withRouter(NewsFeed);