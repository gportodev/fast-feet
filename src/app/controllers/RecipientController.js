import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipientExists = await Recipient.findOne({ where: { name: req.body.name } });

    if (recipientExists) {
      return res.status(400).json({ error: 'Usuário já tem endereço cadastrado!' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
