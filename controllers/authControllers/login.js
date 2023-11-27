const login = async function (req, res) {
    if(req.isAuthenticated()) {
        res.status(200).json({
            status: 200,
            message: "User logged in successfully"    
    
    })
}
}

export default login;