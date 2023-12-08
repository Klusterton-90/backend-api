const ensureAuth = async function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
        status: 401,
        message: "User Unauthorized"
    })
  }

  export default ensureAuth
