var express = require('express');
var app = express();

const categoryGroup = [
  {
    category: 'Featured',
    games: [
      {

      }
    ]
  },
  {
    category: 'New',
    games:  [
      {

      }
    ]
  }
]

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.get('/api/categoryGroups/:categoryGroupId', function (req, res) {
  res.json(categoryGroup);
});

app.get('/api/categoryGroups/:categoryGroup/:categoryName', function (req, res) {
  res.json(categoryGroup.filter(c => c.category.toLowerCase() === req.params.categoryName.toLowerCase())[0]);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
