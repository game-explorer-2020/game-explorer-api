import { Feed } from './../models/Feed';

class FeedMapper {
  from(pulse: any): Feed {
    return {
      id: pulse.id,
      title: pulse.title,
      imageUrl: pulse.image || `${process.env.APP_URL}/images/no-image.svg`,
      publishedAt: pulse.published_at,
      url: pulse.website.url
    };
  }
}

export default new FeedMapper();
