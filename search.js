const client = algoliasearch('3J2D8ITRRP', '7aaf1b8db0ab4f0de35c2ed6649efeb5');
const site = client.initIndex('dev_MarketingSite');
const blog = client.initIndex('production_BLOG');
const docs = client.initIndex('production_DOCUMENTATION');

autocomplete(
  '#univ-search-input',
  {
    debug: true,
  },
  [
    {
        source: autocomplete.sources.hits(site, {hitsPerPage: 8}),
        displayKey: 'Losant',
        name: 'title',
        templates: {
            header: '<img class="title-icon" src="https://f.hubspotusercontent40.net/hubfs/742943/Website/Images/Icons/Red%20Circle/Losant-Red-Circle.svg"><div class="univ-dataset-site">Losant</div>',
            suggestion({url, featureImage, _highlightResult, _snippetResult}) {
                return `
                <a href="${url}">
                <img src="${featureImage}" height="50px";><br>
                <div style="display:inline-block;">
                    <h3>${_highlightResult.title.value}</h3>
                    <p>${_snippetResult.bodyText.value}</p>
                </div></a>`
                ;
            },
            empty: '<div class="univ-empty">No matching pages</div>',
        },
      
    }, 
    {
      source: autocomplete.sources.hits(blog, {hitsPerPage: 8}),
      displayKey: 'Blog',
      name: 'title',
      templates: {
        header: '<img class="title-icon" src="https://f.hubspotusercontent40.net/hubfs/742943/Website/Images/Icons/Red%20Circle/blog.svg"><div class="univ-dataset-blog">Blog</div>',
        suggestion({absoluteURL, featuredImage, _highlightResult}) {
          return `
          <a href="${absoluteURL}">
            <img src="${featuredImage}" height="50px";>
            <div style="display:inline-block;">
              <h3>${_highlightResult.title.value}</h3>
              <h4>By: ${_highlightResult.author.value}</h4>
              <p>${_highlightResult.body.value}</p>
            </div></a>`;
        },
        empty: '<div class="univ-empty">No matching blogs</div>',
      },
    },
    {
        source: autocomplete.sources.hits(docs, {hitsPerPage: 8}),
        displayKey: 'Documentation',
        name: 'title',
        templates: {
          header: '<img class="title-icon" src="https://f.hubspotusercontent40.net/hubfs/742943/Website/Images/Icons/Red%20Circle/docs.svg"><div class="univ-dataset-docs">Documentation</div>',
          suggestion({url, _highlightResult}) {
            return `
            <a href="https://docs.losant.com${url}"><div>
                <h3>${_highlightResult.title.value}</h3>
                <p>${_highlightResult.excerpt.value}</p>
              </div></a>`;
          },
          empty: '<div class="univ-empty">No matching documentation</div>',
        },
      },
  ]
);

search.start();

