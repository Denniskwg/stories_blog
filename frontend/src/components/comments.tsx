import React, { FC } from 'react';

interface commentProps {
  comments : Array;
}

const Comments: FC = ({ comments }: commentProps) => {
  
  return (
    <div className='commentsDiv'>
      {comments.map(comment => {
          return (
            <div className='comment' key={comment.date_posted}>
              <div className='comment-author'>{comment.author.user_name}</div>
              <div className='comment-content'>{comment.content}</div>
            </div>
          )
      })}
     </div>
  )
}

export default Comments;
