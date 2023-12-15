const promisePool = require('../../connection')

const listUser = async (req, res) => {
    const query = `SELECT * FROM users`
    try {
        const users = await promisePool.query(query)
        return res.status(200).json(users[0])
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const registerUser = async (req, res) => {
    const { name, age, email } = req.body
    try {
        const query = `INSERT INTO users(name, age, email) VALUES(?, ?, ?)`
        await promisePool.query(query, [name, age, email])
        const newUser = await promisePool.query(`SELECT * FROM users u WHERE u.email = ?`, [email])
        console.log(newUser);
        return res.status(201).json({ message: 'User successfully registered', user: newUser[0][0] })
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, age, email } = req.body

    try {
        const query = `UPDATE users u
                        SET
                        name = ?,
                        age = ?,
                        email = ? WHERE u.id = ?`

        await promisePool.query(query, [name, age, email, Number(id)])
        const updatedUser = await promisePool.query('SELECT * FROM users u WHERE u.id - ?', [Number(id)])
        return res.status(201).json({ message: 'User sucessful updated', updateUser: updatedUser[0][0] })
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM users u WHERE u.id = ?`
    try {
        const deletedUser = await promisePool.query('SELECT * FROM users u WHERE u.id = ?', [Number(id)])
        await promisePool.query(query, [Number(id)])
        return res.status(200).json({ message: 'User sucessful deleted', deletedUser: deletedUser[0][0] })
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' })
    }
}

module.exports = {
    listUser,
    registerUser,
    updateUser,
    deleteUser
}
