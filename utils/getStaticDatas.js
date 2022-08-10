function generateData(id, username, title, content, date, likes, comments, category) {
  return {
    id, username, title, content, date, likes, comments, category,
  };
}

export default function getDatas() {
  const datas = [generateData(1, 'sarahT04', 'noods', 'I like noodles', 'now', '0', null, ['csgo', 'valorant']), generateData(1, 'sarahT04', 'noods', 'I like noodles', 'now', '0', null, ['csgo', 'valorant']), generateData(1, 'sarahT04', 'noods', 'I like noodles', 'now', '0', null, ['csgo', 'valorant'])];
  return datas;
}
