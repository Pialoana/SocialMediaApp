import PropTypes from "prop-types";
import Comment from "./Comment";
import { useContext } from "react";
import { AppContext } from "../App";
import CreateCommentForm from "./CreateCommentForm";
import { createContext } from "react";
import { Link } from "react-router-dom";

const PostContext = createContext();

function Post({ post }) {
  const context = useContext(AppContext);

  return (
    <div className="post">
      <PostContext.Provider
        value={{
          post: post,
        }}
      >
        <h3
          onClick={(e) => {
            e.preventDefault();
            context.findPost(post.id);
          }}
        >
          <Link to={`/post/${post.id}`} className="post-title">
            {post.title}
          </Link>
        </h3>
        <p>{post.content}</p>
        <p>Author: {post.author}</p>
        <div>
          <CreateCommentForm></CreateCommentForm>
          {context.comments
            .filter((x) => parseInt(x.postId) === parseInt(post.id))
            .map((comment, index) => (
              <Comment comment={comment} key={index} />
            ))}
        </div>
      </PostContext.Provider>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export { Post as default, PostContext };
