---
layout: default
slug: blog
permalink: /bloblog/
---
<div class="timeline timeline--one-column">
{% for post in site.posts %}
{% assign currentdate = post.date | date: "%Y" %}
{% if currentdate != date %}
  <div class="card card_label card_label--year">{{ currentdate }}</div>
{% assign date = currentdate %}
{% endif %}
    <article class="card--outer" itemscope itemtype="http://schema.org/BlogPosting">
      <a href="{{ post.url }}">

        <div class="card card_content">
          <header>
            <h2 class="timeline_card-title" itemprop="name headline">{{ post.title }}</h2>
            <aside>
              <time class="card_time" itemprop="datePublished" datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%B %d, %Y" }}</time>
              <span class="card_tags" itemprop="keywords"> KEYWORDS </span>
            </aside>
          </header>
          <div class="card_excerpt">
            {{ post.content }}
          </div>
        </div>
      </a>
    </article>
{% endfor %}
  <div class="card card_label card_label--hello-world">Hello World!</div>
</div>

{% highlight javascript %}
Timer.prototype.applyEasing = function() {
  var t = this.percentage;
  if (this.easing === 'ease-in') {
    return t * t;
  } else if (this.easing === 'ease-out') {
    return t * (2 - t);
  } else if (this.easing === 'ease-in-out') {
    if (t < 0.5) {
      return 2 * t * t;
    } else {
      return -1 + (4 - 2 * t) * t;
    }
  }
  return t; // default is linear.
};
{% endhighlight %}
