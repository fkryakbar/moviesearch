const cari = document.querySelector("#cari")
const content =  document.getElementById("content")
cari.addEventListener("click", function() {
    content.innerHTML = ""
    const input = document.getElementById("input").value
    const ajax = new XMLHttpRequest()
ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
          if(ajax.status == 200) {
              let res = JSON.parse(ajax.response).Search
              let cards = ''
              res.forEach(el => {
                  content.innerHTML +=  `<div class="col-md-4 my-3">
                      <div class="card">
                          <img src="${el.Poster}" class="card-img-top">
                          <div class="card-body">
                            <h5 class="card-title">${el.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${el.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-movie="${el.imdbID}">Detail</a>
                          </div>
                        </div>
                  </div>`
              
              });
              let detail = document.querySelectorAll(".modal-detail")
              detail.forEach(function(btn) {
                  btn.addEventListener("click", function(){
                      const newdetail = new XMLHttpRequest()
                      newdetail.onreadystatechange = function() {
                          if (newdetail.readyState == 4){
                              if(newdetail.status == 200) {
                                  let getdetail = JSON.parse(newdetail.response)
                                  let modal = `<li class="list-group-item"><h4>${getdetail.Title}</h4></li>
                                  <li class="list-group-item"><strong>Tahun Rilis : </strong>${getdetail.Year}</li>
                                  <li class="list-group-item"><strong>Sutradara : </strong>${getdetail.Director}</li>
                                  <li class="list-group-item"><strong>Genre : </strong>${getdetail.Genre}</li>
                                  <li class="list-group-item"><strong>Pemain : </strong>${getdetail.Actors}</li>
                                  <li class="list-group-item"><strong>Writer : </strong>${getdetail.Writer}</li>
                                  <li class="list-group-item"><strong>Durasi : </strong>${getdetail.Runtime}</li>
                                  <li class="list-group-item"><strong>Sinopsis : </strong> <br>${getdetail.Plot}</li>`
                                  let img = `<img src="${getdetail.Poster}" class="img-fluid">`
                              let putmodal = document.querySelector(".list-group")
                              let putimg = document.querySelector("#img")
                              putmodal.innerHTML = modal
                              putimg.innerHTML = img
                              }
                          }
                      }
                      newdetail.open('get', `http://www.omdbapi.com/?apikey=2e784222&i=${btn.dataset.movie}`)
                      newdetail.send()
                })
})
              
          }
      }
      
  }
ajax.open('get', `http://www.omdbapi.com/?apikey=2e784222&s=${input}`)
ajax.send()
    
})