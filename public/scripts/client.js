/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  $(".error-bar").hide();

  const fetchTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (tweetList) {
      console.log("Success: ", tweetList);
      renderTweets(tweetList);
    });
  };
  fetchTweets();

  const renderTweets = function (tweets) {
    const tweetContainer = $(".tweets-container");
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      tweetContainer.prepend(newTweet);
    }
  };

  const createTweetElement = function (tweetData) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `${escape(tweetData.content.text)}`;
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

      <div class="tweet-body">
        <p>${safeHTML}</p>
      </div>
  
      <footer>
        <p>${timeago.format(tweetData.created_at)}</p>
        <div class="icons">
          <i id="icon1" class="fa-solid fa-flag"></i>
          <i id="icon2" class="fa-solid fa-retweet"></i>
          <i id="icon3" class="fa-solid fa-heart"></i>
        </div>
        </footer>
    </article>`);
    return $tweet;
  };

  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(".error-text").text("your tweet cannot be empty");
      return $(".error-bar").slideDown();
    }
    if ($("#tweet-text").val().length > 140) {
      $(".error-text").text("Your tweet exceeds the character limit");
      return $(".error-bar").slideDown();
    } else {
      $(".error-bar").hide();
    }
    console.log("Handler for .submit() called.");
    console.log($(this).serialize());
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
    }).done(function () {
      console.log("request complete");
      $("#tweet-text").val("");
      $(".counter").text(140);
      fetchTweets();
    });
  });
});
