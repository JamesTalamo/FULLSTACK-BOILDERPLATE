import User from "../model/Users.js"
import bcrypt from 'bcrypt'
import generateCookie from "../library/generateCookie.js"


export const RegisterUser = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ error: 'username and password required.' })

    const userExist = await User.findOne({ username })


    if (userExist) return res.status(400).json({ error: 'username already exist.' })
    if (password.length < 6) return res.status(400).json({ error: 'password must be 6 characters long.' })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username: username, password: hashPassword })
    newUser.save()

    res.status(200).json({ success: `${username} created` })
}

export const LoginUser = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ error: 'username and password required.' })

    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'user does not exist.' })

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) return res.status(400).json({ error: 'password does not match.' })


    generateCookie(user._id, res)

    res.status(200).json({ success: `Welcome ${username}` })
}

export const LogoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 0,
        httpOnly: 'true',
        secure: 'true',
        sameSite: 'none'
    })

    res.status(200).json({ success: 'successfully logout.' })
}

export const getMe = async (req, res) => {
    res.status(200).json(req.user)
}

