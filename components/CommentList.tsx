import Data from "../Assets/data.json";
import { useState } from "react";
import ReplyView from "./ReplyView";
import imagejulius from "../Assets/avatars/image-juliusomo.png";

interface user{
  image:{
    png:string,
    webp:string
  },
  username:string,
}
interface comment {
  id:number,
  content:string,
  createdAt:string,
  score:number,
  user:user,
  replyingto?:string
  replies: []|comment[]
}

const CommentList = () => {
  const [commentList, setCommentList] = useState<comment[]>([...Data.comments]);
  const [text, setText] = useState<string>("");

  const handleAddComment = () => {
    setCommentList((prev) => [
      ...prev,
      {
        id: Math.random(),
        content: text,
        createdAt: "1 minute ago",
        score: 0,
        user: Data.currentUser,
        replies: [],
        username:Data.currentUser.username
      }],
    );

    setText("");
  };

  const handleDeleteComment = (commentId:number) => {
    setCommentList((prev) => prev.filter((i) => i.id !== commentId));
  };

  const handleEditComment = ({ commentId, commentEditText }:{commentId:number,commentEditText:string}) => {
    const updatedCommentList = commentList.map((i) => {
      if (i.id === commentId) {
        i.content = commentEditText;
      }
      return i;
    });

    setCommentList(updatedCommentList);
  };

  return (
    <section>
      {commentList.map((data, i) => {
        return (
          <ReplyView
            key={data.id}
            comment={data}
            handleDeleteReply={handleDeleteComment}
            handleEditReply={handleEditComment}
          />
        );
      })}

      <div className="input-section">
        <img src={imagejulius} alt="img" />
        <input
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </section>
  );
};

export default CommentList;
