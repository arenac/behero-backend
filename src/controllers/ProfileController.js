import connection from '../database/connection';

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const existing_ong = await connection('ongs').where('id', ong_id).first();

    if (!existing_ong) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const incidentes = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.json(incidentes);
  }
}

export default new ProfileController();
