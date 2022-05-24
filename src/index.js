import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#search').click(function() {
    const searchWords = $('#keywords').val();
    $('#keywords').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchWords}&limit=25&offset=0&rating=pg-13&lang=en`;

    console.log(url);

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getGifsArray(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getGifsArray(response) {
      let gifArray = [];

      response.data.map(function(gif){
        gifArray.push(gif.images.downsized_small.mp4);
      });

      $('.displayGif1').html('"<img src="' + `${gifArray[0]}` + "'>");
      $('.displayGif2').html('<img src="' + `${gifArray[1]}` + '">');
      $('.displayGif3').html(`<img src="${gifArray[2]}">`);
      $('.displayGif4').html("<img src=" + `"${gifArray[3]}"` + ">");
      $('.displayGif5').html("<img src=" + `"${gifArray[4]}"` + ">");
    }
  });
});