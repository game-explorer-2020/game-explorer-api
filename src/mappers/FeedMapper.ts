import { PulseIGDB } from './../models/igdb/PulseIGDB';
import { Feed } from './../models/Feed';
import getDefaultImagePath from '../utils/getDefaultImagePath';

class FeedMapper {
  from(pulse: PulseIGDB): Feed {
    return {
      id: pulse.id,
      title: pulse.title,
      imageUrl: pulse.image || getDefaultImagePath(),
      publishedAt: pulse.published_at,
      url: pulse.website.url
    };
  }
}

export default new FeedMapper();
