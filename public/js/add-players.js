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

const players2 = [
  {
    firstName: "Peja",
    lastName: "Stojakovic",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/978.png",
    value: 4,
  },
  {
    firstName: "Donte",
    lastName: "DiVincenzo",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628978.png",
    value: 2,
  },
  {
    firstName: "Marcus",
    lastName: "Morris Sr",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/202694.png",
    value: 2,
  },
  {
    firstName: "Derek",
    lastName: "Fisher",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyZO0oCLoLBjLL8WefbxBS004EAClGp6diw&s",
    value: 2,
  },
  {
    firstName: "Terrance",
    lastName: "Ross",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203082.png",
    value: 1,
  },
  {
    firstName: "Lauri",
    lastName: "Markkanen",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628374.png",
    value: 3,
  },
  {
    firstName: "Jrue",
    lastName: "Holiday",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201950.png",
    value: 3,
  },
  {
    firstName: "Hedo",
    lastName: "Turkoglu",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2045.png",
    value: 3,
  },
  {
    firstName: "Bam",
    lastName: "Adebayo",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628389.png",
    value: 4,
  },
  {
    firstName: "Lamar",
    lastName: "Odom",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfBCkwGrSgCYEDpzFj-XNLfpggzvMzgj22Q&s",
    value: 3,
  },
  {
    firstName: "Shane",
    lastName: "Battier",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXl8mgQmYF7s1OuVcOwFVGmjrB4B6dPlgLTw&s",
    value: 2,
  },
  {
    firstName: "Kenyon",
    lastName: "Martin",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/2030.png",
    value: 3,
  },
  {
    firstName: "Gerald",
    lastName: "Wallace",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdokISHlmHwjadYOIzTqOzpQLq_-fXcvzZDQ&s",
    value: 3,
  },
  {
    firstName: "Jason",
    lastName: "Terry",
    imgUrl:
      "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/841.png",
    value: 2,
  },
  {
    firstName: "JJ",
    lastName: "Redick",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/200755.png",
    value: 3,
  },
  {
    firstName: "Wesley",
    lastName: "Matthews",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/202083.png",
    value: 1,
  },
  {
    firstName: "Kyle",
    lastName: "Korver",
    imgUrl:
      "https://nbc24.com/resources/media2/16x9/full/1015/center/80/06a7b69e-2f48-415b-9216-34be63b2d622-large16x9_kylekorver.jpg",
    value: 3,
  },
  {
    firstName: "JaVale",
    lastName: "McGee",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201580.png",
    value: 1,
  },
  {
    firstName: "Dereck",
    lastName: "Lively",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641726.png",
    value: 2,
  },
  {
    firstName: "Pascal",
    lastName: "Siakam",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627783.png",
    value: 3,
  },
  {
    firstName: "Tony",
    lastName: "Parker",
    imgUrl:
      "https://i.pinimg.com/originals/4e/33/18/4e33182f9d5c6377f9ab0a98c3588d85.png",
    value: 3,
  },
  {
    firstName: "Andre",
    lastName: "Drummond",
    imgUrl: "https://basketballplayers.com/img/player-photos/203083.png",
    value: 2,
  },
  {
    firstName: "Artis",
    lastName: "Gilmore",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/600014.png",
    value: 4,
  },
  {
    firstName: "Moses",
    lastName: "Malone",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtI_Up6B00kRtU6GoxWmxYR6_3z4MxGvvUw&s",
    value: 5,
  },
  {
    firstName: "Dillon",
    lastName: "Brooks",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628415.png",
    value: 2,
  },
  {
    firstName: "Amen",
    lastName: "Thompson",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641708.png",
    value: 2,
  },
  {
    firstName: "Brian",
    lastName: "Scalabrine",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHNy8c5Vg8snyEqpu6H7L_qJZ48leR9CjiIg&s",
    value: 2,
  },
  {
    firstName: "Nate",
    lastName: "Robinson",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA2EHpwERA-Ral7g5njwX3YSs4lZnxlvWgGg&s",
    value: 2,
  },
  {
    firstName: "David",
    lastName: "West",
    imgUrl:
      "https://www.athletespeakers.com/storage/celebrities/1532534136_david-west.png",
    value: 3,
  },
];

const players3 = [
  {
    firstName: "Eric",
    lastName: "Gordon",
    imgUrl:
      "https://s.yimg.com/ny/api/res/1.2/bTX_VRjeygg7QFiv4tvpcQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ1MA--/https://media.zenfs.com/en/hoops_hype_usa_today_sports_articles_974/ff9408ffdf6d6156539caa19daab4776",
    value: 3,
  },
  {
    firstName: "Josh",
    lastName: "Hart",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628404.png",
    value: 2,
  },
  {
    firstName: "Brandon",
    lastName: "Jennings",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201943.png",
    value: 2,
  },

  {
    firstName: "Alex",
    lastName: "Caruso",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627936.png",
    value: 2,
  },
  {
    firstName: "Gerald",
    lastName: "Green",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/101123.png",
    value: 2,
  },
  {
    firstName: "Chauncey",
    lastName: "Billups",
    imgUrl: "https://a.espncdn.com/i/headshots/nba/players/full/63.png",
    value: 3,
  },
  {
    firstName: "Jason",
    lastName: "Richardson",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KROn-tlfiE0YXeesbhfWHFLv253xJ8-fAA&s",
    value: 3,
  },
  {
    firstName: "Danny",
    lastName: "Green",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201980.png",
    value: 2,
  },
  {
    firstName: "Julius",
    lastName: "Erving",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/76681.png",
    value: 5,
  },
  {
    firstName: "George",
    lastName: "Gervin",
    imgUrl:
      "https://www.basketballnetwork.net/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTg3MTYwOTU1ODQ3ODQ1Nzc0/george-gervin-1.png",
    value: 4,
  },
  {
    firstName: "Desmond",
    lastName: "Bane",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630217.png",
    value: 2,
  },
  {
    firstName: "Thanasis",
    lastName: "Antetokounmpo",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203648.png",
    value: 1,
  },
  {
    firstName: "Austin",
    lastName: "Reaves",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630559.png",
    value: 2,
  },
  {
    firstName: "Patty",
    lastName: "Mills",
    imgUrl:
      "https://netswire.usatoday.com/wp-content/uploads/sites/9/2021/09/USATSI_16841944-e1632863946258.jpg?w=1000&h=600&crop=1",
    value: 2,
  },
  {
    firstName: "Emoni",
    lastName: "Bates",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641734.png",
    value: 1,
  },
  {
    firstName: "Nicolas",
    lastName: "Batum",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201587.png",
    value: 1,
  },
  {
    firstName: "Patrick",
    lastName: "Beverley",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201976.png",
    value: 3,
  },
  {
    firstName: "Anthony",
    lastName: "Black",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641710.png",
    value: 1,
  },
  {
    firstName: "Bismack",
    lastName: "Biyombo",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/202687.png",
    value: 1,
  },
  {
    firstName: "James",
    lastName: "Bouknight",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630547.png",
    value: 1,
  },
  {
    firstName: "Bruce",
    lastName: "Brown",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1628971.png",
    value: 1,
  },
  {
    firstName: "Alec",
    lastName: "Burks",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/202692.png",
    value: 1,
  },
  {
    firstName: "Kentavious",
    lastName: "Caldwell-Pope",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203484.png",
    value: 1,
  },
  {
    firstName: "Max",
    lastName: "Christie",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1631108.png",
    value: 1,
  },
  {
    firstName: "Nic",
    lastName: "Claxton",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629651.png",
    value: 1,
  },
  {
    firstName: "Jae",
    lastName: "Crowder",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203109.png",
    value: 2,
  },
  {
    firstName: "PJ",
    lastName: "Tucker",
    imgUrl:
      "https://www.si.com/.image/t_share/MTY4NDk3MTEzNDM2MjY4MzEw/pj-tucker.png",
    value: 2,
  },
  {
    firstName: "Gradey",
    lastName: "Dick",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1641711.png",
    value: 1,
  },
  {
    firstName: "Luguentz",
    lastName: "Dort",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629652.png",
    value: 3,
  },
];

const players4 = [
  {
    firstName: "Kris",
    lastName: "Dunn",
    imgUrl:
      "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2991139.png",
    value: 1,
  },
  {
    firstName: "Dante",
    lastName: "Exum",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/203957.png",
    value: 1,
  },
  {
    firstName: "Jeff",
    lastName: "Green",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201145.png",
    value: 2,
  },
  {
    firstName: "Joe",
    lastName: "Harris",
    imgUrl:
      "https://hoopshype.com/wp-content/uploads/sites/92/2022/01/i_fa_4d_5e_joe-harris.png",
    value: 2,
  },
  {
    firstName: "Sam",
    lastName: "Hauser",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630573.png",
    value: 1,
  },
  {
    firstName: "Gordon",
    lastName: "Hayward",
    imgUrl: "https://m.basketnews.com/image-364084-vbg.jpg",
    value: 3,
  },
  {
    firstName: "Talen",
    lastName: "Horton-Tucker",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1629659.png",
    value: 1,
  },

  {
    firstName: "Jeff",
    lastName: "Teague",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201952.png",
    value: 2,
  },
  {
    firstName: "Corey",
    lastName: "Joseph",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/202709.png",
    value: 1,
  },
  {
    firstName: "Deron",
    lastName: "Williams",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcFckprEDW_B12EB20BpAjApQZ8qBJLEyS0Q&s",
    value: 4,
  },
  {
    firstName: "Damion",
    lastName: "Lee",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLvJAPyKDVLtYriMxq3by0pYcjl0Y-0r_Tzw&s",
    value: 1,
  },
  {
    firstName: "Caris",
    lastName: "LeVert",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1627747.png",
    value: 1,
  },
  {
    firstName: "Jameer",
    lastName: "Nelson",
    imgUrl:
      "https://s.yimg.com/it/api/res/1.2/Zpnc0LgJObz9NilsDRv4GQ--~A/YXBwaWQ9eW5ld3M7dz0xMjAwO2g9NjMwO3E9MTAw/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10122018/3837.png",
    value: 3,
  },
  {
    firstName: "Aaron",
    lastName: "Afflalo",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201167.png",
    value: 2,
  },
  {
    firstName: "Boris",
    lastName: "Diaw",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHm1s_-A1pHlbN_GjtsxqA1hGMKCNU_c4R_Q&s",
    value: 2,
  },
  {
    firstName: "Ty",
    lastName: "Lawson",
    imgUrl:
      "https://fivethirtyeight.com/wp-content/uploads/2015/07/sfx12070.jpg?w=575",
    value: 2,
  },
  {
    firstName: "George",
    lastName: "Hill",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201588.png",
    value: 2,
  },
  {
    firstName: "Kemba",
    lastName: "Walker",
    imgUrl:
      "https://pm1.aminoapps.com/6664/860b0025c224a644de3f1804d7f7521dbf2d0c4d_00.jpg",
    value: 3,
  },
  {
    firstName: "Serge",
    lastName: "Ibaka",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo94iPMPg3YDr_azqCnJ857wmO20Po7joyvqMMf4rA_Q0iH2wGgYhbohAYjXghVs4oSOY&usqp=CAU",
    value: 3,
  },
  {
    firstName: "Paul",
    lastName: "Millsap",
    imgUrl: "https://i.redd.it/d2w7jm4qcmm51.jpg",
    value: 3,
  },
  {
    firstName: "DeAndre",
    lastName: "Jordan",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs4q5yzzQFORv6oGtrmDyeeBtaHjAKEDrI_ZyL8_d_dLinGQkFeqLEbUG9GAlHiNmdSvE&usqp=CAU",
    value: 3,
  },
  {
    firstName: "Manu",
    lastName: "Ginobili",
    imgUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/1938.png",
    value: 3,
  },
  {
    firstName: "Kevin",
    lastName: "Love",
    imgUrl:
      "https://www.capecodtimes.com/gcdn/authoring/2014/06/25/NCCT/ghows-CC-788e871f-5235-41dc-b5d6-682e1c7483d8-9d3fdfd0.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp",
    value: 4,
  },
  {
    firstName: "Matthew",
    lastName: "Dellavedova",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJt8nUTaNZOtv9InLxcpf4SoRBXLK60Vi5TA&s",
    value: 2,
  },
];


module.exports = {
  players,
  players2,
  players3,
  players4,
};
