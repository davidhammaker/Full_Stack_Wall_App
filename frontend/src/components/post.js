import React from 'react';


// Render a single post.
// In doing this, parse the date into something more reasonable.
function Post(props) {
  const post = props.post;

  var dateRaw = props.post.date_posted.toString();

  var year = dateRaw.slice(0, 4);
  var month = dateRaw.slice(5, 7);
  var day = dateRaw.slice(8, 10);
  var hourStr = dateRaw.slice(11, 13);
  var minute = dateRaw.slice(14, 16);

  var hourNum = parseInt(hourStr);
  var suffix = 'AM';
  if (hourNum > 12) {
    suffix = 'PM';
    hourNum -= 12;
  } else if (hourNum === 0) {
    hourNum = 12;
  }
  var hour = hourNum.toString();
  
  const dateNew = `${hour}:${minute} ${suffix}, ${month}/${day}/${year}`

  return (
    <div className="p-2">
      <h5>{ post.creator }
        <small className="float-right font-italic small-font">
          { dateNew }
        </small>
      </h5>
      <p className="pl-2 large-font">{ post.content }</p>
    </div>
  );
}

export default Post;
