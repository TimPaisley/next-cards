var http = require('https'),
  Stream = require('stream').Transform,
  fs = require('fs')

const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

function download(url, dir, name) {
  http
    .request(url, function (response) {
      var data = new Stream()

      response.on('data', function (chunk) {
        data.push(chunk)
      })

      response.on('end', function () {
        fs.writeFileSync(dir + name, data.read())
      })
    })
    .end()
}

for (var i = 1; i <= 151; i++) {
  const name = i + '.png'
  download(base + name, '../public/sprites/', name)
}
