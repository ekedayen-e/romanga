const Jikan = require('jikan4.js')
const client = new Jikan.Client()


exports.search = async(req, res) => {
    const {show} = req.query
    let result = await client.manga.search(`${show}`)
    res.send(result)
}

exports.top = async(req, res) => {
    let result = await client.manga.listTop({filter: "bypopularity", type: "manga"}, null, 5);
    res.send(result)
}

exports.get = async(req, res) => {
    id = req.params.id
    let result = await client.manga.get(id)
    res.send(result)
}

exports.news = async(req, res) => {
    let manga = await client.manga.listTop({filter: "favorite", type: "manga"}, null, 1);
    let id = manga[0].id
    let news = await client.manga.getNews(id)
    res.send(news)

}