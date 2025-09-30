import { Produto as ProdutoType } from '../../App'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { adicionarAoCarrinho } from '../../store/slices/carrinhoSlice'
import { toggleFavorito } from '../../store/slices/favoritosSlice'
import { RootState } from '../../store'

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

const ProdutoComponent = ({ produto }: { produto: ProdutoType }) => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const estaNosFavoritos = favoritos.some((f) => f.id === produto.id)

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={() => dispatch(toggleFavorito(produto))} type="button">
        {estaNosFavoritos ? '- Remover dos favoritos' : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={() => dispatch(adicionarAoCarrinho(produto))} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
