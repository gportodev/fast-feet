import Destinatario from '../models/Destinatario';

class DestinatarioController {
  async store(req, res) {
    const userDestinatario = await Destinatario.create(req.body);

    return res.json(userDestinatario);
  }
}

export default new DestinatarioController();
