self.addEventListener('fetch', function(event) {
  if (event.request.url.includes('/api/categoryGroups/')) {
    const paths = event.request.url.split('/');
    const categoryGroupId = paths[paths.length - 2];
    const categoryName = paths[paths.length - 1];

    //TODO check db - if empty call server and get category
    event.respondWith(fetch(event.request));

    //TODO then get full category group from server and add each category to the DB
  }
});
