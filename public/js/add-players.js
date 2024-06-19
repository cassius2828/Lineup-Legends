const players = [
  {
    firstName: "Jamal",
    lastName: "Murray",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627750.png",
    value: 3,
  },
  {
    firstName: "Shai",
    lastName: "Gilgeous-Alexander",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png",
    value: 4,
  },
  {
    firstName: "Nick",
    lastName: "Young",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201156.png",
    value: 1,
  },
  {
    firstName: "Gilbert",
    lastName: "Arenas",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2240.png",
    value: 4,
  },
  {
    firstName: "Josh",
    lastName: "Smith",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2746.png",
    value: 3,
  },

  {
    firstName: "Chris",
    lastName: "Bosh",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2547.png",
    value: 4,
  },
  {
    firstName: "Bol",
    lastName: "Bol",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629626.png",
    value: 2,
  },
  {
    firstName: "J.R.",
    lastName: "Smith",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTnawf4piQrS4c-CVcJYcI03DALWACgdE8jw&s",
    value: 2,
  },
  {
    firstName: "Jeremy",
    lastName: "Lin",
    imgUrl:
      "https://alchetron.com/cdn/jeremy-lin-f75bc712-fe18-4ea9-a2ef-7920dd6fe94-resize-750.jpeg",
    value: 2,
  },
  {
    firstName: "Zach",
    lastName: "LaVine",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203897.png",
    value: 3,
  },
  {
    firstName: "Aaron",
    lastName: "Gordon",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203932.png",
    value: 3,
  },
  {
    firstName: "Obi",
    lastName: "Toppin",
    imgUrl:
      "https://res.cloudinary.com/hv5nj13jb/image/upload/c_fill,w_300,h_300/rmun3yu8hlukqs1bhbposydrsbge.png",
    value: 2,
  },
  {
    firstName: "Ron",
    lastName: "Artest",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3IggoCcsyqxJuskiBUwCUKVvyI_QvsMQww&s",
    value: 3,
  },
  {
    firstName: "Jalen",
    lastName: "Rose",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/147.png",
    value: 3,
  },
  {
    firstName: "Khris",
    lastName: "Middleton",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203114.png",
    value: 3,
  },
  {
    firstName: "Eddie",
    lastName: "Jones",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/224.png",
    value: 3,
  },
  {
    firstName: "Luol",
    lastName: "Deng",
    imgUrl:
      "https://i.pinimg.com/736x/6f/9c/47/6f9c47ea1d87b51d3d7e8cc40f46143d.jpg",
    value: 3,
  },
  {
    firstName: "Kenny",
    lastName: "Smith",
    imgUrl:
      " https://www.si.com/.image/t_share/MTY4MjYxODI3MzQ3MjI3OTI1/kenny-smith.jpg",
    value: 3,
  },

  {
    firstName: "Glen",
    lastName: "Rice",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZJfcxlGbiGQokTyTT2BgRCfGn4aOxbgsmA&s",
    value: 3,
  },
  {
    firstName: "Penny",
    lastName: "Hardaway",
    imgUrl:
      "https://ng-sportingnews.com/s3/files/styles/crop_style_16_9_desktop/s3/2023-12/Penny%20Hardaway%20%282%29%20122923.jpeg?h=920929c4&itok=psbsPNB3",
    value: 4,
  },
  {
    firstName: "Kyle",
    lastName: "Kuzma",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628398.png",
    value: 2,
  },

  {
    firstName: "D'Angelo",
    lastName: "Russell",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZfFBj6Vwv20A20bd_jNQ7BwDmC_xhGg6ew&s",
    value: 3,
  },
  {
    firstName: "Shawn",
    lastName: "Kemp",
    imgUrl:
      "https://images.squarespace-cdn.com/content/v1/5f6a2443c6004d000a8d74df/1601064096489-5253447VSV5RBED3EX5C/Shawn+Kemp+Seattle+Sonics.jpg",
    value: 4,
  },
  {
    firstName: "Chris",
    lastName: "Webber",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/185.png",
    value: 4,
  },
  {
    firstName: "Joe",
    lastName: "Johnson",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgIYLB900NmT13g8xbfjQkYq6bdoBAPej0jg&s",
    value: 3,
  },
  {
    firstName: "Dell",
    lastName: "Curry",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/209.png",
    value: 2,
  },
  {
    firstName: "Seth",
    lastName: "Curry",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203552.png",
    value: 1,
  },
  {
    firstName: "Shabazz",
    lastName: "Napier",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203894.png",
    value: 2,
  },
  {
    firstName: "Fred",
    lastName: "VanVleet",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627832.png",
    value: 2,
  },
  {
    firstName: "Dejounte",
    lastName: "Murray",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627749.png",
    value: 3,
  },
  {
    firstName: "Nate",
    lastName: "Thurmond",
    imgUrl:
      "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F0716%2Fr103567_1296x729_16%2D9.jpg",
    value: 4,
  },
  {
    firstName: "George",
    lastName: "Mikan",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/600012.png",
    value: 4,
  },

  {
    firstName: "Shaun",
    lastName: "Livingston",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2733.png",
    value: 2,
  },
];

module.exports = {
  players,
};
