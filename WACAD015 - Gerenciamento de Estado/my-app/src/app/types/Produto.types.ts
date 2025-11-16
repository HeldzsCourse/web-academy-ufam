export type ProdutoType = {
  id: string;
  fotos: FotoType[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
};

export type FotoType = {
  titulo: string;
  src: string;
};
