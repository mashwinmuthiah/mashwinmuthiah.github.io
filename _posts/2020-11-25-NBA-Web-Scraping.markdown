---
layout: post
title:  How Scraping NBA Stats is cooler than Michael Jordan
subtitle : Finding API endpoints and Client-side web scraping
author: Ashwin
categories: [ tutorial , NBA]
image: assets/images/NBA.jpg
---
This summer I picked up a new hobby of following the NBA, as a data enthusiast, I wanted to understand how this season of NBA was different on paper from the previous ones as this was played inside the bubble without any fans.

For acquiring relevant data I started by utilizing the python library beautiful soup. However, to my surprise, the data wasn’t stored on the HTML Source page. After some digging, I discovered that the NBA stats website was built with an AngularJS, which means that the site is rendered client-side instead of server-side.

### What is Client-side rendering

The HTML which is rendered is only a template and it doesn’t hold any data, The Javascript in the server response fetches the data from an API and uses it to create the page client-side.

Basically, when you view the pages source code, you wouldn’t find the data but just a template of the webpage.

![[NBA States Website](https://stats.nba.com/players/traditional/?SeasonType=Regular%20Season&sort=PTS&dir=-1&Season=2019-20)](https://cdn-images-1.medium.com/max/2640/1*6ay35LCsJn_9UJr6OuSsHg.png)

![Ctrl + U takes you to the Page source](https://cdn-images-1.medium.com/max/2640/1*pGIksJJN5pAu6wTg2_hVtQ.png)

## Let’s Get Started

In this article, we will be scraping the NBA stats website for the [League player’s stats.](https://stats.nba.com/players/traditional/?SeasonType=Regular%20Season&sort=PTS&dir=-1&Season=2019-20) After hours of researching, I decided to adopt a process that was a lot simpler than Beautiful soup.

### Finding the API endpoint from the website

The first step is to open the webpage you want to scrape on your web browser (preferably google chrome or firefox) and open the developer tools. To do this just right click select inspect.

![Right Click Followed by Inspect](https://cdn-images-1.medium.com/max/2000/1*jG_Fmj6ERa_r_joh1bWceg.jpeg)

This would open a panel either to the right or the bottom of the page, Select network and XHR, and reload the page.

![Inspect panel](https://cdn-images-1.medium.com/max/3600/1*ex45rW_LWZVAG7fu2YehIg.jpeg)

Once we reload the page, all the requests from the page will be visible. At this point, you should do some digging to find the request you want. Most probably the endpoint would be named after the webpage you are looking at.

Since we are looking at the league players’ stats page, the endpoint might be named something similar. Select every option and preview the results to find the correct endpoint.

![Select and Preview](https://cdn-images-1.medium.com/max/3600/1*sRbHnULuPeJjQ2EM0CEGkQ.jpeg)

Once you find the right endpoint you are all set to move to the next step.

### Calling the API endpoint to get the data

In order to call the API, we would make use of the [requests](https://requests.readthedocs.io/en/master/user/quickstart/#custom-headers) python package. In order to do so, We need 3 components as part of the request syntax below.

The first part is the URL, in our case since we are accessing the league player stats, we can get it from the last step.

Under the Header tab, select general and copy the first part of the request URL.

![Request URL](https://cdn-images-1.medium.com/max/3600/1*fxWr9AiFQkdXS6Y3p0eKRw.jpeg)

Next, we need the request headers, Which can also be found under the same Header tab but under “Request Headers” Subsection.

![Request Header](https://cdn-images-1.medium.com/max/3600/1*FWkHO5B8A_0yf9Xwswp_ng.jpeg)

Header as a dictionary

The final component we need is the parameters, which can be found under the “Query String Parameter” subsection under the Header tab.

![Parameters](https://cdn-images-1.medium.com/max/3600/1*JESvDtNXW7-MsbLGyLSkwQ.jpeg)

Parameters

Now that we have all three parts, it’s simple to call the API. The response can then be manipulated into a data frame for analysis.

Get request

The final request will look something like this,

![Dataframe](https://cdn-images-1.medium.com/max/2730/1*HDoJGRdnXbEsrI1PwuDmiw.jpeg)

## Thank You !!

Congratulations 👏 !! we have successfully scraped the NBA stats website.

PS: This process definitely works for [stats.nba.com](https://stats.nba.com/). This might also work for any other website which was built with a client-side web framework using languages such as AngularJS. If the website you are targeting is built with the server-side framework and languages like Django or Ruby on Rails then our friend Beautiful Soup will give you a hand.

Good luck with your web scraping journey! I hope this post is helpful.

Feel free to reach out to me on [Twitter](https://twitter.com/AshwinMuru) or [Linkedin](https://www.linkedin.com/in/ashwinmuthiah/) if you may have any questions.
