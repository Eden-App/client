mangaList()


            

            $(document).keypress(function(event) {
                var keycode = event.keyCode || event.which;
                if(keycode == '13') {
                    const value = $("#mySearch").val().toLowerCase().split(' ').join(',')
                    console.log(value);
                    if(value !== '') searchManga(value)
                    else mangaList()
                }
            });
            
            

            
            
            
        // });

        function searchManga(value) {
            $.ajax({
                    method: 'GET',
                    url: `http://localhost:3000/mangas/search/${value}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .done(result => {
                        console.log('masuk ajax');
                        
                        console.log(result);
                        $('#mangalist').empty()
                        let data = result.data
                        data.forEach(oneData => {
                            $('#mangalist').append(
                                `
                                <div id="manga-button" value="${oneData.i}" onclick="mangaDetail('${oneData.i}')" class="spaces text-center" style="width: 77px"> 
                                    <image class="cover card-img-top" src="https://cdn.mangaeden.com/mangasimg/${oneData.im}" />
                                    <p style="font-size: 9px;">${oneData.t}</p>
                                </div>                            
                                
                                `
                            )
                        })
                    })
                    .fail(err => {
                        console.log(err);
                        
                    })
        }


        // $(document).ready( function() {
        function mangaList() {
            $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/mangas/2',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .done(result => {
                    console.log('masuk ajax');
                    
                    console.log(result);
                    $('#mangalist').empty()
                    let data = result.data.manga
                    data.forEach(oneData => {
                        $('#mangalist').append(
                            `
                            <div id="manga-button" value="${oneData.i}" onclick="mangaDetail('${oneData.i}')" class="card spaces text-center" style="width: 77px"> 
                                <image class="cover card-img-top" src="https://cdn.mangaeden.com/mangasimg/${oneData.im}" />
                                <p style="font-size: 9px;">${oneData.t}</p>
                            </div>                            
                            
                            `
                        )
                    })
                })
                .fail(err => {
                    console.log(err);
                    
                })
            }

            function mangaDetail(id) {
                console.log('masuk id ', id);
                
                $.ajax({
                    method: 'GET',
                    url: `http://localhost:3000/mangas/manga/${id}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                    
                })
                    .done(result => {
                        console.log('masuk ajax');
                        
                        console.log(result.data);
                        $('#manga-detail').empty()
                        let data = result.data
                            
                        
                            $('#manga-detail').append(
                                `
                                <div class="container">
                                    <h1>${data.title}</h1>
                                    <image class="c" src="https://cdn.mangaeden.com/mangasimg/${data.image}" />
                                    <p>${data.description}</p>
                                </div>     
                                
                                <br>
                                <h3>Chapters:</h3>
                                <div id="chapter-list">
                                    
                                </div>
                                
                                `
                            )
                            chapterList(data.chapters)
                        
                    })
                    .fail(err => {
                        console.log(err);
                        
                    })
            }


            function chapterList(chapters) {
                console.log('aku chapter', chapters);
                $('#chapter-list').empty()
                for (let i = 0; i < chapters.length; i++) {
                    console.log();
                    
                    $('#chapter-list').append(
                        `
                        <button class="btn btn-light try" onclick="mangaChapter('${chapters[i]}')" data-toggle="modal" data-target="#chapterModal">'${chapters[i][2]}'</button>                           
                        
                        `
                    )
                }
                
                
            }

            function mangaChapter(array) {
                console.log('masuk ichapter ', array);
                array = array.split(',')
                let id = array[3]
                
                $.ajax({
                    method: 'GET',
                    url: `http://localhost:3000/mangas/manga/chapter/${id}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                    
                })
                    .done(result => {
                        console.log('masuk ajax');
                        
                        console.log(result.data);
                        $('#chapter-title').empty()
                $('#chapter-images').empty()
                        let data = result.data.images
                            
                        
                            

                            for (let i = 0; i < data.length; i++) {
                                $('#chapter-images').append(
                                    `
                                    <image class="" src="https://cdn.mangaeden.com/mangasimg/${data[i][1]}" />
                                    
                                    `
                                )
                            }

                             
                            
                        
                    })
                    .fail(err => {
                        console.log(err);
                        
                    })
            }

            function removeChapterPages() {
                $('#chapter-title').empty()
                $('#chapter-images').empty()
            }