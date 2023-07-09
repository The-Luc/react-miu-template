const test = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTczMTk4NjI3MSIsInByaW1hcnlFbWFpbCI6InRoaXRoZWx1Yy5sYUBnbWFpbC5jb20ifSwib3JnYW5pc2F0aW9uIjp7ImlkIjoiMTIzNjMzNjY0In0sImlhdCI6MTY4ODg2MjgzNiwiZXhwIjoxNjg4ODY2NDM2LCJpc3MiOiJjb20uaGFwcGVvLmN1c3RvbS13aWRnZXQifQ.2wOrqVgRnhA8BtcW6eSKGE-26tAvakDO4YCRvoudL_g',
  tokenExpiresAt: 1688865836929,
  scopedData: {
    user: { id: '1731986271', primaryEmail: 'thitheluc.la@gmail.com' },
    organisation: { id: '123633664' },
  },
  context: {
    hostname: 'app.happeo.com',
    href: 'https://app.happeo.com/pages/1h4qeli4a0lg3cpleo/FirstPage/1h4qeljbp3rb1i9u6j/edit',
    pathname: '/pages/1h4qeli4a0lg3cpleo/FirstPage/1h4qeljbp3rb1i9u6j/edit',
  },
  location: {
    localWidgetId: '6',
    pageId: '1h4qeljbp3rb1i9u6j',
    pageGroupId: '1h4qeli4a0lg3cpleo',
  },
  mode: 'edit',
  editMode: true,
};

export const getUserId = () => {
  const data = JSON.parse(window.name || '{}');
  return data?.scopedData?.user?.id;
};

export const mapSongs = items => {
  return items.map(song => {
    console.log('🚀 ~ file: util.js:30 ~ mapSongs ~ song:', song);
    if (!song) return;

    return {
      id: song.id,
      name: song.name,
      img: song.album.images[1].url,
      href: song.href,
      uri: song.uri,
      dbId: song.dbId,
      vote: song.vote,
      message: song.message,
      isMyVote: song.isMyVote,
      artist: song.artists[0].name,
    };
  });
};
