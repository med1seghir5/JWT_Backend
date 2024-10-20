exports.getCurrentUser = (req, res) => {
    const user = req.body;
    if(user){
        return res.status(200).json({currentUser: user});
    } else{
        return res.status(401).json({message: 'Unauthorized'});
    }
};