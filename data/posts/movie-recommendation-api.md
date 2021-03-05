---
title: Adam Brock Movie Recommendation API
date: "2017-05-16"
---

<img src="/media/blog/movie-recommendation-api/adam-brock.gif" alt="Adam Brock" class="float-left" />

Our colleague Adam Brock loves movies and TV shows — he’s seen everything and knows every actor and always has a movie in mind for every situation he’s in. He’ll even have a _Nicholas Cage film_ for every situation he’s in.

So we’ve plugged him in — **Adam as a Service (AaaS)**.

Use our **brand new API** to get **personalised, expert movie recommendations** delivered straight to you. Simply include the provided Javascript (via CDN or NPM) and you can make MovieRecommendation requests in as little as 2 lines of code!

~~~js
var ABMRAPI = require('adam-brock-movie-recommendation-api');
var myMovieRecommendation = await ABMRAPI
    .requestMovieRecommendation('Suggest a movie for me!');
~~~

## Features

- **Asynchronous**—Responses usually under 24 hours
- Uses the **Promises** API—For every MovieRecommendation request that you make, we Promise you’ll get ~a good~ one*
- **Personalised**—The more movies you ask about, the more Adam knows what you like and what to suggest
- **Plain-English Query Language (PEQL)**—Make requests naturally; PEQL is remarkably like writing a sentence.
- **Simple** to use—Just submit a String and receive a String

## Examples

**Query:** Hey Adam, this week I watched Blade Runner and Ghost in the Shell (the new Scarlett Johansson one), and I’m in a cyberpunk-future-city-but-also-retro-80s-synth-neo-tokyo-ish mood. What should I watch next?

**Response:** Ooh, nice. You seen Akira? That’s a good one to watch after Ghost in the Shell.

_*Note — The technology is still under development, some queries may have side effects:_

**Query:** So I’ve FINALLY finished Black Mirror AND Chef’s Table. Such a lol contrast of dystopian future/present and utopian outlook on food production. WHAT DO I WATCH NEXT SO I FEEL BETTER ABOUT THE WORLD?

**Response:** Very nice! Hmmm, I’m the wrong guy to ask about shows filled with hope.

## Code Example

```html
<div id="result"></div>
<script src="abmrapi.js"></script>
<script>
  var api = new ABMRAPI();
  var result = document.getElementById('result');
  api.requestMovieRecommendation('Suggest a movie for me!')
      .then((MovieRecommendation) => { 
          result.innerHTML = myMovieRecommendation;
      });
</script>
```

## But really

Adam is a great colleague and a pleasure to work with. And he really does love movies. He once spent half a client meeting reciting Nicholas Cage’s filmography, in chronological order.