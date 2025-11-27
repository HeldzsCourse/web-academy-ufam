import { screen, render } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ItemFavorito from "../ItemFavorito";
import { mockProdutos } from "@/app/mocks/produtos";
import {
  FavoritosProvider,
  useProdutoFavorito,
} from "../../../State/FavoritosProvider";

jest.mock("../../../State/FavoritosProvider", () => ({
  ...jest.requireActual("../../../State/FavoritosProvider"),
  useProdutoFavorito: () => ({
    favoritos: [],
    setFavoritos: jest.fn(),
  }),
}));

describe("ItemFavorito", () => {
  test("renderiza as informações do favorito corretamente", () => {
    const itemFavoritoMock = mockProdutos[0];
    const { nome, descricao, preco, fotos, desconto } = itemFavoritoMock;

    render(
      <FavoritosProvider>
        <ItemFavorito itemFavorito={itemFavoritoMock} setFavoritos={() => {}} />
      </FavoritosProvider>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(itemFavoritoMock.nome)).toBeInTheDocument();
    expect(screen.getByText(itemFavoritoMock.descricao)).toBeInTheDocument();
    expect(screen.getByText(itemFavoritoMock.preco)).toBeInTheDocument();
    expect(screen.getByText(itemFavoritoMock.desconto)).toBeInTheDocument();
  });

  test("deve ser possível remover um favorito", async () => {});
});
