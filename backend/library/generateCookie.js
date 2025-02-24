import jwt from 'jsonwebtoken'

const generateCookie = async (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('jwt', token, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true, // false pag production
        sameSite: 'none',
        secure: true // FALSE if console test api endpoints, TRUE if frontend connect api endpoints
    })


}

export default generateCookie