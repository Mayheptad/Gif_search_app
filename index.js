import express from 'express'
import fetch from 'node-fetch';
const app = express()

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let giphyDataArr;

app.get('/', function (req, res) {
  res.render('home', {giphyDataArr:[]});
})


app.post('/', async function (req, res) {
  const searchTerm = req.body.inputBox

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=deokzgUjxm6QHQdp3H3aca1LSZcCpucc&q=${searchTerm}&limit=25&offset=0&rating=Y&lang=en`);
    const giphyData = await response.json();
    if(giphyData.meta.status == 200 && giphyData.meta.msg == 'OK'){
      giphyDataArr = giphyData.data
      res.render('home', {giphyDataArr:giphyDataArr});
    }else{
      res.render('home', {giphyDataArr:['Something Went Wrong, PLease try again later']});
    }
  }
  catch(err){
    console.log(err.message)
    res.render('home', {giphyDataArr:['Something Went Wrong, PLease try again later']});
  }
})


app.get('/posts/:id', async function(req, res){

  const clickedGifDataArr = giphyDataArr.find((eachGif)=>{
  return eachGif.id == req.params.id
  })

  res.render('posts', {clickedGifDataArr: clickedGifDataArr});

})


app.listen(3000, _ => console.log('server running on port 3000'))