<blog>
  <blog-page each={ page, i in pages } if={ active: page.active } />
  <nav>
    <ul class='pager pager-md'>
      <li class='pager-prev { disabled: disabled }'>
        <a href='#' onclick={ older } disabled={ disabled }><span>Older</span></a>
      </li>
      <li each={ page, i in pages } class={ active: page.active }>
        <a href='#' onclick={ activate }>{ i + 1 }</a>
      </li>
      <li class='pager-next { disabled: disabled }'>
        <a href='#' onclick={ newer } disabled={ disabled }><span>Newer</span></a>
      </li>
    </ul>
  </nav>
  <style>
    blog, blog-page, blog-post, blog-pager {
      display: block;
    }
  </style>
  
  this.pages = [];
  this.posts = [];
  this.showing = null;
  
  activate(e) {
    if (!e.item.page) return;
  
    if (!e.item.page.active) for (var i = 0; i < this.pages.length; i++) {
      this.pages[i].active = null;
    }
    e.item.page.active = true;       
    
    var $plx = $('.plx'),
        $blog = $('blog:first');
                                                                   
    $plx.animate({ scrollTop: ($blog.offset().top - $plx.offset().top + $plx.scrollTop()) - 10 }, 600);
  }.bind(this);
  
  newer(e) {
    for (var i = 0; i < this.pages.length; i++) {
      if (this.pages[i].active) {
        this.activate({ item: { page: this.pages[i + 1] } });
        break;
      }
    }
  }.bind(this);
  
  older(e) {
    for (var i = 0; i < this.pages.length; i++) {
      if (this.pages[i].active) {
        this.activate({ item: { page: this.pages[i - 1] } });
        break;
      }
    }
  }.bind(this);
  
  open(e) {
    this.showing = e.item.id;
  }.bind(this);
  
  close(e) {
    this.showing = null;
  }.bind(this);
  
  for (var i = 1; i <= 9; i++) {
    this.posts.push({ 
      id: 'post-' + i, 
      title: 'Post ' + i, 
      subtitle: 'Sub-post ' + i,
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      raw: null,
      image: {
        url: 'http://unsplash.it/500/250?random=' + i,
        alt: 'Unsplash image #' + i   
      } 
    });
  
    if (i % 3 === 0) this.pages.push((function(a, b){ a.active = b; return a; })(this.posts.slice(i - 3, i), i === 3));
  }
</blog>

<blog-page id={ id }>
  <blog-post each={ this.page } collection={ this.parent.opts.collection }>
    <div class='card-block { editable: editable }' if={ showing === id }>
      <p class='card-text'>{ content }</p>
      <a href={ url(opts.collection) } onclick={ close }>Take me back</a>
    </div>
    <div class='card-block' if={ showing !== id }>
      <p class='card-text'>{ content.substr(0, 250) }...</p>
      <a href={ url(opts.collection) } onclick={ open }>Take me there</a>
    </div>
  </blog-post>
  <yield />
</blog-page>

<blog-pager>
  <nav>
    <ul class='pager pager-md'>
      <li class='pager-prev { disabled: disabled }'>
        <a href='#' onclick={ older } disabled={ disabled }><span>Older</span></a>
      </li>
      <li each={ page, i in this.parent.pages } class={ active: page.active }>
        <a href='#' onclick={ activate }>{ i + 1 }</a>
      </li>
      <li class='pager-next { disabled: disabled }'>
        <a href='#' onclick={ newer } disabled={ disabled }><span>Newer</span></a>
      </li>
    </ul>
  </nav>
</blog-pager>

<blog-post id={ id } class='card'>
  <div class='card-block'>
    <h4 class='card-title { editable: editable }'>{ title }</h4>
    <h6 class='card-subtitle text-muted { editable: editable }'>{ subtitle }</h6>
  </div>
  <figure class='figure { editable: editable }'>
    <img src={ image.url } alt={ image.alt } height='100%' width='100%' />
    <figcaption class='figure-caption text-right'>
      <a>
        <span>A caption for the above image.</span>
        <i class='fa fa-camera fa-fw'></i>
      </a>
    </figcaption>
  </figure>
  <yield />
  
  url(collection, id, action) {
    return '#/' + this.opts.collection + '/' + this.opts.id + '/' + this.opts.action;
  };
</blog-post>
  
<raw>
  <i></i>

  this.root.innerHTML = opts.content
</raw>
