import { Hymn, StudySession, SupportLeaf } from '../types/study';

export const HYMNS: Hymn[] = [
  {
    id: 'kj-3',
    role: 'pembuka',
    roleLabel: 'Lagu Pujian Pembuka · PA 1',
    paId: 'pa1',
    paTitle: 'PA 1: Dikasihi Untuk Mengasihi',
    sourceBook: 'Kidung Jemaat',
    number: 'KJ No. 3',
    title: 'Kami Puji dengan Riang',
    toneAndTempo: 'Do = G · 4/4 · Riang dan penuh syukur',
    themeNote:
      'Mengajak seluruh generasi memuji Allah sebagai “lautan kasih dan restu” dan belajar meneladani kasih-Nya kepada sesama.',
    stanzas: [
      {
        number: 1,
        lines: [
          'Kami puji dengan riang Dikau, Allah yang besar;',
          'Bagai bunga t’rima siang, hati kami pun mekar.',
          'Kabut dosa dan derita, kebimbangan, t’lah lenyap.',
          'Sumber suka yang abadi, b’ri sinar-Mu menyerap.',
        ],
      },
      {
        number: 2,
        lines: [
          'Kau memb’ri, Kau mengampuni, Kau limpahkan rahmat-Mu,',
          'Sumber air hidup ria, lautan kasih dan restu.',
          'Yang mau hidup dalam kasih Kau jadikan milik-Mu,',
          'Agar kami menyayangi, meneladan kasih-Mu.',
        ],
      },
      {
        number: 3,
        lines: [
          'Semuanya yang Kaucipta memantulkan sinar-Mu.',
          'Para malak, tata surya naikkan puji bagi-Mu.',
          'Padang, hutan dan samud’ra, bukit, gunung dan lembah,',
          'Margasatwa bergembira ‘ngajak kami pun serta.',
        ],
      },
    ],
  },
  {
    id: 'kj-249',
    role: 'penutup',
    roleLabel: 'Lagu Pujian Penutup · PA 1',
    paId: 'pa1',
    paTitle: 'PA 1: Dikasihi Untuk Mengasihi',
    sourceBook: 'Kidung Jemaat',
    number: 'KJ No. 249',
    title: 'Serikat Persaudaraan',
    toneAndTempo: 'Do = Bes · 4/4 · Teguh dan bersemangat',
    themeNote:
      'Meneguhkan tekad jemaat lintas usia untuk menjaga persatuan, rendah hati, dan mewujudkan kasih Tuhan dalam persaudaraan sehari-hari.',
    stanzas: [
      {
        number: 1,
        lines: [
          'Serikat persaudaraan, berdirilah teguh!',
          'Sempurnakan persatuan di dalam Tuhanmu.',
          'Bersama-sama majulah, dikuatkan iman,',
          'Berdamai, bersejahtera, dengan pengasihan.',
        ],
      },
      {
        number: 2,
        lines: [
          'Serikatmu tetap teguh di atas Alasan,',
          'Yaitu satu Tuhanmu, dan satulah iman,',
          'Dan satu juga baptisan dan Bapa satulah,',
          'Yang olehmu sekalian dipuji, disembah.',
        ],
      },
      {
        number: 3,
        lines: [
          'Dan masing-masing kamu pun dib’ri anugerah,',
          'Supaya kamu bertekun dan rajin bekerja.',
          'Hendaklah hatimu rendah, tahu: Tuhan berpesan',
          'Jemaat menurut firman-Nya berkasih-kasihan.',
        ],
      },
    ],
  },
  {
    id: 'kj-109',
    role: 'pembuka',
    roleLabel: 'Lagu Pujian Pembuka · PA 2',
    paId: 'pa2',
    paTitle: 'PA 2: Kepedulian adalah "Support System"',
    sourceBook: 'Kidung Jemaat',
    number: 'KJ No. 109',
    title: 'Hai Mari, Berhimpun',
    toneAndTempo: 'Do = G · 4/4 · Khidmat dan penuh sukacita Adven Natal',
    themeNote:
      'Menyuarakan berita inkarnasi Yohanes 1:14: “Terang yang ilahi, Allah yang sejati, t’lah turun menjadi manusia” sebagai sumber kepedulian bagi kita.',
    stanzas: [
      {
        number: 1,
        lines: [
          'Hai mari, berhimpun dan bersukaria!',
          'Hai mari semua ke Betlehem!',
          'Lihat Yang lahir, Raja Balasorga!',
          'Sembah dan puji Dia, sembah dan puji Dia,',
          'Sembah dan puji Dia, Tuhanmu!',
        ],
      },
      {
        number: 2,
        lines: [
          'Terang yang ilahi, Allah yang sejati,',
          't’lah turun menjadi manusia.',
          'Allah sendiri dalam rupa insan!',
          'Sembah dan puji Dia, sembah dan puji Dia,',
          'Sembah dan puji Dia, Tuhanmu!',
        ],
      },
      {
        number: 3,
        lines: [
          'Gembala dipanggil dari padang raya',
          'menuju palungan-Nya yang rendah.',
          'Kita pun turut bergegas ke sana!',
          'Sembah dan puji Dia, sembah dan puji Dia,',
          'Sembah dan puji Dia, Tuhanmu!',
        ],
      },
    ],
  },
  {
    id: 'kj-422',
    role: 'penutup',
    roleLabel: 'Lagu Pujian Penutup · PA 2',
    paId: 'pa2',
    paTitle: 'PA 2: Kepedulian adalah "Support System"',
    sourceBook: 'Kidung Jemaat',
    number: 'KJ No. 422',
    title: 'Yesus Berpesan',
    toneAndTempo: 'Do = G · 4/4 · Lembut, hangat, dan akrab lintas generasi',
    themeNote:
      'Sangat dikenal dari anak-anak hingga para lansia (adiyuswa), menguatkan panggilan untuk bersinar sebagai pembawa terang dan support system di sekitar kita.',
    stanzas: [
      {
        number: 1,
        lines: [
          'Yesus berpesan: dalam malam g’lap',
          'kamu harus jadi lilin gemerlap;',
          'anak masing-masing di sekitarnya,',
          'dalam dunia ini bersinarlah!',
        ],
      },
      {
        number: 2,
        lines: [
          'Yesus berpesan: bersinarlah t’rang;',
          'lilinmu Kulihat malam dan siang.',
          'Anak masing-masing di sekitarnya,',
          'untuk hormat Tuhan bersinarlah!',
        ],
      },
      {
        number: 3,
        lines: [
          'Yesus berpesan: dunia penuh',
          'banyak macam dosa, duka dan keluh;',
          'anak masing-masing di sekitarnya,',
          'untuk sesamamu bersinarlah!',
        ],
      },
    ],
  },
];

export const STUDY_SESSIONS: StudySession[] = [
  {
    id: 'pa1',
    label: 'Bahan PA Intergenerasional 1',
    seriesTitle: 'Masa Adven Natal 2026 – Allah Peduli',
    publisher: 'LPPS Sinode GKJ dan GKI SW Jateng',
    title: 'Dikasihi Untuk Mengasihi',
    subtitle: 'Mengalami kasih Allah yang sempurna dan membagikannya kepada sesama',
    openingHymnId: 'kj-3',
    closingHymnId: 'kj-249',
    biblePassage: {
      reference: '1 Yohanes 4:16–21',
      bookTitle: 'Surat Pertama Yohanes, Pasal 4 Ayat 16 sampai 21',
      translation: 'Alkitab Terjemahan Baru (LAI)',
      verses: [
        {
          verse: 16,
          text: 'Kita telah mengenal dan telah percaya akan kasih Allah kepada kita. Allah adalah kasih, dan barangsiapa tetap berada di dalam kasih, ia tetap berada di dalam Allah dan Allah di dalam dia.',
        },
        {
          verse: 17,
          text: 'Dalam hal inilah kasih Allah sempurna di dalam kita, yaitu kalau kita mempunyai keberanian percaya pada hari penghakiman, karena sama seperti Dia, kita juga ada di dalam dunia ini.',
        },
        {
          verse: 18,
          text: 'Di dalam kasih tidak ada ketakutan: kasih yang sempurna melenyapkan ketakutan; sebab ketakutan mengandung hukuman dan barangsiapa takut, ia tidak sempurna di dalam kasih.',
        },
        {
          verse: 19,
          text: 'Kita mengasihi, karena Allah lebih dahulu mengasihi kita.',
        },
        {
          verse: 20,
          text: 'Jikalau seorang berkata: "Aku mengasihi Allah," dan ia membenci saudaranya, maka ia adalah pendusta, karena barangsiapa tidak mengasihi saudaranya yang dilihatnya, tidak mungkin mengasihi Allah, yang tidak dilihatnya.',
        },
        {
          verse: 21,
          text: 'Dan perintah ini kita terima dari Dia: Barangsiapa mengasihi Allah, ia harus juga mengasihi saudaranya.',
        },
      ],
    },
    introTitle: 'Pengantar Pertemuan',
    introSteps: [
      'Peserta dibagi dalam kelompok dengan berbagai usia (anak, remaja, dewasa, dan adiyuswa/lansia duduk bersama).',
      'Peserta memperkenalkan diri dengan formula: “Saya…, saya merasa dikasihi ketika… (sebutkan satu tindakan atau peristiwa).”',
      'Peserta mendengarkan dan membaca penjelasan materi secara bersama-sama.',
    ],
    introHighlight: {
      label: 'Contoh Perkenalan',
      example: '“Saya Putra, saya merasa dikasihi ketika dihibur saat sedih.”',
    },
    materialIntroParagraphs: [
      'Surat 1 Yohanes 4:16–21 menjelaskan hubungan antara mengenal dan mengalami kasih Allah dan bagaimana kasih itu diwujudkan dalam hubungan dengan sesama manusia. Yohanes mengajak kita untuk melihat kasih bukan sekadar sebagai perasaan, melainkan sebagai identitas dan gaya hidup orang percaya.',
    ],
    materialPoints: [
      {
        number: '1',
        title: 'Sumber Kasih: Allah adalah Kasih (Ayat 16 & 19)',
        paragraphs: [
          'Yohanes menuliskan kalimat “Allah adalah kasih”. Kasih bukan hanya sekadar sifat Allah, tetapi hakikat dan definisi dari seluruh keberadaan Allah. Karena Allah adalah kasih, maka semua tindakan-Nya selalu digerakkan dan dinaungi oleh kasih-Nya demi kebaikan manusia.',
          'Kasih Allah adalah kasih Agape—yang memberi tanpa menuntut, mengambil inisiatif untuk mengasihi, dan bersedia berkorban. Kunci dari mengasihi sesama adalah mengalami kasih Allah terlebih dahulu (ayat 19). Manusia tidak memiliki “pabrik kasih” di dalam dirinya; ibarat air di dalam gelas, baru bisa luber keluar jika terisi penuh oleh kasih Kristus.',
        ],
      },
      {
        number: '2',
        title: 'Dampak Kasih: Melenyapkan Ketakutan (Ayat 17–18)',
        paragraphs: [
          'Ketika seseorang sungguh-sungguh memahami dan menerima kasih Allah yang telah menyelamatkannya, ketakutan akan hilang. Kasih yang sempurna dari Allah mengubah rasa takut menjadi keberanian dan keyakinan saat menghadap Allah.',
          'Banyak orang menjalani hidup keagamaan karena rasa takut—takut dihakimi atau takut dihukum. Yohanes mengingatkan bahwa orang yang terus hidup dalam ketakutan belum mengenal kasih Allah yang sempurna.',
        ],
      },
      {
        number: '3',
        title: 'Bukti Kasih: Hubungan dengan Sesama (Ayat 19–21)',
        paragraphs: [
          'Seseorang yang berkata mengasihi Allah harus membuktikannya dengan mengasihi sesama. Bagaimana mungkin mengasihi Allah yang tidak kelihatan jika gagal mengasihi sesama manusia yang kelihatan?',
          'Kasih kepada Allah dan kasih kepada sesama tidak bisa dipisahkan. Hubungan vertikal dengan Allah harus terbukti lewat hubungan horizontal dengan keluarga, tetangga, dan sesama jemaat.',
        ],
      },
    ],
    materialClosingParagraphs: [
      'Tuhan bukan hanya Transenden (Yang Maha Mulia), tetapi juga Imanen (dekat, hadir, dan terlibat langsung dengan ciptaan-Nya). Kebenaran bahwa Allah adalah kasih menjadi penenang hati saat kita menghadapi masa-masa sulit atau kecemasan akan hari esok.',
      'Jangan mencoba mengasihi orang lain hanya dengan kekuatan diri sendiri. Biarkan “gelas kasih” kita diisi penuh oleh kasih Tuhan hingga melimpah keluar bagi orang-orang di sekitar kita yang kesepian dan haus akan kasih sejati.',
    ],
    calloutTitle: 'Catatan Kata & Pokok Tema',
    calloutNotes: [
      {
        term: 'Kasih Agape',
        explanation:
          'Kasih tanpa syarat yang memberi terlebih dahulu tanpa menuntut balasan, berpusat pada pengorbanan Yesus Kristus.',
      },
      {
        term: 'Tuhan yang Transenden & Imanen',
        explanation:
          'Allah yang Maha Mulia sekaligus dekat, hadir, dan berjalan bersama umat-Nya dalam suka dan duka.',
      },
      {
        term: 'Analogi Gelas Kasih',
        explanation:
          'Kita hanya bisa membagikan kasih kepada sesama apabila hati kita lebih dahulu dipenuhi oleh kasih Allah.',
      },
    ],
    practicalApplications: [
      {
        audience: 'Untuk Lansia & Orangtua (Adiyuswa)',
        action:
          'Bagikan cerita pengalaman kasih Tuhan kepada anak dan cucu agar iman lintas generasi tetap hidup dan berakar.',
      },
      {
        audience: 'Untuk Kaum Muda & Dewasa',
        action:
          'Luangkan waktu mendengarkan orangtua dan menanyakan kabar mereka tanpa terburu-buru sebagai wujud kasih nyata.',
      },
      {
        audience: 'Untuk Keluarga & Jemaat',
        action:
          'Sapa atau kunjungi seorang anggota jemaat yang sedang kesepian atau sakit pada minggu Adven ini.',
      },
    ],
    discussionTitle: 'Bahan Diskusi Lintas Generasi',
    discussionLead:
      'Bagikan pengalaman secara bergantian dalam kelompok lintas usia. Ketuk pertanyaan di bawah ini untuk menandai soal yang sudah dibahas:',
    discussionGroups: [
      {
        groupTitle: 'Pertanyaan Diskusi Bersama (Anak, Dewasa & Adiyuswa)',
        questions: [
          'Ceritakan pengalaman Anda merasa benar-benar dikasihi oleh Tuhan.',
          'Apakah Anda pernah merasa tidak dikasihi Tuhan? Bagaimana Anda menghadapi perasaan tersebut?',
          'Bagaimana Anda menunjukkan kasih pada orang lain selama ini?',
          'Hal-hal apa yang membuat Anda sulit mengasihi orang lain?',
          'Pikirkan satu orang yang saat ini membutuhkan kasih dan kepedulian Anda. Langkah konkret apa yang akan Anda lakukan untuk menunjukkan kasih kepadanya?',
        ],
      },
    ],
    closingPrayer: {
      title: 'Pokok Doa Penutup',
      duration: '5 Menit',
      instruction:
        'Tutuplah pertemuan dengan doa bersama secara bergantian atau dipimpin oleh seorang perwakilan keluarga:',
      examples: [
        {
          speaker: 'Syukur atas Kasih Allah',
          text: '“Tuhan Yesus, terima kasih karena Engkau lebih dahulu mengasihi dan memelihara hidup kami dari masa muda hingga usia lanjut.”',
        },
        {
          speaker: 'Permohonan Kekuatan Mengasihi',
          text: '“Penuhilah gelas hati kami dengan kasih-Mu agar kami mampu mengampuni, peduli, dan menjadi berkat bagi keluarga serta sesama.”',
        },
      ],
      note: 'Setelah berdoa, jemaat dapat menyanyikan Lagu Pujian Penutup (KJ No. 249 — Serikat Persaudaraan).',
    },
  },
  {
    id: 'pa2',
    label: 'Bahan PA Intergenerasional 2',
    seriesTitle: 'Masa Adven Natal 2026 – Allah Peduli',
    publisher: 'LPPS Sinode GKJ dan GKI SW Jateng',
    title: 'Kepedulian adalah “Support System”',
    subtitle: 'Sang Firman hadir diam di antara kita, memanggil setiap generasi saling menguatkan',
    openingHymnId: 'kj-109',
    closingHymnId: 'kj-422',
    biblePassage: {
      reference: 'Yohanes 1:1–14',
      bookTitle: 'Injil Yohanes, Pasal 1 Ayat 1 sampai 14',
      translation: 'Alkitab Terjemahan Baru (LAI)',
      verses: [
        {
          verse: 1,
          text: 'Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.',
        },
        {
          verse: 2,
          text: 'Ia pada mulanya bersama-sama dengan Allah.',
        },
        {
          verse: 3,
          text: 'Segala sesuatu dijadikan oleh Dia dan tanpa Dia tidak ada suatu pun yang telah jadi dari segala yang telah dijadikan.',
        },
        {
          verse: 4,
          text: 'Dalam Dia ada hidup dan hidup itu adalah terang manusia.',
        },
        {
          verse: 5,
          text: 'Terang itu bercahaya di dalam kegelapan dan kegelapan itu tidak menguasainya.',
        },
        {
          verse: 6,
          text: 'Datanglah seorang yang diutus Allah, namanya Yohanes;',
        },
        {
          verse: 7,
          text: 'ia datang sebagai saksi untuk memberi kesaksian tentang terang itu, supaya oleh dia semua orang menjadi percaya.',
        },
        {
          verse: 8,
          text: 'Ia bukan terang itu, tetapi ia harus memberi kesaksian tentang terang itu.',
        },
        {
          verse: 9,
          text: 'Terang yang sesungguhnya, yang menerangi setiap orang, sedang datang ke dalam dunia.',
        },
        {
          verse: 10,
          text: 'Ia telah ada di dalam dunia dan dunia dijadikan oleh-Nya, tetapi dunia tidak mengenal-Nya.',
        },
        {
          verse: 11,
          text: 'Ia datang kepada milik kepunyaan-Nya, tetapi orang-orang kepunyaan-Nya itu tidak menerima-Nya.',
        },
        {
          verse: 12,
          text: 'Tetapi semua orang yang menerima-Nya diberi-Nya kuasa supaya menjadi anak-anak Allah, yaitu mereka yang percaya dalam nama-Nya;',
        },
        {
          verse: 13,
          text: 'orang-orang yang diperanakkan bukan dari darah atau dari daging, bukan pula secara jasmani oleh keinginan seorang laki-laki, melainkan oleh Allah.',
        },
        {
          verse: 14,
          text: 'Firman itu telah menjadi manusia, dan diam di antara kita, dan kita telah melihat kemuliaan-Nya, yaitu kemuliaan yang diberikan kepada-Nya sebagai Anak Tunggal Bapa, penuh kasih karunia dan kebenaran.',
        },
      ],
    },
    introTitle: 'Pengantar: Apa Itu Support System?',
    introSteps: [],
    introParagraphs: [
      'Support system (sistem pendukung) adalah jaringan orang-orang atau sumber daya di sekitar kita yang saling peduli dengan memberikan dukungan emosional, mental, dan praktis. Saat seseorang peduli pada kita dan kita juga peduli pada mereka, kita saling menjadi support system.',
      'Sesungguhnya Tuhan adalah “Support System” sejati kita, yang tinggal bersama kita dan turut merasakan penderitaan kita. Bentuk dukungan dapat berupa ruang aman untuk didengarkan tanpa dihakimi, bantuan nyata dalam tugas harian, dukungan finansial, bimbingan informasi, serta penghargaan yang tulus.',
    ],
    iceBreaking: {
      title: 'Ice Breaking & Refleksi Awal',
      subtitle: 'Permainan “Jaring Dukungan”',
      howToPlay:
        'Semua peserta duduk melingkar (campur antar-generasi). Pemimpin PA memberikan satu gulungan benang wol. Orang pertama memegang ujung benang, menyebutkan satu hal yang membuatnya merasa didukung oleh orang di sekitarnya, lalu melempar gulungan benang ke peserta lain sambil tetap memegang benang tersebut hingga terbentuk jaring yang menghubungkan semua orang.',
      reflection:
        'Jaring ini adalah gambaran support system kita. Tanpa dukungan satu sama lain, kita akan mudah sekali jatuh.',
    },
    materialIntroParagraphs: [
      'Pemahaman Singkat Yohanes 1:1–14: Mari menghayati makna Sang Firman yang telah menjadi manusia dan tinggal di antara kita.',
    ],
    materialPoints: [
      {
        number: '1',
        title: 'Ayat yang Pantas Ditulis dalam Huruf Emas (Yohanes 1:1–5)',
        paragraphs: [
          'Augustinus dalam karyanya “Kota Allah” mengutip Simplisius tentang pendapat filsuf Platonis bahwa Yohanes 1:1–5 pantas dituliskan dengan huruf emas karena keistimewaannya.',
          'Teolog reformator Francis Junius bersaksi bahwa ia bertobat setelah membaca ayat-ayat ini dalam Alkitab yang sengaja diletakkan ayahnya di jalan yang ia lalui—merasakan kuasa ilahi yang membaharui hidupnya.',
        ],
      },
      {
        number: '2',
        title: 'Terang Bercahaya dalam Kegelapan (Yohanes 1:5 & 14)',
        paragraphs: [
          'Terang yang bercahaya dalam kegelapan terhubung erat dengan inkarnasi: “Firman itu telah menjadi manusia, dan diam di antara kita.” Simbol cahaya lampu-lampu Natal merefleksikan pesan nyata: “Allah peduli pada dunia yang gelap.”',
        ],
      },
      {
        number: '3',
        title: 'Firman Menjadi Manusia: Allah Hadir Dekat (Yohanes 1:9–14)',
        paragraphs: [
          'Sebagaimana dijelaskan Pdt. Riani Josaphine Suhardja dalam Penjelasan Tema MAN 2026: “Firman (Logos) yang Ilahi dan kekal itu telah menjadi Manusia (egneto).” Hadirnya Allah tidak lagi terasa jauh, karena Dia benar-benar diam di dalam dan di antara kita sebagai Support System sejati.',
        ],
      },
    ],
    materialClosingParagraphs: [
      'Menjadi support system berarti siap menjadi sahabat bagi mereka yang tertekan, menolong mereka memiliki ketahanan (resiliensi) untuk bangkit kembali saat menghadapi kegagalan, kehilangan, atau masa sulit.',
    ],
    calloutTitle: 'Catatan Kata & Pokok Tema',
    calloutNotes: [
      {
        term: 'Logos Menjadi Manusia (Egneto)',
        explanation:
          'Firman Allah yang kekal sungguh-sungguh hadir dan tinggal di tengah kehidupan manusia, bukan hanya dari kejauhan.',
      },
      {
        term: '5 Bentuk Support System',
        explanation:
          'Dukungan emosional (mendengarkan), bantuan praktis harian, dukungan finansial, bimbingan informasi, dan penghargaan tulus.',
      },
      {
        term: 'Resiliensi',
        explanation:
          'Ketahanan untuk bangkit kembali saat mengalami kegagalan, duka, atau kesepian karena ditopang oleh Tuhan dan sesama.',
      },
    ],
    practicalApplications: [
      {
        audience: 'Peran Orangtua & Lansia (Adiyuswa)',
        action:
          'Menjadi pendengar yang teduh dan pendoa yang setia bagi anak-anak serta kaum muda yang sedang berjuang.',
      },
      {
        audience: 'Peran Kaum Muda & Dewasa',
        action:
          'Membantu orangtua/lansia belajar hal-hal baru yang relevan dengan zaman ini dengan sabar dan tanpa sikap menggurui.',
      },
      {
        audience: 'Wujud Bersama di Gereja',
        action:
          'Menciptakan ruang aman lintas usia agar setiap warga merasa didengarkan, dipedulikan, dan tidak berjalan sendirian.',
      },
    ],
    discussionTitle: 'Bahan Diskusi & Aksi Nyata',
    discussionLead:
      'Diskusikan pertanyaan sesuai generasi yang hadir, lalu lanjutkan dengan Refleksi Penutup dan Pohon Dukungan:',
    discussionGroups: [
      {
        groupTitle: 'Pertanyaan bagi Generasi Muda',
        questions: [
          'Apakah Saudara pernah merasa dipedulikan? Berikan 1 contoh kisah yang Saudara alami.',
          'Apa pelajaran berharga dari pengalaman itu?',
          'Apa yang Saudara harapkan dari Generasi Senior untuk menunjukkan bahwa mereka bisa menjadi support system Saudara?',
        ],
      },
      {
        groupTitle: 'Pertanyaan bagi Generasi Senior (Lansia / Adiyuswa)',
        questions: [
          'Apa tantangan terbesar yang sedang Saudara hadapi di zaman ini?',
          'Apa kesulitan Saudara dalam berkomunikasi dengan Generasi Muda saat ini?',
          'Bagaimana caranya agar Generasi Muda bisa peduli pada Saudara? Apa yang Saudara harapkan dari mereka sebagai support system Saudara?',
        ],
      },
      {
        groupTitle: 'Refleksi Penutup Bersama',
        questions: [
          'Jika gereja atau keluarga adalah wujud “Kristus diam di antara kita”, bentuk kepedulian seperti apa yang paling mendesak agar terjadi pengalaman hidup saling mendukung antar-generasi di Gereja kita?',
        ],
      },
    ],
    actionStep: {
      title: 'Aksi Nyata: Pohon Dukungan',
      instruction:
        'Gambarlah “Pohon Dukungan” di kertas karton besar. Setiap peserta mengambil 1 ranting dan 1 daun, lalu menuliskan satu kalimat dukungan atau komitmen agar setiap pembaca saling dikuatkan.',
      examples: [
        {
          label: 'Contoh Komitmen',
          text: '“Saya akan mendoakan anak-cucu saya tidak henti sampai akhir hidup saya.”',
        },
        {
          label: 'Contoh Dukungan',
          text: '“Saya siap menjadi sahabat curhat dengan orangtua yang membutuhkan.”',
        },
      ],
    },
    closingPrayer: {
      title: 'Doa Penutup Antar-Generasi',
      duration: '5 Menit',
      instruction:
        'Mintalah waktu dari setiap generasi untuk mendoakan generasi lainnya dengan 1 kalimat saja secara bergantian:',
      examples: [
        {
          speaker: 'Doa seorang anak',
          text: '“Tuhan Yesus, terima kasih untuk Papa dan Mama pemberian Tuhan.”',
        },
        {
          speaker: 'Doa seorang remaja',
          text: '“Tuhan Yesus, berikan kesehatan pada Oma dan Opa di masa tuanya.”',
        },
        {
          speaker: 'Doa seorang lansia',
          text: '“Tuhan Yesus, berkati kaum muda di zaman ini agar mereka tetap setia dan percaya kepada Tuhan Yesus Juruselamat mereka.”',
        },
      ],
      note: 'Doa satu kalimat berguna agar pendengar mengingat pesan doa tersebut dengan hangat. Setelah doa, tutup dengan Lagu Pujian Penutup (KJ No. 422 — Yesus Berpesan).',
    },
  },
];

export const INITIAL_SUPPORT_LEAVES: SupportLeaf[] = [
  {
    id: 'leaf-1',
    author: 'Oma Ratna',
    generation: 'Generasi Senior',
    kind: 'Komitmen',
    message: 'Saya akan mendoakan anak-cucu saya tidak henti sampai akhir hidup saya.',
  },
  {
    id: 'leaf-2',
    author: 'Andre',
    generation: 'Generasi Muda',
    kind: 'Dukungan',
    message: 'Saya siap menjadi sahabat curhat dan membantu orangtua/lansia dengan sabar.',
  },
];
