/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready( function() {

  const fetchTweets = function () {
  $.ajax("/tweets", { method: 'GET' })
    .then(function (tweetList) {
      console.log('Success: ',tweetList);
      renderTweets(tweetList);
    })
  };
  fetchTweets();

  const renderTweets = function(tweets) {
    const tweetContainer = $(".tweets-container");
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      tweetContainer.prepend(newTweet);
    }
  }

  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class="tweets">
    <header class="top-of-tweet">
          <div class="profname">
          <img src=${tweetData.user.avatars}
          width="50" height="50">
       </a>
        <p class="user-name">${tweetData.user.name}</p>
        </div>
        <p class="handle">${tweetData.user.handle}</p>
      </header>

      <body class="tweet-body">
        <p>${tweetData.content.text}</p>
      </body>
  
      <footer>
        <p>${tweetData.created_at}</p>
        <div class="icons">
          <i id="icon1" class="fa-solid fa-flag"></i>
          <i id="icon2" class="fa-solid fa-retweet"></i>
          <i id="icon3" class="fa-solid fa-heart"></i>
        </div>
        </footer>
    </article>`);
    return $tweet;
  }
  
  $( "#tweet-form" ).submit(function( event ) {
    console.log("Handler for .submit() called.");
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).done(function() {
      console.log("request complete");
      fetchTweets();
    });
  });

  //  const loadTweets = function() {
  //   $.get( "/tweets", (<data>) => {
  //     // call renderTweets();
  //   })
  //  }


});
