class CoverUrlMapper {
  from(gameIGDB: any): string {
    return gameIGDB.cover?.url || `${process.env.APP_URL}/images/no-image.svg`;
  }
}

export default new CoverUrlMapper();
