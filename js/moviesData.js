const moviesData = [
  {
    id: 1,
    title: "Devara: Part 1",
    year: 2024,
    genre: "Action",
    rating: 8.2,
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGZvrq9OEuMeWb657fQu43VpAz3MzaPTSqYtwaayNq2JmRhdSAHhCs0oN2sftd2mpRfxRWRa93tkc75NTZBRPgXx0lLP8lz5cK5z6uM5x4WigQLucBOTOd9Jqb4j33kAMC5-AFY1BM1lz8MVkZPHWQolDulzssgxOM18COMAoaLBpsZoXuVnkS-lwbD84/s16000/20240922_052945.jpg",
    trailer: "https://minochinos.com/f/9fqstb4cvrp1",
    description: "A fierce coastal action drama starring Jr NTR.",
  },

  {
    id: 2,
    title: "Pushpa: The Rise",
    year: 2021,
    genre: "Action",
    rating: 8.0,
    poster: "https://wallpapercave.com/wp/wp14389462.jpg",
    trailer: "https://minochinos.com/f/cdkpdkf69jk5",
    description: "Pushpa rises in the red sandalwood smuggling world.",
  },

  {
    id: 3,
    title: "RRR",
    year: 2022,
    genre: "Action",
    rating: 9.0,
    poster: "https://wallpapercave.com/wp/wp13464663.jpg",
    trailer: "https://minochinos.com/f/90wd9hfwznyl",
    description: "Two revolutionaries fight British rule.",
  },

  {
    id: 4,
    title: "Veerabhadrudu",
    year: 2026,
    genre: "Action,Epic",
    rating: 6.2,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZTJlZGIwNGYtNGI2Ni00MTI3LWFmNDYtMGIwYjI0MGJmZjM4XkEyXkFqcGc@._V1_QL75_UX262.5_.jpg",
    trailer:
      "https://minochinos.com/f/t9a4nnj973vmhttps://ww7.vcdnlare.com/v/jXZwOrIw88TRe96?sid=3790&t=hls",
    description: "A futuristic epic set in a dystopian world.",
  },

  {
    id: 5,
    title: "Salaar",
    year: 2023,
    genre: "Action",
    rating: 8.1,
    poster: "https://wallpapercave.com/wp/wp13247620.jpg",
    trailer: "https://www.youtube.com/embed/4GPvYMKtrtI",
    description: "A violent friendship story in a war-torn kingdom.",
  },

  {
    id: 6,
    title: "Sankranthiki Vasthunam",
    year: 2025,
    genre: "Action and Comedy",
    rating: 6.1,
    poster:
      "https://www.telugutimes.net/en/wp-content/uploads/sites/2/2025/03/Sankranthiki-Vasthunam-STREEMING-now-On-ZEE5_01.jpg",
    trailer: "https://youtu.be/JIgZkm7cqak?si=dwx2-gWEJwDTF-mI",
    description: "The rise of Mahendra Baahubali begins.",
  },

  {
    id: 7,
    title: "Maharshi",
    year: 2019,
    genre: "Drama",
    rating: 7.1,
    poster: "https://wallpapercave.com/wp/wp9064985.jpg",
    trailer: "https://youtu.be/w8Jb6RChrO4?si=SFOp8-HPjG378auQ",
    description: "The epic conclusion of Baahubali saga.",
  },

  {
    id: 8,
    title: "Ala Vaikunthapurramuloo",
    year: 2020,
    genre: "Drama",
    rating: 7.9,
    poster: "https://wallpapercave.com/wp/wp6791422.jpg",
    trailer: "https://youtu.be/bdqZttmi-pk?si=9nB-b253cJpQV7bl",
    description: "A son discovers his real identity.",
  },

  {
    id: 9,
    title: "Dhurandhar: The Revenge",
    year: 2026,
    genre: "Action",
    rating: 8.2,
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2RjOTA2MmMtNDQ5OC00ZDExLWFhYzItZjVlZjYxZTZlNjZlXkEyXkFqcGc@._V1_QL75_UX262.5_.jpg",
    trailer: "https://vibuxer.com/2qgqx83wv75m",
    description: "A passionate surgeon's emotional journey.",
  },

  {
    id: 10,
    title: "Dhurandhar",
    year: 2025,
    genre: "Action",
    rating: 8.3,
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/snBOuXDdhmTvlzMUvP9Em3Pp1u1.jpg",
    trailer: "https://minochinos.com/f/g7a39lkwd5hb",
    description: "A romantic misunderstanding story.",
  },

  {
    id: 11,
    title: "Ee Nagaraniki Emaindi",
    year: 2018,
    genre: "Comedy",
    rating: 8.0,
    poster: "https://wallpapercave.com/wp/wp8502926.jpg",
    trailer: "https://youtu.be/ZpsaXOP8H64?si=3G4tn05Pp8egvAAI",
    description: "A timeless love story during war.",
  },

  {
    id: 12,
    title: "Jersey",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/jersey1.jpg",
    trailer: "https://www.youtube.com/embed/example12",
    description: "A cricketer returns for his son's dream.",
  },

  {
    id: 13,
    title: "Magadheera",
    year: 2009,
    genre: "Action",
    rating: 8.0,
    poster: "https://image.tmdb.org/t/p/w500/magadheera1.jpg",
    trailer: "https://www.youtube.com/embed/example13",
    description: "Reincarnation love-action story.",
  },

  {
    id: 14,
    title: "Eega",
    year: 2012,
    genre: "Fantasy",
    rating: 8.0,
    poster: "https://image.tmdb.org/t/p/w500/eega1.jpg",
    trailer: "https://www.youtube.com/embed/example14",
    description: "A man reborn as a housefly.",
  },

  {
    id: 15,
    title: "Pokiri",
    year: 2006,
    genre: "Action",
    rating: 7.9,
    poster: "https://image.tmdb.org/t/p/w500/pokiri1.jpg",
    trailer: "https://www.youtube.com/embed/example15",
    description: "An undercover cop story.",
  },

  {
    id: 16,
    title: "Attarintiki Daredi",
    year: 2013,
    genre: "Drama",
    rating: 7.7,
    poster: "https://image.tmdb.org/t/p/w500/attarintiki1.jpg",
    trailer: "https://www.youtube.com/embed/example16",
    description: "Family reunion journey.",
  },

  {
    id: 17,
    title: "DJ Tillu",
    year: 2022,
    genre: "Comedy",
    rating: 7.5,
    poster: "https://image.tmdb.org/t/p/w500/djtillu1.jpg",
    trailer: "https://www.youtube.com/embed/example17",
    description: "Comedy entertainer DJ Tillu.",
  },

  {
    id: 18,
    title: "Rangasthalam",
    year: 2018,
    genre: "Drama",
    rating: 8.2,
    poster: "https://image.tmdb.org/t/p/w500/rangasthalam1.jpg",
    trailer: "https://www.youtube.com/embed/example18",
    description: "A hearing-impaired man fights corruption.",
  },

  {
    id: 19,
    title: "Hanuman",
    year: 2024,
    genre: "Fantasy",
    rating: 8.1,
    poster: "https://image.tmdb.org/t/p/w500/hanuman1.jpg",
    trailer: "https://www.youtube.com/embed/example19",
    description: "A superhero inspired by Hanuman.",
  },

  {
    id: 20,
    title: "Khaidi No. 150",
    year: 2017,
    genre: "Action",
    rating: 7.6,
    poster: "https://image.tmdb.org/t/p/w500/khaidi150.jpg",
    trailer: "https://www.youtube.com/embed/example20",
    description: "Farmer vs corporate system.",
  },
];
