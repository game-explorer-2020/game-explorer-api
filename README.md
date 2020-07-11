# Game Explorer API

API que extrai os dados da [IGDB](https://www.igdb.com/api) e os traz devidamente formatados.

## Endpoints

- `/api/v1/games?term=MySearchTerm&offset=3`: lista os jogos ordenados por popularidade.

  - `term`: termo de busca utilizado para filtrar os jogos. Não é obrigatório.
  - `offset`: página desejada. Não é obrigatório. Padrão `0`.
  - Exemplo de resposta:

    ```json
    [
      {
        "id": 115278,
        "name": "Rune Factory 4 Special",
        "coverUrl": "//images.igdb.com/igdb/image/upload/t_thumb/co203s.jpg",
        "popularity": 2090.622837928576,
        "genres": ["Role-playing (RPG)"],
        "platforms": ["Nintendo Switch"]
      }
    ]
    ```

- `/api/v1/games/details/:gameId`: traz os detalhes do jogo desejado.

  - Exemplo de resposta:

    ```json
    {
      "id": 3775,
      "name": "Assassin's Creed: Freedom Cry",
      "coverUrl": "//images.igdb.com/igdb/image/upload/t_thumb/co1uue.jpg",
      "genres": ["Fighting", "Adventure"],
      "platforms": ["PC (Microsoft Windows)", "Xbox Live Arcade", "PlayStation Network", "PlayStation 4"],
      "releaseDate": "2013-12-17T00:00:00.000Z",
      "storyline": "Born a slave, Adéwalé found freedom as a pirate aboard the Jackdaw as Captain Edward Kenway's Quartermaster. Fifteen years later, Adéwalé has become a trained assassin and finds himself shipwrecked in Saint-Domingue with no weapon and no crew helping him out. So unfolds a new adventure,",
      "involvedCompanies": ["Ubisoft Entertainment", "Ubisoft Montreal", "Ubisoft Québec"],
      "aggregatedRating": 75,
      "aggregatedRatingCount": 3,
      "rating": 70.1997066569437,
      "ratingCount": 107
    }
    ```

## TODO

- [x] Criar mapper separado para mapear os dados da IGDB para as interfaces da aplicação
- [ ] Possibilitar um parâmetro `similarTo={gameId}` para o endpoint de listagem de games, para trazer apenas os games similares ao solicitado
- [ ] Criar os endpoints de feed
- [x] Fazer deploy
- [ ] Escrever testes com Jest
