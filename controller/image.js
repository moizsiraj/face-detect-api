const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "d7b607614ea34644a6a42d2f166d843b",
  });

  const handleApi = (res, req) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  }
  


const handleImage = (res, req, db)=>{
        const {id} = req.body
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        }).catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApi: handleApi
};