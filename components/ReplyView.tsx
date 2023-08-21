import { useState } from "react";
import replyicon from "../Assets/avatars/icon-reply.svg";
import imagejulius from "../Assets/avatars/image-juliusomo.png";
import Data from "../Assets/data.json";
import deleteicon from "../Assets/avatars/icon-delete.svg";
import editicon from "../Assets/avatars/icon-edit.svg";
type user = {
  image:{
    png:string,
    webp:string
  }
}
interface comment {
  id:number,
  content:string,
  createdAt:string,
  score:number,
  user:user,
  username:string,
  replyingto?:string,
  replies:[]|comment[]
}

const ReplyView = ({ comment, handleDeleteReply, handleEditReply }) => {
  const {
    createdAt,
    content,
    score,
    user: {
      image: { png },
      username,
    },
    replies,
    id,
  } = comment;
  const [replyList, setReplyList] = useState<comment[]|[]>(replies ?? []);
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  const handleReplyComment = () => {
    setReplyList((prev) => [
      ...prev,
      {
        id: Math.random(),
        content: text,
        createdAt: "1 minute ago",
        score: 0,
        replyingTo: username,
        user: Data.currentUser,
        replies: [],
         username:Data.currentUser.username
      },
    ]);

    setText("");
    setReply(false);
  };

  const toggleEdit = () => {
    if (edit) {
      setEdit(false);
      setEditText("");
    } else {
      setEdit(true);
      setEditText(content);
    }
  };

  const handleEditSubmit = () => {
    handleEditReply({ commentId: id, commentEditText: editText });
    setEdit(false);
    setEditText("");
  };

  const handleDeleteReplyForReply = (replyId:number) => {
    setReplyList((prev) => prev.filter((i) => i.id !== replyId));
  };

  const handleEditReplyForReply = ({ commentId, commentEditText }:{commentId:number,commentEditText:string}) => {
    const updatedReplyList = replyList.map((i) => {
      if (i.id === commentId) {
        i.content = commentEditText;
      }
      return i;
    });

    setReplyList(updatedReplyList);
  };

  return (
    <div>
      {edit ? (
        <div className="input-section">
          <img src={imagejulius} alt="img" />
          <input
            type="text"
            placeholder="Add a comment"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEditSubmit}>Reply</button>
          <button onClick={toggleEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="overall">
            <div className="container comment-section">
              <div className="btn-container">
                <button>+</button>
                <h4>{score}</h4>
                <button>-</button>
              </div>
              <div className="right-side">
                <div className="user-info">
                  <div className="user_avater">
                    <img src={png} alt={username} />
                    <p>{username}</p>
                    <small>{createdAt}</small>
                  </div>
                  <div className="reply-button">
                    {Data.currentUser.username === username ? (
                      <div>
                        <button onClick={() => handleDeleteReply(id)}>
                          <img src={deleteicon} alt="delete-icon" />
                          Delete
                        </button>
                        <button onClick={toggleEdit}>
                          <img src={editicon} alt="edit-icon" />
                          edit
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setReply((prev) => !prev)}>
                        <img src={replyicon} alt="reply-icon" />
                        reply
                      </button>
                    )}
                  </div>
                </div>
                {edit ? (
                  <div className="input-section">
                    <img src={imagejulius} alt="img" />
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleEditSubmit}>Reply</button>
                    <button onClick={toggleEdit}>Cancel</button>
                  </div>
                ) : (
                  <p>{content}</p>
                )}
              </div>
            </div>
          </div>

          {reply ? (
            <div className="input-section">
              <img src={imagejulius} alt="img" />
              <input
                type="text"
                placeholder="Add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleReplyComment}>Reply</button>
            </div>
          ) : null}

          {replyList?.length ? (
            <div className="replied-container">
              <div className="replied-divid" />
              <div>
                {replyList.map((i):comment => (
                  <ReplyView
                    key={i.id}
                    comment={i}
                    handleDeleteReply={handleDeleteReplyForReply}
                    handleEditReply={handleEditReplyForReply}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ReplyView;

// style={{ marginLeft: "6rem" }}
