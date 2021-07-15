function get(req, res) {
    return res.render('users/settings', {
        title: 'Account Settings',
        user: req.user,
        alert: req.consumeAlert()
    });
}

export default { get };