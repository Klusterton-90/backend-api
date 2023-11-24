const logout = async function (req, res) {
    if (req.user) {
        req.logout();
        res.status(200).json({ message: "Log out successful" });
      }
}

export default logout;