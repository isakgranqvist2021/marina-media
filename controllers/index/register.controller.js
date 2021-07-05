import randStr from '../../utils/randStr';
import validators from '../../utils/validators';
import userModel from '../../models/user.model';

function get(req, res) {
    let token = randStr(200);
    req.session.token = token;

    return res.render('index/register', {
        token: token,
        alert: req.consumeAlert(),
        user: req.user
    });
}

async function post(req, res) {
    if (req.body.token !== req.session.token) {
        req.session.alert = { type: 'error', message: 'invalid token' };
        return res.redirect('/register');
    }

    if (!req.body.email) {
        req.session.alert = { type: 'error', message: 'please enter your email' };
        return res.redirect('/register');
    }

    if (!validators.email(req.body.email)) {
        req.session.alert = { type: 'error', message: 'please enter a valid email' };
        return res.redirect('/register');
    }

    if (!req.body.password) {
        req.session.alert = { type: 'error', message: 'please enter a password' };
        return res.redirect('/register');
    }

    try {
        let result = await userModel.register(req.body);
        req.session.uid = result._id;
        req.session.alert = { type: 'success', message: 'welcome' };
        return res.redirect('/users/account');
    } catch (err) {
        req.session.alert = { type: 'error', message: 'wrong password' };
        return res.redirect('/register');
    }
}

export default { get, post };