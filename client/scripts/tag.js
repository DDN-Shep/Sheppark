riot.tag('blog', '<blog-page each="{page, i in pages}" if="{active: page.active}"></blog-page><nav><ul class="pager pager-md"><li class="pager-prev {disabled: disabled}"><a href="#" onclick="{older}" __disabled="{disabled}"><span>Older</span></a></li><li each="{page, i in pages}" class="{active: page.active}"><a href="#" onclick="{activate}">{i + 1}</a></li><li class="pager-next {disabled: disabled}"><a href="#" onclick="{newer}" __disabled="{disabled}"><span>Newer</span></a></li></ul></nav>', 'blog, blog-page, blog-post, blog-pager, blog-search { display: block; width: 100%; }', function(opts) {

  this.pages = [];
  this.posts = [];
  this.showing = null;

  this.activate = function(e) {
    if (!e.item.page) return;

    if (!e.item.page.active) for (var i = 0; i < this.pages.length; i++) {
      this.pages[i].active = null;
    }
    e.item.page.active = true;       

    var $plx = $('.plx'),
        $blog = $('blog:first');

    $plx.animate({ scrollTop: ($blog.offset().top - $plx.offset().top + $plx.scrollTop()) - 10 }, 600);
  }.bind(this);

  this.newer = function(e) {
    for (var i = 0; i < this.pages.length; i++) {
      if (this.pages[i].active) {
        this.activate({ item: { page: this.pages[i + 1] } });
        break;
      }
    }
  }.bind(this);

  this.older = function(e) {
    for (var i = 0; i < this.pages.length; i++) {
      if (this.pages[i].active) {
        this.activate({ item: { page: this.pages[i - 1] } });
        break;
      }
    }
  }.bind(this);

  this.open = function(e) {
    console.log('showing', e.item);
    this.showing = e.item.id;
  }.bind(this);

  this.close = function(e) {
    this.showing = null;
  }.bind(this);
  
  this.on('mount', function() {
    var datums = window.bh.get(), i = 1;
    console.log('mount', datums);
    
    for (var o in datums) {
      console.log('iter', i, datums[o]);
      this.posts.push(datums[o]);
                                          
      if (i++ % 4 === 0) this.pages.push(this.posts.slice(i - 4, i));
    }
                                          
    if (!this.pages.length) this.pages.push(this.posts.slice(0));
    
    this.pages[0].active = true;
    
    console.log('posts', this.posts);
    this.update();
  });

});

riot.tag('blog-search', '<input id="blog-search" type="text" placeholder="Search here..." class="form-control">', function(opts) {
  
  this.on('mount', function() {
    $('#blog-search').typeahead(null, {
      name: 'tt-blog-search',
      display: 'title',
      source: window.bh,
      templates: {
        empty: [
          '<div class="tt-empty">',
          'Sorry, we can\'t find anything that matches your search',
          '</div>'
        ].join(''),
        suggestion: function(o) {
          return [
            '<div class="tt-suggestion">',
            o.title,
            '</div>'
          ].join('');
        }
      }
    });
  });

});

riot.tag('blog-page', '<blog-post each="{this.page}" collection="{this.parent.opts.collection}"><div class="card-block {editable: editable}" if="{showing === id}"><p class="card-text">{content}</p><a href="{url(opts.collection)}" onclick="{close}">Take me back</a></div><div class="card-block" if="{showing !== id}"><p class="card-text">{content.substr(0, 250)}...</p><a href="{url(opts.collection)}" onclick="{open}">Take me there</a></div></blog-post><yield ></yield>', 'id="{ id }"', function(opts) {

});

riot.tag('blog-pager', '', function(opts) {
  <!-- TODO -->

});

riot.tag('blog-post', '<div class="card-block"><h4 class="card-title {editable: editable}">{title}</h4><h6 class="card-subtitle text-muted {editable: editable}">{subtitle}</h6></div><figure class="figure {editable: editable}"><img riot-src="{picture.url}" alt="{picture.alt}" height="100%" width="100%"><figcaption class="figure-caption text-right"><a><span>A caption for the above image.</span><i class="fa fa-camera fa-fw"></i></a></figcaption></figure><yield ></yield>', 'id="{ id }" class="card"', function(opts) {

  this.url = function(collection, id, action) {
    return '#/' + this.opts.collection + '/' + this.opts.id + '/' + this.opts.action;
  }.bind(this);

});

riot.tag('raw', '<i></i>', function(opts) {

  this.root.innerHTML = opts.content

});
