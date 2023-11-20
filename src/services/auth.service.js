const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const {createToken} = require('../jwt/jwtAction')
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = async (userPassword) => {
    return await bcrypt.hashSync(userPassword, salt);
}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}
const checkUserName = async (username) => {
    let userName = await UserModel.findOne({username: username});
    return !!userName;
}
const registerNewUser = async (name, username, password) => {
    try {

        // already exist ED === 5
        let isUsername = await checkUserName(username);
        if (isUsername) {
            return {
                EM: 'The username is already exist',
                EC: 5,
                DT: ''
            }
        }
        let hashPassword = await hashUserPassword(password);
        let user = new UserModel({
            name: name,
            username: username,
            password: hashPassword
        });
        await user.save();
        return {
            EM: 'register user successfully',
            EC: 0,
            DT: ''
        };
    } catch (err) {
        return {
            EM: 'register failed',
            EC: 1,
            DT: ''
        }
    }
}

const handleUserLogin = async (data) => {
    try {
        let user = await UserModel.findOne({username: data.username});
        if (user) {
            let incorrectPassword = checkPassword(data.password, user.password);
            let payload = {
                username: user.username,
                name: user.name,
                id: user._id.toString()
            }
            let token = await createToken(payload);
            if (incorrectPassword) {
                return {
                    EM: 'login oke!',
                    EC: 0,
                    DT: {
                        accessToken: token,
                        username: user.username,
                        name: user.name,
                        id: user._id.toString(),
                    }
                }
            } else {
                return {
                    EM: 'Your username  or password is incorrect',
                    EC: 1,
                    DT: ''
                }
            }
        } else {
            return {
                EM: 'Your username  or password is incorrect',
                EC: 1,
                DT: ''
            }
        }
    } catch (err) {
        console.log(err);
        return {
            EM: 'Login failed',
            EC: 1,
            DT: ''
        }
    }
}
module.exports = {
    registerNewUser,
    handleUserLogin,
}