import * as Yup from 'yup'; //* as *var* -> recebe tudo de yup
import User from '../models/User';

class UserController {
  async store(req, res) {
    /* Cria schema de validação
    Qual a forma do objeto?
    Quais os campos?
    */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    // Valida dados de entrada com base no schema

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos!' });
    }


    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe!' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    /* Cria schema de validação
    Qual a forma do objeto?
    Quais os campos?
    */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    // Valida dados de entrada com base no schema

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos!' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Verifica email & se ele quer alterar o email

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe!' });
      }
    }

    // Verifica oldPassword & se ele quer alterar a senha

    if (oldPassword && !(await user.validaSenha(oldPassword))) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Atualiza os dados depois das validações

    await user.update(req.body);

    return res.json({ message: 'Dados atualizados com sucesso!' });
  }
}

export default new UserController();
