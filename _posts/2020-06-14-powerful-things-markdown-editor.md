---
layout: post
title:  "Powerful things you can do with the Markdown editor"
subtitle: "A Tutorial on Markdown"
author: Ashwin
categories: [ Markdown, tutorial ]
image: assets/images/Markdown.jpg
---
There are lots of powerful things you can do with the Markdown editor. If you've gotten pretty comfortable with writing in Markdown, then you may enjoy some more advanced tips about the types of things you can do with Markdown!

As with the last post about the editor, you'll want to be actually editing this post as you read it so that you can see all the Markdown code we're using.


## Special formatting

As well as bold and italics, you can also use some other special formatting in Markdown when the need arises, for example:
```
+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*
```
+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*


## Writing code blocks

There are two types of code elements which can be inserted in Markdown, the first is inline, and the other is block. Inline code is formatted by wrapping any word or words in back-ticks, `like this`. Larger snippets of code can be displayed across multiple lines using triple back ticks:

```
.my-link {
    text-decoration: underline;
}
```

If you want to get really fancy, you can even add syntax highlighting using Rouge.

```
![walking]({{ site.baseurl }}/assets/images/markdown-code.jpg)
```
![walking]({{ site.baseurl }}/assets/images/markdown-code.jpg)

## Reference lists

The quick brown jumped over the lazy.

Another way to insert links in markdown is using reference lists. You might want to use this style of linking to cite reference material in a Wikipedia-style. All of the links are listed at the end of the document, so you can maintain full separation between content and its source or reference.

## Full HTML

Perhaps the best part of Markdown is that you're never limited to just Markdown. You can write HTML directly in the Markdown editor and it will just work as HTML usually does. No limits! Here's a standard YouTube embed code as an example:
```
<p><iframe width="789" height="444" src="https://www.youtube.com/embed/LXb3EKWsInQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
```
<p><iframe width="789" height="444" src="https://www.youtube.com/embed/LXb3EKWsInQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
