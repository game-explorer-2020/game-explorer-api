# Game Explorer API

API que extrai os dados da [IGDB](https://www.igdb.com/api) e os traz formatados para utilizar no Game Explorer.

## Endpoints

### Games

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
      "releaseDate": 1387238400,
      "summary": "Born a slave, Adéwalé found freedom as a pirate aboard the Jackdaw as Captain Edward Kenway's Quartermaster. Fifteen years later, Adéwalé has become a trained assassin and finds himself shipwrecked in Saint-Domingue with no weapon and no crew helping him out. So unfolds a new adventure,",
      "involvedCompanies": ["Ubisoft Entertainment", "Ubisoft Montreal", "Ubisoft Québec"],
      "aggregatedRating": 75,
      "aggregatedRatingCount": 3,
      "rating": 70.1997066569437,
      "ratingCount": 107,
      "similarGames": [
        {
          "id": 1266,
          "coverUrl": "//images.igdb.com/igdb/image/upload/t_thumb/co1xii.jpg"
        },
        {
          "id": 7570,
          "coverUrl": "//images.igdb.com/igdb/image/upload/t_thumb/co1xir.jpg"
        }
      ]
    }
    ```

### Feeds

- `/api/v1/feeds`: lista os as últimas notícias/artigos de games.

  - Exemplo de resposta:

    ```json
    [
      {
        "id": 928108,
        "title": "Watch Dogs 2 Free Claim Not Working, Ubisoft Locking Spammers With Multiple Account",
        "imageUrl": "https://gamertweak.com/wp-content/uploads/2020/07/watch-dogs-2-free-copy.jpg",
        "publishedAt": 1594512000,
        "url": "https://gamertweak.com/watch-dogs-2-free-claim/"
      }
    ]
    ```
