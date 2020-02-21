---
id: shopify
title: Shopify
sidebar_label: Shopify
---

# Snippets

## Debugging Liquid Variables (console.log)

Dump/print variables in console using snippet - via: https://github.com/Shopify/liquid/issues/121#issuecomment-266620549

Create a snippet named "dump.liquid" with the following code snippet  
_Note: if you use a different filename for the liquid snippet, make sure the variable being passed through liquid's json filter is also the same name, otherwise this shorthand usage won't work as expected_

    'dump.liquid'
    <script type="text/javascript">
     console.log("Dumping");
     console.log({{ dump | json }});
    </script>

Usage in template files:  
`{% include 'dump' with [OBJECT] %}`

Example: Used within product.liquid template file  
`'product.liquid' {% include 'dump' with product %}`

Open Chrome console and you will see an object that you can drill into and explore.

## Infinite Scroll for Collections

### Mobile-only

**collection-grid.liquid**:

```js
{% paginate collection.products by 20 %}

<!-- START PRODUCTS -->
{% for product in collection.products %}
      <div class="product" id="product-{{ forloop.index | plus:paginate.current_offset }}">
            {% include 'product' with product %}
        </div>
      <!-- END PRODUCT {{ forloop.index | plus:paginate.current_offset }} -->
{% endfor %}

{% if paginate.next %}
    <div id="AjaxinatePagination"><p>&darr; <a href="{{ paginate.next.url }}">More</a></p></div>
{% endif %}

<div id="product-list-foot"></div>
<!-- END PRODUCTS -->

<!-- the bottom of your collections.liquid -->
{% endpaginate %}
```

**collection.liquid**:

```js
{% if template contains 'collection' %}

function ScrollExecute() {
  if($(document).height() - 800 < ($(document).scrollTop() + $(window).height())) {
      scrollNode = $('#AjaxinatePagination').last();
      scrollURL = $('#AjaxinatePagination a').last().attr("href");
      if(scrollNode.length > 0 && scrollNode.css('display') != 'none') {
          $.ajax({
              type: 'GET',
              url: scrollURL,
              beforeSend: function() {
                  // scrollNode.clone().empty().insertAfter(scrollNode).append('<img src=\"{{ "loading.gif" | asset_url }}\" />');
                  scrollNode.hide();
              },
              success: function(data) {
                  // remove loading feedback
                  scrollNode.next().remove();
                  var filteredData = $(data).find(".product-grid");
                  var checkLastPage = $('#AjaxinatePagination a').last();
                  var nextUrl = $(data).find('#AjaxinatePagination a').last().attr("href");

                  // Change next page URL to current page of infinite scroll
                  // If last page, remove link
                  if(nextUrl) {
                    $('#AjaxinatePagination a').last().attr('href', nextUrl);
                    scrollNode.show();
                  } else {
                    scrollNode.hide();
                  }
                  console.log('is last page?', checkLastPage);
                  if(checkLastPage) {
                    filteredData.appendTo( $("#AjaxinateLoop") );
                  }
              },
              dataType: "html"
          });
      }
  }
}

$(document).ready(function () {
  // Only activate infinite scroll on mobile devices
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $(window).scroll(function(){
      $.doTimeout( 'scroll', 200, ScrollExecute);
  });
}
});
{% endif %}

```

### Collection version

Collection infinite scroll using Shopify GraphQL API

```js
{% comment %}
  The contents of the collection.liquid template can be found in /sections/collection-template.liquid
{% endcomment %}
{% assign limit = 18 %}
{% include 'collection-template' with limit %}

<script>
Shopify.queryParams = {};
if (location.search.length) {
  for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}
jQuery('#sort-by')
  .val('{{ collection.sort_by | default: collection.default_sort_by | escape }}')
  .bind('change', function() {
    Shopify.queryParams.sort_by = jQuery(this).val();
    location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
  });
$(".filter-menu__bd .heading .icon").click(function(){
	$(".filter-menu__bd.mobile").slideToggle();
    $(".filter-menu__bd.mobile").removeClass('collapse__bd--open');
    $(".main-content").removeClass('active');
});
$(".filter-group__header").click(function(){
	$(this).next('.scroll-content').slideToggle();
    $(this).closest('.filter-group').find('.icon').toggle();
});
    $(".mobile-sort").click(function(){
	 	var link = window.location.pathname;
      	var sort = $(this).data("link");
      	window.location.href = link + sort;
    });
$(".pt-mobile-header .sort").click(function(){
	$(".mobile-sort-popup").slideToggle();
    $(".main-content").addClass('active');
});
$(".mobile-sort-popup .icon-close").click(function(){
	$(".mobile-sort-popup").slideToggle();
    $(".main-content").removeClass('active');
});
$(".pt-mobile-header .filter").click(function(){
  	$(".main-content").addClass('active');
    $(".filter-menu__bd.mobile").slideToggle();
});
$(document).ready(function(){
  setTimeout(function(){

  }, 200);
  var valuex = $('#sort-by>option:selected').text();
  $('.sort-value').text(valuex);
});
</script>


{% comment %} Adds infinite scroll {% endcomment %}
{% comment %} <script>
document.addEventListener("DOMContentLoaded", function() {
  var endlessScroll = new Ajaxinate();
  console.log('infinite scroll activated')
});
</script> {% endcomment %}

<script>
{% if template contains 'collection' %}
function currentPageQuery(collectionName) {
  return `{
    collectionByHandle(handle: "${collectionName}") {
      title
      products(first:18){
        edges{
          node{
            title
          }
          cursor
        }
      }
    }
  }`;
}
function nextPageQuery(collectionName, cursorId) {
  return `{
    collectionByHandle(handle: "${collectionName}") {
      title
      products(first:6, after: "${cursorId}"){
        edges{
          node{
            title
            onlineStoreUrl
            images(first:1){
              edges{
                node{
                  transformedSrc(maxWidth:480)
                }
              }
            }
          }
          cursor
        }
      }
    }
  }`;
}
let infiniteCurrentCursor;
const ShopifyStorefrontUrl = "https://vapor.com/api/graphql";
const ShopifyStorefrontToken = "f7ce5d420c5c327f1b478e68d5350f55";
        function infiniteCollectionQuery(collectionName) {
            new Promise(function(resolve, reject) {
              $.ajax({
                        type: 'POST',
                        url: ShopifyStorefrontUrl,
                        contentType: 'application/json',
                        headers: {
                          "X-Shopify-Storefront-Access-Token": ShopifyStorefrontToken,
                        },
                        data: JSON.stringify({
                          query: nextPageQuery(collectionName, infiniteCurrentCursor),
                        }),
                        beforeSend: function() {
                            // scrollNode.clone().empty().insertAfter(scrollNode).append('<img src=\"{{ "loading.gif" | asset_url }}\" />');
                            scrollNode.hide();
                        },
                        success: function(data) {
                          console.log('second data', data);
                          // create HTML nodes with data
                          $.each(JSON.parse(data.data.collectionByHandle.products.edges), function(index, product) {
                              $('.container').append(
                                  `<div class="col-md-3">
                                      <div class="thumbnail">
                                          <img src="${product.images.edges[0].node.transformedSrc}" class="img-rounded img-responsive" width="100%"></img>
                                          <div class="caption">
                                              <p>${product.title}</p>
                                          </div>
                                      </div>
                                  </div>`
                              );
                          });
                        }
                    });
            })
        }
         function grabFirstCursor(collectionName) {
           return new Promise(function(resolve, reject) {
            $.ajax({
                        type: 'POST',
                        url: ShopifyStorefrontUrl,
                        contentType: 'application/json',
                        headers: {
                          "X-Shopify-Storefront-Access-Token": ShopifyStorefrontToken,
                        },
                        data: JSON.stringify({
                          query: currentPageQuery(collectionName),
                        }),
                        beforeSend: function() {
                            // scrollNode.clone().empty().insertAfter(scrollNode).append('<img src=\"{{ "loading.gif" | asset_url }}\" />');
                            scrollNode.hide();
                        },
                        success: function(data) {
                          console.log('first cursor data', data.data.collectionByHandle, data.data.collectionByHandle.products.edges[17].cursor);
                          if(data.data.collectionByHandle) {
                            console.log('resolving the cursor data');
                            resolve(data.data.collectionByHandle.products.edges[17].cursor);
                          }
                        }
                    });
           });
         }
         function ScrollExecute() {
            if($(document).height() - 800 < ($(document).scrollTop() + $(window).height())) {
                scrollNode = $('#AjaxinatePagination').last();
                scrollURL = $('#AjaxinatePagination a').last().attr("href");
                collectionName = window.location.href.replace('https://www.vapor.com/collections/', '').replace(window.location.search, '');
                if(scrollNode.length > 0 && scrollNode.css('display') != 'none') {
                  if(infiniteCurrentCursor === undefined) {
                    console.log('first cursor query');
                    grabFirstCursor(collectionName).then(function(firstCursor) {
                      // Maybe set as data attribute instead of global var?
                      infiniteCurrentCursor = firstCursor;
                      return firstCursor;
                    }).then(function(data) {
                      console.log('start second query with cursor ->', data);
                      if(data) {
                        infiniteCollectionQuery(collectionName);
                      }
                    })
                  } else {
                    console.log('second cursor query');
                    return infiniteCollectionQuery(collectionName);
                  }
                }
            }
         }

         $(document).ready(function () {
           // Only activate infinite scroll on mobile devices
           if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
             // Hide Pagination numbers
           $('.pagination__text').hide();

           // Activates infinite scroll with debounce
            $(window).scroll(function(){
                $.doTimeout( 'scroll', 200, ScrollExecute);
            });
          }
         });
    {% endif %}
</script>
```
