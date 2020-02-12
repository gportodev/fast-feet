import * as Yup from 'yup'; //* as *var* -> recebe tudo de yup
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    /* Cria schema de validação
    Qual a forma do objeto?
    Quais os campos?
    */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    // Valida dados de entrada com base no schema

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos!' });
    }

    const recipientExists = await Recipient.findOne({ where: { name: req.body.name } });

    if (recipientExists) {
      return res.status(400).json({ error: 'Usuário já tem endereço cadastrado!' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
