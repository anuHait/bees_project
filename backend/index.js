const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const port=process.env.PORT || 8000;

require('./db/connection');

const User = require('./models/Users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello g");
});

app.post('/api/signup', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send('Please fill all required fields');
        } else {
            const isAlreadyExist = await User.findOne({ email });
            if (isAlreadyExist) {
                res.status(400).send('User already exists');
            } else {
                const newUser = new User({ name, email });
                bcryptjs.hash(password, 6, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword);
                    newUser.save();
                    next();
                })
                return res.status(200).send('User registered successfully');
            }
        }

    } catch (error) {
        console.log(error, 'Error')
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            res.status(400).send('Please fill all required fields');
        } else {
            const user = await User.findOne({ email });
            if(!user){
                res.status(400).send('User does not exist');}
                else{
                    const validateUser=await bcryptjs.compare(password,user.password);
                    if(!validateUser){
                        res.status(400).send('Invalid credentials');}
                        else{
                            const payload={
                                userId:user._id,
                                email:user.email,
                            }
                            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

                            jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
                                await User.updateOne({ _id: user._id }, {
                                    $set: { token }
                                })
                                user.save();
                                return res.status(200).json({ user: { id: user._id, email: user.email, name: user.name }, token: token })
                            })
                        }
                }
        }
 
    } catch (error) {
        
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});