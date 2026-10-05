import { asset } from '../utils/asset'

export const artists = [
  {
    id: 'rockin-bones',
    name: "Rockin' Bones",
    genre: 'Punk-rock / Horror-punk',
    description:
      "Rockin' Bones — это дух Хэллоуина, пойманный в ловушку гитарных усилителей.🎸Это жуткое, бесконечно заразительное празднование тьмы, где низкий, мрачный женский вокал проведёт вас через самую весёлую и страшную ночь в вашей жизни.🌕 Так что…👻 Заходи в наш полуночный склеп — если осмелишься.",
    image: asset('/images/artists/rockin-bones.jpg'),
    cover: asset('/images/artists/rockin-bones-cover.jpg'),
    socials: [
      {
        type: 'vk',
        name: 'VK',
        url: 'https://vk.ru/rockin_bones',
        icon: asset('/icons/social/vk.svg'),
      },
      {
        type: 'yandex-music',
        name: 'Яндекс Музыка',
        url: 'https://music.yandex.ru/artist/24938519',
        icon: asset('/icons/social/yandex-music.svg'),
      }
    ],
    tracks: [
      {
        id: 'beetlejuice',
        title: 'Beetlejuice',
        duration: '2:21',
        audioUrl: asset('/audio/artists/rockin-bones/beetlejuice.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/43173064/track/153907608',
            iframeUrl: 'https://music.yandex.ru/iframe/album/43173064/track/153907608',
          },
        },
      },
      {
        id: 'gloom_serenade',
        title: 'Gloom Serenade',
        duration: '2:51',
        audioUrl: asset('/audio/artists/rockin-bones/gloom_serenade.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/38872580/track/144462342',
            iframeUrl: 'https://music.yandex.ru/iframe/album/38872580/track/144462342',
          },
        },
      },
    ],
  },
  {
    id: 'electrozombie',
    name: 'ЭЛЕКТРОЗОМБИ',
    genre: 'Punk-rock / Horror-punk / Glam-punk',
    description:
      'Электрозомби - петербургская хоррор-панк группа, основанная в 2011 году, впервые в истории приезжает в Иваново. В программе шоу: лучшие хиты со всех альбомов, байки из ленинградских склепов, весёлые шутки и мерч. Будем рады всех видеть на концерте, а кто не придёт, того сцапает Распутин!',
    image: asset('/images/artists/electro-zombi-logo.jpg'),
    cover: asset('/images/artists/electrozombie-cover.jpg'),
    socials: [
      {
        type: 'vk',
        name: 'VK',
        url: 'https://vk.ru/electrozombie',
        icon: asset('/icons/social/vk.svg'),
      },
      {
        type: 'yandex-music',
        name: 'Яндекс Музыка',
        url: 'https://music.yandex.ru/artist/1556549',
        icon: asset('/icons/social/yandex-music.svg'),
      },
      {
        type: 'telegram',
        name: 'Telegram',
        url: 'https://t.me/xoxa_xoi',
        icon: asset('/icons/social/telegram.svg'),
      },
      {
        type: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com/@TV-ks1vg',
        icon: asset('/icons/social/youtube.svg'),
      },
      {
        type: 'bandcamp',
        name: 'Bandcamp',
        url: 'https://electrozombi.bandcamp.com',
        icon: asset('/icons/social/bandcamp.svg'),
      }
    ],
    tracks: [
      {
        id: 'rasputin',
        title: 'Распутин',
        duration: '2:42',
        audioUrl: asset('/audio/artists/electrozombie/rasputin.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/11340238/track/68415760',
            iframeUrl: 'https://music.yandex.ru/iframe/album/11340238/track/68415760',
          },
        },
      },
      {
        id: 'vrag-obshchestva',
        title: 'Враг общества',
        duration: '2:17',
        audioUrl: asset('/audio/artists/electrozombie/vrag-obshchestva.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/11340213/track/68415687',
            iframeUrl: 'https://music.yandex.ru/iframe/album/11340213/track/68415687',
          },
        },
      },
    ],
  },

  {
    id: 'issin',
    name: 'ISSIN',
    genre: "rock'n'rave",
    description:
      "ISSIN не пытаются поместиться в рамки жанров — они их ломают. Танцевально? Да. Хардкорно? Безусловно. Лоуфайно? Ещё как. Мы делаем музыку для тех, кто готов одновременно устроить крабкор-мош, улететь в британский рэйв, поугорать с треков про всякое непотребное и словить экзистенциальный кризис. Серьезные ребята с абсолютно несерьезным подходом. Врубайте погромче!",
    image: asset('/images/artists/issin.jpg'),
    cover: asset('/images/artists/issin-cover.jpg'),
    socials: [
      {
        type: 'vk',
        name: 'VK',
        url: 'https://vk.ru/issinband',
        icon: asset('/icons/social/vk.svg'),
      },
      {
        type: 'yandex-music',
        name: 'Яндекс Музыка',
        url: 'https://music.yandex.ru/artist/7750746',
        icon: asset('/icons/social/yandex-music.svg'),
      },
      {
        type: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/issinband',
        icon: asset('/icons/social/instagram.svg'),
      },
      {
        type: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com/@issinband4997',
        icon: asset('/icons/social/youtube.svg'),
      }
    ],
    tracks: [
      {
        id: 'baba-gaba',
        title: 'Баба Габа',
        duration: '3:52',
        audioUrl: asset('/audio/artists/issin/baba-gaba.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/27626700/track/117939896',
            iframeUrl: 'https://music.yandex.ru/iframe/album/27626700/track/117939896',
          },
        },
      },
      {
        id: 'muzika-i-tabletki',
        title: 'Музыка и таблетки',
        duration: '3:19',
        audioUrl: asset('/audio/artists/issin/muzika-i-tabletki.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/34992049/track/135224120',
            iframeUrl: 'https://music.yandex.ru/iframe/album/34992049/track/135224120',
          },
        },
      },
    ],
  },
  {
    id: 'zherd',
    name: 'ЖЕРДЬ',
    genre: 'Noise-rock / Post-hardcore / Sludge',
    description:
      'Жердь – российская нойз-рок-группа, основанная в 2020 году в Рязани. Музыка коллектива представляет собой симбиоз абразивных и тяжёлых направлений, включающий элементы олдскульного пост-хардкора и сладжа. Группа берет вдохновение из грязных риффов Unsane и ранних Melvins, шизоидного вайба The Jesus Lizard и атмосферы психоделического панка питерской Химеры.',
    image: asset('/images/artists/jerd.jpg'),
    cover: asset('/images/artists/jerd-cover.jpg'),
    socials: [
      {
        type: 'vk',
        name: 'VK',
        url: 'https://vk.ru/wearezherd',
        icon: asset('/icons/social/vk.svg'),
      },
      {
        type: 'yandex-music',
        name: 'Яндекс Музыка',
        url: 'https://music.yandex.ru/artist/16755857',
        icon: asset('/icons/social/yandex-music.svg'),
      },
      {
        type: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/wearezherd',
        icon: asset('/icons/social/instagram.svg'),
      },
      {
        type: 'bandcamp',
        name: 'Bandcamp',
        url: 'https://wearezherd.bandcamp.com/',
        icon: asset('/icons/social/bandcamp.svg'),
      }
    ],
    tracks: [
      {
        id: 'ivan-dyrak',
        title: 'Иван-дурак',
        duration: '3:22',
        audioUrl: asset('/audio/artists/zherd/ivan-dyrak.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/41316619/track/149631508',
            iframeUrl: 'https://music.yandex.ru/iframe/album/41316619/track/149631508',
          },
        },
      },
      {
        id: 'kriki-na-vetru',
        title: 'Крики на ветру',
        duration: '3:45',
        audioUrl: asset('/audio/artists/zherd/kriki-na-vetru.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/41316619/track/149631507',
            iframeUrl: 'https://music.yandex.ru/iframe/album/41316619/track/149631507',
          },
        },
      },
    ],
  },

  {
    id: 'methtripper',
    name: 'MethTripper',
    genre: 'Hardcore / Sludge',
    description:
      'Ивановские алхимики лучше многих знают, как менять формы своих треков: превращая грайндкор в нойз или замедляя дэт-метал практически до сладжевого кача. В этом диком жанровом месиве рождаются свирепые, психопатические сеты с зашкаливающей эмоциональной подачей!',
    image: asset('/images/artists/methtripper.jpg'),
    cover: asset('/images/artists/methtripper-cover.jpg'),
    socials: [
      {
        type: 'vk',
        name: 'VK',
        url: 'https://vk.ru/methtripper',
        icon: asset('/icons/social/vk.svg'),
      },
      {
        type: 'yandex-music',
        name: 'Яндекс Музыка',
        url: 'https://music.yandex.ru/artist/24472519',
        icon: asset('/icons/social/yandex-music.svg'),
      },
      {
        type: 'telegram',
        name: 'Telegram',
        url: 'https://www.youtube.com/@methtripperofficial',
        icon: asset('/icons/social/telegram.svg'),
      },
      {
        type: 'youtube',
        name: 'YouTube',
        url: 'tg://resolve?domain=methtripper',
        icon: asset('/icons/social/youtube.svg'),
      },
      {
        type: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/methtripper/',
        icon: asset('/icons/social/instagram.svg'),
      },
      {
        type: 'spotify',
        name: 'Spotify',
        url: 'https://open.spotify.com/artist/4vTt9XcxOamyjGQhbIJlBh?si=Ji6PMT1TTjugDS2H2wX-HA',
        icon: asset('/icons/social/spotify.svg'),
      },
      {
        type: 'bandcamp',
        name: 'Bandcamp',
        url: 'https://methtripper.bandcamp.com',
        icon: asset('/icons/social/bandcamp.svg'),
      }
    ],
    tracks: [
      {
        id: 's41',
        title: 'S.41',
        duration: '4:34',
        audioUrl: asset('/audio/artists/methtripper/s41.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/42735789/track/152277549',
            iframeUrl: 'https://music.yandex.ru/iframe/album/42735789/track/152277549',
          },
        },
      },
      {
        id: 'selfmadegod',
        title: 'SelfMadeGod',
        duration: '3:09',
        audioUrl: asset('/audio/artists/methtripper/selfmadegod.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/37462387/track/141112108',
            iframeUrl: 'https://music.yandex.ru/iframe/album/37462387/track/141112108',
          },
        },
      },
    ],
  },

  {
    id: 'the-sadness',
    name: 'The Sadness',
    genre: 'Criminal Post-pank',
    description:
      'The Sadness - размотанная аудио-пленка из магнитофона твоего старшего брата, растянутая по пустынным дворам, глухим пустырям — эхом прокуренных подъездов. Мальчик, который пошел попить и не вернулся, разбросанные сердечники трансформатора и конфеты, подобранные с могил на праздник.',
    image: asset('/images/artists/sadness.jpg'),
    cover: asset('/images/artists/sadness-cover.png'),
socials: [
  {
    type: 'vk',
    name: 'VK',
    url: 'https://vk.com/thesadness37band',
    icon: asset('/icons/social/vk.svg'),
  },
  {
    type: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/@%D0%90%D0%BD%D1%82%D0%BE%D1%85%D0%B0%D0%97%D0%B0%D0%B1%D0%B5%D0%BB%D0%B8%D0%BD',
    icon: asset('/icons/social/youtube.svg'),
  },
  {
    type: 'yandex-music',
    name: 'Яндекс Музыка',
    url: 'https://music.yandex.ru/artist/10601645',
    icon: asset('/icons/social/yandex-music.svg'),
  },
  {
    type: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/thesadnessband?igshid=ZGUzMzM3NWJiOQ==',
    icon: asset('/icons/social/instagram.svg'),
  },
  {
    type: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com/@thesadnessband?lang=ru-RU',
    icon: asset('/icons/social/tiktok.svg'),
  },
  {
    type: 'telegram',
    name: 'Telegram',
    url: 'https://t.me/thesadnessband',
    icon: asset('/icons/social/telegram.svg'),
  },
  {
    type: 'bandcamp',
    name: 'Bandcamp',
    url: 'https://thesadness.bandcamp.com',
    icon: asset('/icons/social/bandcamp.svg'),
  }
],
    tracks: [
      {
        id: 'kraym',
        title: 'Крайм',
        duration: '2:59',
        audioUrl: asset('/audio/artists/the-sadness/kraym.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/41954525/track/151083775',
            iframeUrl: 'https://music.yandex.ru/iframe/album/41954525/track/151083775',
          },
        },
      },
      {
        id: 'mayak',
        title: 'Маяк',
        duration: '4:47',
        audioUrl: asset('/audio/artists/the-sadness/mayak.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/42750671/track/152910962',
            iframeUrl: 'https://music.yandex.ru/iframe/album/42750671/track/152910962',
          },
        },
      },
    ],
  },

  {
    id: 'jesha',
    name: 'Jesha',
    genre: 'Metal',
    description: 'JESHA — ивановская метал группа с почерком, которая цепляет с первых нот: мелодичный вокал, современное продюсирование и щепотка сценической дерзости. Каждый трек — как отдельная эмоция, которую хочется прожить на максимальной громкости.',
    image: asset('/images/artists/jesha.jpg'),
    cover: asset('/images/artists/jesha-cover.jpg'),
    socials: [
      {
        type: 'yandex-music',
        name: 'Яндекс Музыка',
        url: 'https://music.yandex.ru/artist/11014122',
        icon: asset('/icons/social/yandex-music.svg'),
      },
      {
        type: 'tiktok',
        name: 'TikTok',
        url: 'http://www.tiktok.com/@jeshamusic',
        icon: asset('/icons/social/tiktok.svg'),
      },
      {
        type: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/jeshamusic37?stkn=MXI1aW0wNGt3cWtzbA%3D%3D&utm_source=qr',
        icon: asset('/icons/social/instagram.svg'),
      },
      {
        type: 'youtube',
        name: 'YouTube',
        url: 'https://youtube.com/@jesha-music?si=3XR-kCps8eJmFbbv',
        icon: asset('/icons/social/youtube.svg'),
      }
    ],
    tracks: [
      {
        id: 'krasivye-sny',
        title: 'Красивые сны',
        duration: '3:09',
        audioUrl: asset('/audio/artists/jesha/krasivye-sny.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/17921681/track/90576406',
            iframeUrl: 'https://music.yandex.ru/iframe/album/17921681/track/90576406',
          },
        },
      },
      {
        id: 'nervy',
        title: 'Нервы',
        duration: '3:25',
        audioUrl: asset('/audio/artists/jesha/nervy.mp3'),
        platforms: {
          yandexMusic: {
            url: 'https://music.yandex.ru/album/14193403/track/78792532',
            iframeUrl: 'https://music.yandex.ru/iframe/album/14193403/track/78792532',
          },
        },
      },
    ],
  }
];