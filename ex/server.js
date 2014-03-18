var http = require('http')
var url = require('url')


http.createServer(function (req, res) {
	var path = url.parse(req.url).pathname
	var query = url.parse(req.url, true).query
	var date = new Date(query['iso'])
	var result = {}
	if(path == "/api/parsetime") {
		result['hour'] = date.getHours()
		result['minute'] = date.getMinutes()
		result['second'] = date.getSeconds()
	} else if (path == "/api/unixtime") {
		result['unixtime'] = date.getTime()
	} else {
		result['youAreDumb'] = true
	}
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.end(JSON.stringify(result))
}).listen(process.env.PORT || 3000)