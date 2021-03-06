const handleRegister = (res, req, db, bcrypt)=>{
    const {name, email, password} = req.body
    if(!email ||!name||!password){
        return res.status(400).json('invalid submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
        .returning("email")
        .then(emailLogin => {
            return trx('users')
            .returning('*')
            .insert({
                email: emailLogin[0],
                name: name,
                joined: new Date
            }).then(user =>{
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};