const tweetDiviDivided = document.getElementById('tweet-area');

tweetDiviDivided.innerText = "";
const anchor = document.createElement('a');
const hrefValue =


'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('スコア結果') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #スコア結果';
  tweetDivided.appendChild(anchor);
