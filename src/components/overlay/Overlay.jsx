import { useState } from "react";
import closeIcon from "../../assets/close.svg";

export function Overlay({ display, close, fullPhoto, sendComment }) {
  const [commentInput, setCommentInput] = useState("");

  function send() {
    sendComment(commentInput);
    setCommentInput("");
  }

  return (
    <div className={display ? "overlay" : "overlay hidden"}>
      <div className="overlay-container">
        <button className="close-btn" onClick={() => close()}>
          <img className="close-icon" src={closeIcon} />
        </button>
        <div className="overlay-content">
          <div className="left-side">
            <img className="full-img" src={fullPhoto.url} />
            <div className="right-side">
              {fullPhoto.comments.length > 0 ? (
                fullPhoto.comments.map((item) => (
                  <div className="comment-item">
                    <p className="comment-date">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p className="comment-text">{item.text}</p>
                  </div>
                ))
              ) : (
                <p>Тут еще нет комментариев</p>
              )}
            </div>
          </div>
          <div className='send-comment-form'>
          <input placeholder="Ваше имя" />
            <input placeholder="Ваш комментарий" value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
            <button className="send-comment" onClick={() => send()}>Оставить комментарий</button>
          </div>
        </div>
      </div>
    </div>
  );
}
