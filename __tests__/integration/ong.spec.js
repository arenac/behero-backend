import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
      name: 'ONG Salvation',
      email: 'ongsalvation@email.com',
      whatsapp: '+5511975757575',
      city: 'São Paulo',
      country: 'BR',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to create a first ONG incident', async () => {
    const req = await request(app).post('/ongs').send({
      name: 'ONG Salvation',
      email: 'ongsalvation@email.com',
      whatsapp: '+5511975757575',
      city: 'São Paulo',
      country: 'BR',
    });

    const { id } = req.body;

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', id)
      .send({
        title: 'Incident 12',
        description: 'Incident detail',
        value: 120,
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBeGreaterThanOrEqual(1);
  });
});
