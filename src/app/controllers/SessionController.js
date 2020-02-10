import jwt from 'jsonwebtoken';
import User from '../models/User';


class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado!' });
    }

    if (!(await user.validaSenha(password))) {
      return res.status(401).json({ error: 'Senha errada!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, '698dc19d489c4e4db73e28a713eab07b', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
