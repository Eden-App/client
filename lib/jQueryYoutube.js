// ! NANTI MASUKIN LEWAT SERVER
// const queryString = require('query-string')

(function() {

  $("#youtubeSearch").keyup(() => {
    console.log($("#youtubeSearch").val())
  })

  $("#submitSearch").click(() => {
    let data = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBf9p6oC9YPUt7diOlcl31WpJwAleQZkw8&part=snippet,id&order=rating&maxResults=20&q=${$("#youtubeSearch").val()}`

    $.getJSON(data)
      .done(data => {
        
        for (let i in data.items) {
          $(".search").append(`
            <div class="eachVideo">
              <div id="${data.items[i].id.videoId}">
                <img src="${data.items[i].snippet.thumbnails.high.url}">
                <h3>${data.items[i].snippet.title}</h3>
                <br>
                <p>${data.items[i].snippet.description}</p>
                <hr>
                <br>
              </div>
            </div>
          `)
        }

        $(".eachVideo").click(function() {
          let query = $(this)[0].children[0].id

          // ? udah kaya ngerjain code wars gila
          // let query = $(this).html().slice($(this).html().indexOf('id=')).substr(4).split('"')[0]
          
          $("#player").empty()
          $("#player").append(`
            <iframe id="player" type="text/html" width="1080" height="720" src="http://www.youtube.com/embed/${query}?enablejsapi=1&origin=http://example.com" frameborder="0"></iframe>
          // `)
        })

        // data.items.each((i, each) => {
        //   console.log(data.items[i])
          // $("#se
        // })
      })
  })
})();