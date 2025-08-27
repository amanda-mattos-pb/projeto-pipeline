import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas para autenticação e comentários (exemplo)
app.post('/api/login', (req, res) => {
  // Exemplo de autenticação simples
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.json({ success: true, token: 'fake-jwt-token' });
  }
  res.status(401).json({ success: false, message: 'Credenciais inválidas' });
});

app.get('/api/comments/docker', (req, res) => {
  // Exemplo de retorno de comentários
  res.json([
    { user: 'João', comment: 'Ótimo conteúdo sobre Docker!' },
    { user: 'Maria', comment: 'Me ajudou muito, obrigado!' }
  ]);
});

// Outras rotas podem ser adicionadas aqui

app.listen(3000, () => console.log('Backend rodando na porta 3000'));