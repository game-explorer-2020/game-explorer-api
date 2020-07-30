const imageSizeName = 't_720p'; // reference: https://api-docs.igdb.com/#images

export default function (imageUrl: string | undefined) {
  return imageUrl && imageUrl.replace('//images.igdb', 'https://images.igdb').replace('t_thumb', imageSizeName);
}
