import jwt from 'jsonwebtoken'
import User from '../model/Users.js'

const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(400).json({ error: 'no token provided' })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.status(400).json({ error: 'invalid token' })


        const user = await User.findById(decoded.userId).select('-password')

        req.user = user
        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
}

export default protectRoutes