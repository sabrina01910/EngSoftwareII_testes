export interface Usuario {
  nome: string;
  email: string;
  senhaHash: string;
}

const CHAVE_USUARIOS = 'docevida_usuarios';

export async function gerarHashSenha(senha: string): Promise<string> {
  const dados = new TextEncoder().encode(senha);

  const hash = await crypto.subtle.digest('SHA-256', dados);

  const bytes = Array.from(new Uint8Array(hash));

  return bytes
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function buscarUsuarios(): Usuario[] {
  const dados = localStorage.getItem(CHAVE_USUARIOS);

  if (!dados) {
    return [];
  }

  try {
    return JSON.parse(dados) as Usuario[];
  } catch {
    return [];
  }
}

export async function salvarUsuario(novoUsuario: {
  nome: string;
  email: string;
  senha: string;
}): Promise<boolean> {
  const usuarios = buscarUsuarios();

  const emailExiste = usuarios.some(
    usuario =>
      usuario.email.toLowerCase() ===
      novoUsuario.email.toLowerCase()
  );

  if (emailExiste) {
    return false;
  }

  const senhaHash = await gerarHashSenha(novoUsuario.senha);

  usuarios.push({
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    senhaHash,
  });
  console.log(
  'CAMPOS DO USUÁRIO:',
  Object.keys(usuarios[usuarios.length - 1])
);

  localStorage.setItem(
    CHAVE_USUARIOS,
    JSON.stringify(usuarios)
  );

  return true;
}