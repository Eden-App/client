(function () {

  // parsing date
  function dateParser(input) {
    return `${new Date(input).getFullYear()}/${new Date(input).getMonth()}/${new Date(input).getDate()}`
  }
  $("#search").keyup(function(inp) {
    if (inp.which === 13 && $("#search").val()) {
      $("#newsList").empty()
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/news/article",
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          // nanti isi q diganti value dari input
          "q": $("#search").val() || "jordan peterson"
        }
      })
        .done(function (data) {
          // ! masukin gambar kalo mau nanti
          // <img src="https://static01.nyt.com/${data.response.docs[i].multimedia[0].url}" width="100%"></img>

          for (let i in data.response.docs) {
            $("#newsList").append(`
              <div class="eachNews">
                <h6>${data.response.docs[i].keywords[1].value}</h6>
                <h5 id="${data.response.docs[i].web_url}">${data.response.docs[i].headline.main}</h5>
                <small>${data.response.docs[i].byline.original}</small>
                <br>
                <p>${data.response.docs[i].snippet}</p>
                <small>${dateParser(data.response.docs[i].pub_date)}</small>
                <br>
                <hr>         
              </div>
            `)
          }

          $(".eachNews").click(function () {
            console.log()
            console.log($(this)[0].children[1].id)
            $("#newsIframe").empty()
            $("#newsIframe").append(`
              <iframe src="${$(this)[0].children[1].id}" style="position: relative; height: 92%; width: 98%; border: none;"></iframe>
            `)
          })
          $("#search").val() = ''
        })
        .fail(function () {
          console.log("error");
        })
    } else {
      // dipake buat ngefilter inside text
      $(".eachNews").each(function(i, obj) {
        let eachObj = $(obj).text().split('\n')[2].trim()
        eachObj.indexOf($("#search").val()) !== -1 ?
          $(this).fadeIn(150) :
          $(this).fadeOut(150)
      })
    }
  })
  // insert onclick etc here.


  $.ajax({
    method: "POST",
    url: "http://localhost:3000/news/article",
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      // nanti isi q diganti value dari input
      "q": $("#search").val() || "jordan peterson"
    }
  })
    .done(function (data) {
      // ! masukin gambar kalo mau nanti
      // <img src="https://static01.nyt.com/${data.response.docs[i].multimedia[0].url}" width="100%"></img>
      

      for (let i in data.response.docs) {
        $("#newsList").append(`
        <div class="eachNews">
          <h6>${data.response.docs[i].keywords[1].value}</h6>
          <h5 id="${data.response.docs[i].web_url}">${data.response.docs[i].headline.main}</h5>
          <small>${data.response.docs[i].byline.original}</small>
          <br>
          <p>${data.response.docs[i].snippet}</p>
          <small>${dateParser(data.response.docs[i].pub_date)}</small>
          <br>
          <hr>         
        </div>
      `)
      }

      $(".eachNews").click(function () {
        console.log($(this)[0].children[1].id)
        $("#newsIframe").empty()
        $("#newsIframe").append(`
        <iframe src="${$(this)[0].children[1].id}" style="position: relative; height: 97%; width: 95%; border: none;"></iframe>
      `)

      })
    })
    .fail(function () {
      console.log("error");
    })
    // $("#newsList").on('click', function() {
    //   console.log($(this).text())
    // })

  $(".eachNews").click(function () {
    console.log($(this)[0].children[1].id)
    $("#newsIframe").empty()
    $("#newsIframe").append(`
      <iframe src="${$(this)[0].children[1].id}" style="position: relative; height: 98%; width: 93%; border: none;"></iframe>
    `)
  })
})();
