// Create items
function createNode(element) {
  return document.createElement(element);
}

// Attach items to dom
function append(parent, el) {
  return parent.appendChild(el);
}

// Get featured image, not finished
function returnMedia(mediaId) {
  mediaUrl = `http://wordpress-api.local/wp-json/wp/v2/media/${mediaId}`;
  if (mediaId != 0) {
    fetch(mediaUrl)
      .then((resp) => resp.json())
      .then(function(mediaObject) {
        console.log(mediaObject.guid.rendered)
        let featuredItemUrl = mediaObject.guid.rendered;
        mediaImg = createNode('img')
        mediaImg.src = featuredItemUrl;
        console.log(mediaImg);
        //append(card.mediaImg);
        // return mediaImg;
      })
  } else {
    console.log('No Media for this item');
  }
}

const postList = document.getElementById('post-list');
const url = 'http://wordpress-api.local/wp-json/wp/v2/posts';

fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let posts = data;
    return posts.map(function(post) {
      let postItem = createNode('div'),
          card = createNode('div')
      let getFeaturedItem = returnMedia(post.featured_media);
      postItem.className += "col-xs-12 col-sm-6 col-md-4 post-item mb-5 d-flex align-items-stretch";
      card.className += "card";
      card.innerHTML = `<div class="card-body">${getFeaturedItem}<div class="card-title"><h4>${post.title.rendered}</h4></div><p class="card-text">${post.excerpt.rendered}</p><a href="${post.link}" class="btn btn-primary">Read more</a></div></a>`;
      append(postItem, card);
      append(postList, postItem);
    })
  })
  .catch(function(error) {
    console.log(error);
  });