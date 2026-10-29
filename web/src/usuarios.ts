export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

const CHAVE_USUARIOS = 'docevida_usuarios';

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

export function salvarUsuario(novoUsuario: Usuario): boolean {
  const usuarios = buscarUsuarios();

  const emailExiste = usuarios.some(
    usuario =>
      usuario.email.toLowerCase() ===
      novoUsuario.email.toLowerCase()
  );

  if (emailExiste) {
    return false;
  }

  usuarios.push(novoUsuario);

  localStorage.setItem(
    CHAVE_USUARIOS,
    JSON.stringify(usuarios)
  );

  return true;
}