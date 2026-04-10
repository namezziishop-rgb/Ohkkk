const v8 = require('v8');
const os = require('os');
const colors = require('colors');
const ytSearch = require('youtube-search-api');
const YTDlpWrap = require('yt-dlp-wrap').default;
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Initialize yt-dlp
const ytDlp = new YTDlpWrap();

// Define professional color schemes
colors.setTheme({
    // System colors
    system: ['cyan', 'bold'],
    owner: ['magenta', 'bold'],
    brand: ['yellow', 'bold'],
    version: ['green', 'bold'],
    
    // Status colors
    success: ['green', 'bold'],
    error: ['red', 'bold'],
    warning: ['yellow', 'bold'],
    info: ['blue', 'bold'],
    
    // Bot colors
    botOnline: ['green', 'bold'],
    botOffline: ['red', 'bold'],
    botConnecting: ['yellow', 'bold'],
    
    // Feature colors
    feature: ['cyan', 'bold'],
    command: ['magenta', 'bold'],
    param: ['yellow'],
    
    // Memory colors
    memoryLow: ['green'],
    memoryMedium: ['yellow'],
    memoryHigh: ['red', 'bold'],
    
    // Attack colors
    attackStart: ['red', 'bold'],
    attackStop: ['green', 'bold'],
    attackActive: ['magenta', 'bold'],
    
    // Group colors
    groupInfo: ['cyan'],
    groupLeave: ['red'],
    groupJoin: ['green'],
    
    // Thread colors
    threadStart: ['blue'],
    threadStop: ['yellow'],
});

// Professional console symbols
const SYMBOLS = {
    // Status symbols
    SUCCESS: '✓',
    ERROR: '✗',
    WARNING: '⚠',
    INFO: 'ℹ',
    LOADING: '↻',
    
    // Connection symbols
    CONNECTED: '🟢',
    CONNECTING: '🟡',
    DISCONNECTED: '🔴',
    
    // System symbols
    BOT: '🤖',
    ATTACK: '⚡',
    GROUP: '👥',
    THREAD: '🧵',
    MEMORY: '🧠',
    COMMAND: '⌨',
    SERVER: '🖥',
    SHIELD: '🛡',
    GEAR: '⚙',
    ROCKET: '🚀',
    BELL: '🔔',
    CLOCK: '⏱',
    CHART: '📊',
    FOLDER: '📁',
    PHONE: '📱',
    KEY: '🔑',
    LOCK: '🔒',
    UNLOCK: '🔓',
    
    // UI Border symbols
    BORDER_H: '─',
    BORDER_V: '│',
    BORDER_TL: '┌',
    BORDER_TR: '┐',
    BORDER_BL: '└',
    BORDER_BR: '┘',
    BORDER_TJ: '┬',
    BORDER_BJ: '┴',
    BORDER_LJ: '├',
    BORDER_RJ: '┤',
    BORDER_CROSS: '┼',
    
    // Progress symbols
    PROGRESS: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'],
    
    // Network symbols
    NETWORK: '📡',
    SIGNAL: ['📶', '📶', '📶', '📶', '📶'],
    
    // Security symbols
    SECURITY: '🔐',
    FIREWALL: '🔥',
    
    // Menu symbols
    MENU: '📋',
    HOME: '🏠',
    BACK: '↩',
    FORWARD: '↪',
    UP: '⬆',
    DOWN: '⬇',
    
    // Action symbols
    PLAY: '▶',
    PAUSE: '⏸',
    STOP: '⏹',
    REFRESH: '🔄',
    SEARCH: '🔍',
    SETTINGS: '⚙',
    POWER: '⏻',
    
    // Social symbols
    USER: '👤',
    USERS: '👥',
    ADMIN: '👑',
    CROWN: '👑',
    STAR: '⭐',
    
    // File symbols
    FILE: '📄',
    IMAGE: '🖼',
    AUDIO: '🎵',
    VIDEO: '🎬',
    ARCHIVE: '📦',
    
    // Communication symbols
    MESSAGE: '💬',
    CHAT: '💭',
    MAIL: '📧',
    NOTIFICATION: '🔔',
    MENTION: '@',
    HASHTAG: '#',
    
    // Device symbols
    DESKTOP: '🖥',
    LAPTOP: '💻',
    MOBILE: '📱',
    TABLET: '📟',
    SERVER: '🗄',
    
    // Status indicators
    ONLINE: '🟢',
    OFFLINE: '🔴',
    IDLE: '🟡',
    DND: '⛔',
    INVISIBLE: '👻',
    
    // Arrow symbols
    ARROW_UP: '↑',
    ARROW_DOWN: '↓',
    ARROW_LEFT: '←',
    ARROW_RIGHT: '→',
    ARROW_UPRIGHT: '↗',
    ARROW_UPLEFT: '↖',
    ARROW_DOWNRIGHT: '↘',
    ARROW_DOWNLEFT: '↙',
    
    // Math symbols
    PLUS: '+',
    MINUS: '−',
    MULTIPLY: '×',
    DIVIDE: '÷',
    EQUALS: '=',
    INFINITY: '∞',
    CHECK: '✓',
    CROSS: '✗',
    
    // Time symbols
    HOURGLASS: '⏳',
    CLOCK: '🕐',
    CALENDAR: '📅',
    TIMER: '⏱',
    
    // Weather symbols
    SUN: '☀',
    CLOUD: '☁',
    RAIN: '🌧',
    STORM: '⛈',
    SNOW: '❄',
    
    // Direction symbols
    COMPASS: '🧭',
    LOCATION: '📍',
    MAP: '🗺',
    GLOBE: '🌎',
    
    // Money symbols
    MONEY: '💰',
    COIN: '🪙',
    BANK: '🏦',
    CREDIT_CARD: '💳',
    
    // Medical symbols
    HEALTH: '❤',
    HOSPITAL: '🏥',
    PILL: '💊',
    SYRINGE: '💉',
    
    // Transportation symbols
    CAR: '🚗',
    BUS: '🚌',
    TRAIN: '🚆',
    PLANE: '✈',
    SHIP: '🚢',
    
    // Food symbols
    FOOD: '🍕',
    DRINK: '🥤',
    COFFEE: '☕',
    BEER: '🍺',
    
    // Sport symbols
    TROPHY: '🏆',
    MEDAL: '🏅',
    GOAL: '🥅',
    WHISTLE: '🔈',
    
    // Game symbols
    GAME: '🎮',
    DICE: '🎲',
    CARDS: '🃏',
    CHESS: '♟',
    
    // Music symbols
    MUSIC: '🎵',
    HEADPHONES: '🎧',
    MICROPHONE: '🎤',
    SPEAKER: '🔊',
    
    // Book symbols
    BOOK: '📖',
    NEWSPAPER: '📰',
    NOTEBOOK: '📓',
    PEN: '🖊',
    
    // Tool symbols
    WRENCH: '🔧',
    HAMMER: '🔨',
    SCREWDRIVER: '🪛',
    GEAR: '⚙',
    
    // Science symbols
    MICROSCOPE: '🔬',
    TELESCOPE: '🔭',
    ATOM: '⚛',
    DNA: '🧬',
    
    // Building symbols
    HOUSE: '🏠',
    OFFICE: '🏢',
    FACTORY: '🏭',
    STORE: '🏪',
    
    // Nature symbols
    TREE: '🌳',
    FLOWER: '🌸',
    MOUNTAIN: '⛰',
    BEACH: '🏖',
    
    // Animal symbols
    DOG: '🐕',
    CAT: '🐈',
    BIRD: '🐦',
    FISH: '🐟',
    
    // Holiday symbols
    CHRISTMAS: '🎄',
    HALLOWEEN: '🎃',
    BIRTHDAY: '🎂',
    PARTY: '🎉',
    
    // Object symbols
    LIGHTBULB: '💡',
    KEY: '🔑',
    LOCK: '🔒',
    BELL: '🔔',
    CLOCK: '🕐',
    CALENDAR: '📅',
    MAP: '🗺',
    PHONE: '📱',
    CAMERA: '📷',
    TV: '📺',
    RADIO: '📻',
    BATTERY: '🔋',
    PLUG: '🔌',
    MAGNET: '🧲',
    MAGNIFYING_GLASS: '🔍',
    COMPASS: '🧭',
    THERMOMETER: '🌡',
    UMBRELLA: '☂',
    BAG: '🎒',
    GIFT: '🎁',
    BALLOON: '🎈',
    FLAG: '🏳',
    TROPHY: '🏆',
    MEDAL: '🏅',
    CROWN: '👑',
    RING: '💍',
    GEM: '💎',
    
    // Smiley symbols
    SMILE: '😊',
    SAD: '😢',
    ANGRY: '😠',
    LAUGH: '😂',
    CRY: '😭',
    SURPRISE: '😲',
    WINK: '😉',
    TONGUE: '😛',
    COOL: '😎',
    SLEEP: '😴',
    SICK: '🤒',
    LOVE: '😍',
    KISS: '😘',
    HUG: '🤗',
    THUMBSUP: '👍',
    THUMBSDOWN: '👎',
    OK: '👌',
    PRAY: '🙏',
    CLAP: '👏',
    WAVE: '👋',
    
    // Hand symbols
    POINT_UP: '☝',
    POINT_DOWN: '👇',
    POINT_LEFT: '👈',
    POINT_RIGHT: '👉',
    RAISED_HAND: '✋',
    VICTORY: '✌',
    ROCK: '✊',
    PAPER: '🖐',
    SCISSORS: '✌',
    
    // Zodiac symbols
    ARIES: '♈',
    TAURUS: '♉',
    GEMINI: '♊',
    CANCER: '♋',
    LEO: '♌',
    VIRGO: '♍',
    LIBRA: '♎',
    SCORPIO: '♏',
    SAGITTARIUS: '♐',
    CAPRICORN: '♑',
    AQUARIUS: '♒',
    PISCES: '♓',
    
    // Planet symbols
    SUN: '☉',
    MOON: '☽',
    MERCURY: '☿',
    VENUS: '♀',
    EARTH: '♁',
    MARS: '♂',
    JUPITER: '♃',
    SATURN: '♄',
    URANUS: '♅',
    NEPTUNE: '♆',
    PLUTO: '♇',
    
    // Chess symbols
    KING: '♔',
    QUEEN: '♕',
    ROOK: '♖',
    BISHOP: '♗',
    KNIGHT: '♘',
    PAWN: '♙',
    
    // Card symbols
    SPADE: '♠',
    HEART: '♥',
    DIAMOND: '♦',
    CLUB: '♣',
    
    // Music note symbols
    NOTE: '♪',
    NOTES: '♫',
    SHARP: '♯',
    FLAT: '♭',
    NATURAL: '♮',
    
    // Gender symbols
    MALE: '♂',
    FEMALE: '♀',
    TRANSGENDER: '⚧',
    
    // Warning symbols
    WARNING: '⚠',
    RADIOACTIVE: '☢',
    BIOHAZARD: '☣',
    HIGH_VOLTAGE: '⚡',
    SKULL: '☠',
    
    // Religious symbols
    CROSS: '✝',
    STAR_DAVID: '✡',
    CRESCENT: '☪',
    OM: '🕉',
    YIN_YANG: '☯',
    PEACE: '☮',
    
    // Political symbols
    HAMMER_SICKLE: '☭',
    ANARCHY: '⚑',
    
    // Writing symbols
    COPYRIGHT: '©',
    REGISTERED: '®',
    TRADEMARK: '™',
    SECTION: '§',
    PARAGRAPH: '¶',
    
    // Currency symbols
    DOLLAR: '$',
    EURO: '€',
    POUND: '£',
    YEN: '¥',
    WON: '₩',
    RUPEE: '₹',
    
    // Math operation symbols
    SUM: '∑',
    PRODUCT: '∏',
    INTEGRAL: '∫',
    PARTIAL: '∂',
    NABLA: '∇',
    INFINITY: '∞',
    ROOT: '√',
    ANGLE: '∠',
    PARALLEL: '∥',
    PERPENDICULAR: '⟂',
    EMPTY_SET: '∅',
    ELEMENT: '∈',
    SUBSET: '⊂',
    INTERSECTION: '∩',
    UNION: '∪',
    THEREFORE: '∴',
    BECAUSE: '∵',
    PROPORTIONAL: '∝',
    MINUS_PLUS: '∓',
    DOT_OPERATOR: '⋅',
    RING_OPERATOR: '∘',
    BULLET: '•',
    FRACTION: '⁄',
    
    // Logic symbols
    AND: '∧',
    OR: '∨',
    NOT: '¬',
    XOR: '⊕',
    IMPLIES: '⇒',
    EQUIVALENT: '⇔',
    FOR_ALL: '∀',
    EXISTS: '∃',
    UNIQUE: '∃!',
    
    // Set symbols
    NATURAL: 'ℕ',
    INTEGER: 'ℤ',
    RATIONAL: 'ℚ',
    REAL: 'ℝ',
    COMPLEX: 'ℂ',
    
    // Letter symbols
    ALEPH: 'ℵ',
    BET: 'ℶ',
    GIMEL: 'ℷ',
    DALET: 'ℸ',
    
    // Phonetic symbols
    SCHWA: 'ə',
    ENG: 'ŋ',
    ETH: 'ð',
    THORN: 'þ',
    ASH: 'æ',
    ESH: 'ʃ',
    EZH: 'ʒ',
    GLOTTAL: 'ʔ',
    
    // Arrow variants
    DOUBLE_ARROW_UP: '⇑',
    DOUBLE_ARROW_DOWN: '⇓',
    DOUBLE_ARROW_LEFT: '⇐',
    DOUBLE_ARROW_RIGHT: '⇒',
    LEFT_RIGHT_ARROW: '↔',
    UP_DOWN_ARROW: '↕',
    NORTH_WEST_ARROW: '↖',
    NORTH_EAST_ARROW: '↗',
    SOUTH_EAST_ARROW: '↘',
    SOUTH_WEST_ARROW: '↙',
    LEFTWARDS_ARROW: '←',
    UPWARDS_ARROW: '↑',
    RIGHTWARDS_ARROW: '→',
    DOWNWARDS_ARROW: '↓',
    
    // Technical symbols
    WIFI: '📶',
    BLUETOOTH: '📳',
    NFC: '📲',
    USB: '🔌',
    HDMI: '🖥',
    ETHERNET: '🔌',
    POWER_PLUG: '🔌',
    BATTERY_FULL: '🔋',
    BATTERY_HALF: '🔋',
    BATTERY_LOW: '🔋',
    BATTERY_EMPTY: '🔋',
    
    // UI elements
    CHECKBOX: '☐',
    CHECKBOX_CHECKED: '☑',
    RADIO: '○',
    RADIO_CHECKED: '◉',
    BULLET: '•',
    TRIANGLE_RIGHT: '▶',
    TRIANGLE_LEFT: '◀',
    TRIANGLE_UP: '▲',
    TRIANGLE_DOWN: '▼',
    
    // Weather variants
    SUNNY: '☀',
    PARTLY_CLOUDY: '⛅',
    CLOUDY: '☁',
    RAINY: '🌧',
    THUNDERSTORM: '⛈',
    SNOWY: '❄',
    WINDY: '💨',
    FOGGY: '🌫',
    TORNADO: '🌪',
    RAINBOW: '🌈',
    
    // Time variants
    WATCH: '⌚',
    ALARM_CLOCK: '⏰',
    STOPWATCH: '⏱',
    TIMER_CLOCK: '⏲',
    HOURGLASS_FLOWING: '⏳',
    HOURGLASS_DONE: '⌛',
    
    // Office symbols
    BRIEFCASE: '💼',
    FILE_FOLDER: '📁',
    OPEN_FILE_FOLDER: '📂',
    PAGE: '📄',
    PAGE_WITH_CURL: '📃',
    BOOKMARK_TABS: '📑',
    BAR_CHART: '📊',
    CLIPBOARD: '📋',
    CALENDAR_SPIRAL: '🗓',
    CARD_INDEX: '📇',
    CARD_BOX: '🗃',
    FILE_CABINET: '🗄',
    WASTEBASKET: '🗑',
    
    // Lock variants
    LOCK_WITH_KEY: '🔐',
    LOCK_WITH_INK: '🔏',
    CLOSED_LOCK: '🔒',
    OPEN_LOCK: '🔓',
    LOCK_WITH_PEN: '🔏',
    
    // Key variants
    OLD_KEY: '🗝',
    KEY2: '🔑',
    
    // Bell variants
    BELL_WITH_SLASH: '🔕',
    BELL2: '🔔',
    
    // Book variants
    OPEN_BOOK: '📖',
    GREEN_BOOK: '📗',
    BLUE_BOOK: '📘',
    ORANGE_BOOK: '📙',
    BOOKS: '📚',
    NOTEBOOK_WITH_DECORATIVE_COVER: '📔',
    LEDGER: '📒',
    
    // Money variants
    MONEY_BAG: '💰',
    YEN_BANKNOTE: '💴',
    DOLLAR_BANKNOTE: '💵',
    EURO_BANKNOTE: '💶',
    POUND_BANKNOTE: '💷',
    MONEY_WITH_WINGS: '💸',
    CREDIT_CARD2: '💳',
    
    // Mail variants
    EMAIL: '📧',
    INCOMING_ENVELOPE: '📨',
    ENVELOPE_WITH_ARROW: '📩',
    OUTBOX_TRAY: '📤',
    INBOX_TRAY: '📥',
    PACKAGE: '📦',
    MAILBOX: '📫',
    MAILBOX_CLOSED: '📪',
    MAILBOX_WITH_MAIL: '📬',
    MAILBOX_WITH_NO_MAIL: '📭',
    
    // Pencil/pen variants
    PENCIL: '📝',
    PEN: '🖊',
    FOUNTAIN_PEN: '🖋',
    PAINTBRUSH: '🖌',
    CRAYON: '🖍',
    
    // Tool variants
    HAMMER_PICK: '⚒',
    HAMMER_WRENCH: '🛠',
    PICK: '⛏',
    NUT_BOLT: '🔩',
    GEAR2: '⚙',
    CHAINS: '⛓',
    PISTOL: '🔫',
    
    // Science variants
    MICROSCOPE2: '🔬',
    TELESCOPE2: '🔭',
    SATELLITE: '🛰',
    ATOM2: '⚛',
    
    // Medical variants
    SYMBOL_MEDICAL: '⚕',
    STAFF_AESCULAPIUS: '⚕',
    
    // Warning variants
    WARNING2: '⚠',
    HIGH_VOLTAGE2: '⚡',
    
    // Religious variants
    LATIN_CROSS: '✝',
    ORTHODOX_CROSS: '☦',
    STAR_CRESCENT: '☪',
    PEACE2: '☮',
    MENORAH: '🕎',
    DHARMA_WHEEL: '☸',
    
    // Zodiac variants
    ARIES2: '♈',
    TAURUS2: '♉',
    GEMINI2: '♊',
    CANCER2: '♋',
    LEO2: '♌',
    VIRGO2: '♍',
    LIBRA2: '♎',
    SCORPIO2: '♏',
    SAGITTARIUS2: '♐',
    CAPRICORN2: '♑',
    AQUARIUS2: '♒',
    PISCES2: '♓',
    
    // Chess piece variants
    BLACK_KING: '♚',
    BLACK_QUEEN: '♛',
    BLACK_ROOK: '♜',
    BLACK_BISHOP: '♝',
    BLACK_KNIGHT: '♞',
    BLACK_PAWN: '♟',
    WHITE_KING: '♔',
    WHITE_QUEEN: '♕',
    WHITE_ROOK: '♖',
    WHITE_BISHOP: '♗',
    WHITE_KNIGHT: '♘',
    WHITE_PAWN: '♙',
    
    // Card suit variants
    BLACK_SPADE: '♠',
    BLACK_HEART: '♥',
    BLACK_DIAMOND: '♦',
    BLACK_CLUB: '♣',
    WHITE_SPADE: '♤',
    WHITE_HEART: '♡',
    WHITE_DIAMOND: '♢',
    WHITE_CLUB: '♧',
    
    // Music note variants
    EIGHTH_NOTE: '♪',
    BEAMED_EIGHTH_NOTES: '♫',
    BEAMED_SIXTEENTH_NOTES: '♬',
    FLAT_SIGN: '♭',
    NATURAL_SIGN: '♮',
    SHARP_SIGN: '♯',
    
    // Recycling symbols
    RECYCLING: '♻',
    UNIVERSAL_RECYCLING: '♻',
    
    // Service symbols
    WHEELCHAIR: '♿',
    MENS_ROOM: '🚹',
    WOMENS_ROOM: '🚺',
    RESTROOM: '🚻',
    BABY_SYMBOL: '🚼',
    WATER_CLOSET: '🚾',
    PASSPORT_CONTROL: '🛂',
    CUSTOMS: '🛃',
    BAGGAGE_CLAIM: '🛄',
    LEFT_LUGGAGE: '🛅',
    
    // Transportation symbols
    NO_ENTRY: '⛔',
    NO_BICYCLES: '🚳',
    NO_SMOKING: '🚭',
    DO_NOT_LITTER: '🚯',
    NON_POTABLE_WATER: '🚱',
    NO_PEDESTRIANS: '🚷',
    NO_MOBILE_PHONES: '📵',
    UNDERAGE: '🔞',
    RADIOACTIVE2: '☢',
    BIOHAZARD2: '☣',
    
    // Navigation symbols
    TOP_ARROW: '🔝',
    SOON_ARROW: '🔜',
    ON_ARROW: '🔛',
    END_ARROW: '🔚',
    BACK_ARROW: '🔙',
    COOL_LETTERS: '🆒',
    FREE_LETTERS: '🆓',
    INFO_LETTERS: 'ℹ',
    ID_LETTERS: '🆔',
    MC_LETTERS: '㊙',
    NEW_LETTERS: '🆕',
    NG_LETTERS: '🆖',
    OK_LETTERS: '🆗',
    SOS_LETTERS: '🆘',
    UP_LETTERS: '🆙',
    VS_LETTERS: '🆚',
    
    // Japanese symbols
    KOKO: '🈁',
    SA: '🈂',
    U7121: '🈚',
    U6307: '🈯',
    U7981: '🈲',
    U7A7A: '🈳',
    U5408: '🈴',
    U6E80: '🈵',
    U6709: '🈶',
    U6708: '🈷',
    U7533: '🈸',
    U5272: '🈹',
    U55B6: '🈺',
    
    // Korean symbols
    KOREAN_CELEBRATE: '㊗',
    KOREAN_SECRET: '㊙',
    
    // Chinese symbols
    CHINESE_CONGRATULATION: '㊗',
    CHINESE_SECRET: '㊙',
    
    // Square symbols
    SQUARED_CJK: '🈯',
    SQUARED_KATAKANA: '🈳',
    SQUARED_ID: '🆔',
    SQUARED_NEW: '🆕',
    SQUARED_SOS: '🆘',
    SQUARED_VS: '🆚',
    
    // Circled symbols
    CIRCLED_ID: '🆔',
    CIRCLED_NG: '🆖',
    CIRCLED_OK: '🆗',
    CIRCLED_UP: '🆙',
    
    // Other symbols
    COPYRIGHT2: '©',
    REGISTERED2: '®',
    TM2: '™'
};

// Professional console functions with enhanced UI
const consolex = {
    // Basic log functions with professional symbols
    log: (msg, type = 'info') => console.log(msg),
    info: (msg) => console.log(`${SYMBOLS.INFO.blue} ${msg.blue}`),
    success: (msg) => console.log(`${SYMBOLS.SUCCESS.green} ${msg.green}`),
    error: (msg) => console.log(`${SYMBOLS.ERROR.red} ${msg.red}`),
    warning: (msg) => console.log(`${SYMBOLS.WARNING.yellow} ${msg.yellow}`),
    system: (msg) => console.log(`${SYMBOLS.SERVER.cyan} ${msg.cyan.bold}`),
    bot: (msg, botId = 'SYSTEM') => console.log(`${SYMBOLS.BOT.magenta} ${botId.magenta} ${msg}`),
    attack: (msg) => console.log(`${SYMBOLS.ATTACK.red} ${msg.red}`),
    group: (msg) => console.log(`${SYMBOLS.GROUP.cyan} ${msg.cyan}`),
    thread: (msg) => console.log(`${SYMBOLS.THREAD.blue} ${msg.blue}`),
    memory: (msg, usage) => {
        let color = 'green';
        if (usage > 70) color = 'red';
        else if (usage > 40) color = 'yellow';
        console.log(`${SYMBOLS.MEMORY.magenta} ${msg}`[color]);
    },
    command: (msg) => console.log(`${SYMBOLS.COMMAND.green} ${msg.green}`),
    
    // Enhanced connection status with professional symbols
    connection: (msg, status) => {
        const statusIcon = status === 'connected' ? SYMBOLS.CONNECTED : 
                         status === 'connecting' ? SYMBOLS.CONNECTING : 
                         SYMBOLS.DISCONNECTED;
        const color = status === 'connected' ? 'green' : 
                     status === 'connecting' ? 'yellow' : 'red';
        console.log(`${statusIcon} ${msg}`[color]);
    },
    
    // New professional UI functions
    border: {
        horizontal: (length = 50, char = SYMBOLS.BORDER_H) => console.log(char.repeat(length).cyan),
        vertical: (msg, padding = 2) => {
            const totalWidth = 60;
            const msgLength = msg.length;
            const availableSpace = totalWidth - msgLength - 4;
            const leftPadding = Math.floor(availableSpace / 2);
            const rightPadding = availableSpace - leftPadding;
            console.log(`${SYMBOLS.BORDER_V.cyan}${' '.repeat(leftPadding)}${msg}${' '.repeat(rightPadding)}${SYMBOLS.BORDER_V.cyan}`);
        },
        box: (title, content, width = 60) => {
            const top = `${SYMBOLS.BORDER_TL.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_TR.cyan}`;
            const bottom = `${SYMBOLS.BORDER_BL.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_BR.cyan}`;
            
            console.log(top);
            
            // Title
            if (title) {
                const titlePadding = Math.floor((width - title.length - 2) / 2);
                const titleLine = `${SYMBOLS.BORDER_V.cyan}${' '.repeat(titlePadding)}${title}${' '.repeat(width - title.length - titlePadding - 2)}${SYMBOLS.BORDER_V.cyan}`;
                console.log(titleLine);
                console.log(`${SYMBOLS.BORDER_LJ.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_RJ.cyan}`);
            }
            
            // Content
            if (Array.isArray(content)) {
                content.forEach(line => {
                    const linePadding = width - line.length - 2;
                    console.log(`${SYMBOLS.BORDER_V.cyan} ${line}${' '.repeat(linePadding > 0 ? linePadding : 0)}${SYMBOLS.BORDER_V.cyan}`);
                });
            } else {
                const lines = content.split('\n');
                lines.forEach(line => {
                    const linePadding = width - line.length - 2;
                    console.log(`${SYMBOLS.BORDER_V.cyan} ${line}${' '.repeat(linePadding > 0 ? linePadding : 0)}${SYMBOLS.BORDER_V.cyan}`);
                });
            }
            
            console.log(bottom);
        }
    },
    
    // Progress bar
    progress: (current, total, width = 40) => {
        const percentage = Math.round((current / total) * 100);
        const filled = Math.round((width * current) / total);
        const empty = width - filled;
        
        const bar = `${SYMBOLS.PROGRESS[7].green.repeat(filled)}${SYMBOLS.PROGRESS[0].gray.repeat(empty)}`;
        console.log(`[${bar}] ${percentage.toString().cyan}%`);
    },
    
    // Header with professional styling
    header: (title, subtitle = '', width = 60) => {
        console.log('\n');
        console.log(`${SYMBOLS.BORDER_TL.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_TR.cyan}`);
        
        const titlePadding = Math.floor((width - title.length - 2) / 2);
        console.log(`${SYMBOLS.BORDER_V.cyan}${' '.repeat(titlePadding)}${title.cyan.bold}${' '.repeat(width - title.length - titlePadding - 2)}${SYMBOLS.BORDER_V.cyan}`);
        
        if (subtitle) {
            const subtitlePadding = Math.floor((width - subtitle.length - 2) / 2);
            console.log(`${SYMBOLS.BORDER_V.cyan}${' '.repeat(subtitlePadding)}${subtitle.yellow}${' '.repeat(width - subtitle.length - subtitlePadding - 2)}${SYMBOLS.BORDER_V.cyan}`);
        }
        
        console.log(`${SYMBOLS.BORDER_LJ.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_RJ.cyan}`);
    },
    
    // Footer
    footer: (text, width = 60) => {
        console.log(`${SYMBOLS.BORDER_LJ.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_RJ.cyan}`);
        
        const textPadding = Math.floor((width - text.length - 2) / 2);
        console.log(`${SYMBOLS.BORDER_V.cyan}${' '.repeat(textPadding)}${text.gray}${' '.repeat(width - text.length - textPadding - 2)}${SYMBOLS.BORDER_V.cyan}`);
        
        console.log(`${SYMBOLS.BORDER_BL.cyan}${SYMBOLS.BORDER_H.cyan.repeat(width-2)}${SYMBOLS.BORDER_BR.cyan}\n`);
    },
    
    // Table display
    table: (headers, rows) => {
        // Calculate column widths
        const colWidths = headers.map((header, i) => {
            const maxContentWidth = Math.max(...rows.map(row => String(row[i] || '').length));
            return Math.max(header.length, maxContentWidth) + 2;
        });
        
        // Print header
        let headerLine = `${SYMBOLS.BORDER_V.cyan} `;
        headers.forEach((header, i) => {
            headerLine += header.padEnd(colWidths[i], ' ');
            if (i < headers.length - 1) headerLine += `${SYMBOLS.BORDER_V.cyan} `;
        });
        headerLine += `${SYMBOLS.BORDER_V.cyan}`;
        
        const totalWidth = colWidths.reduce((a, b) => a + b, 0) + headers.length + 1;
        const topBorder = `${SYMBOLS.BORDER_TL.cyan}${SYMBOLS.BORDER_H.cyan.repeat(totalWidth-2)}${SYMBOLS.BORDER_TR.cyan}`;
        const middleBorder = `${SYMBOLS.BORDER_LJ.cyan}${colWidths.map(w => SYMBOLS.BORDER_H.cyan.repeat(w)).join(SYMBOLS.BORDER_TJ.cyan)}${SYMBOLS.BORDER_RJ.cyan}`;
        const bottomBorder = `${SYMBOLS.BORDER_BL.cyan}${SYMBOLS.BORDER_H.cyan.repeat(totalWidth-2)}${SYMBOLS.BORDER_BR.cyan}`;
        
        console.log(topBorder);
        console.log(headerLine);
        console.log(middleBorder);
        
        // Print rows
        rows.forEach(row => {
            let rowLine = `${SYMBOLS.BORDER_V.cyan} `;
            headers.forEach((_, i) => {
                const cell = String(row[i] || '');
                rowLine += cell.padEnd(colWidths[i], ' ');
                if (i < headers.length - 1) rowLine += `${SYMBOLS.BORDER_V.cyan} `;
            });
            rowLine += `${SYMBOLS.BORDER_V.cyan}`;
            console.log(rowLine);
        });
        
        console.log(bottomBorder);
    },
    
    // Status indicator
    status: (label, status, message = '') => {
        const statusIcons = {
            'success': `${SYMBOLS.SUCCESS.green}`,
            'error': `${SYMBOLS.ERROR.red}`,
            'warning': `${SYMBOLS.WARNING.yellow}`,
            'info': `${SYMBOLS.INFO.blue}`,
            'loading': `${SYMBOLS.LOADING.cyan}`,
            'online': `${SYMBOLS.ONLINE.green}`,
            'offline': `${SYMBOLS.OFFLINE.red}`,
            'idle': `${SYMBOLS.IDLE.yellow}`
        };
        
        const icon = statusIcons[status] || statusIcons.info;
        const formattedMessage = message ? `: ${message}` : '';
        console.log(`${icon} ${label.cyan}${formattedMessage}`);
    },
    
    // Section separator
    separator: (char = '─', length = 60, color = 'cyan') => {
        console.log(char.repeat(length)[color]);
    }
};

// INCREASE NODE.JS MEMORY LIMIT FOR BETTER PERFORMANCE
v8.setFlagsFromString('--max-old-space-size=16384'); // 16GB max memory

// ==============================================
// ENHANCED STOP COMMAND SYSTEM - FIXED
// ==============================================

// GLOBAL STOP MANAGEMENT SYSTEM
class StopCommandSystem {
    constructor() {
        this.stopSignals = new Map();
        this.stopCallbacks = new Map();
        this.emergencyStopFlag = false;
        this.stopPriorityQueue = [];
        this.maxStopAttempts = 3;
        this.stopRetryDelay = 500;
    }
    
    // Enhanced stop signal with priority and retry mechanism
    sendGlobalStopSignal(commandType, groupJid, priority = 'normal', force = false) {
        const signalId = `${commandType}_${groupJid || 'global'}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        
        const signal = {
            id: signalId,
            type: commandType,
            groupJid,
            timestamp: Date.now(),
            priority: priority,
            forceStop: force,
            attempts: 0,
            maxAttempts: this.maxStopAttempts,
            acknowledged: false,
            completed: false
        };
        
        // Add to priority queue
        const priorityValue = priority === 'high' ? 2 : priority === 'emergency' ? 3 : 1;
        this.stopPriorityQueue.push({ signal, priority: priorityValue });
        this.stopPriorityQueue.sort((a, b) => b.priority - a.priority);
        
        this.stopSignals.set(signalId, signal);
        
        consolex.attack(`${SYMBOLS.STOP.red} STOP SIGNAL [${priority.toUpperCase()}] ${signalId.substring(0, 15)}... for ${commandType} in ${groupJid || 'global'}`);
        
        // Process stop signals immediately
        this.processStopQueue();
        
        return signalId;
    }
    
    // Process stop queue with priority
    processStopQueue() {
        if (this.stopPriorityQueue.length === 0) return;
        
        const { signal } = this.stopPriorityQueue[0];
        
        if (signal.completed) {
            this.stopPriorityQueue.shift();
            if (this.stopPriorityQueue.length > 0) {
                setTimeout(() => this.processStopQueue(), 100);
            }
            return;
        }
        
        if (signal.attempts >= signal.maxAttempts) {
            consolex.warning(`Max stop attempts reached for ${signal.id}`);
            signal.completed = true;
            this.stopPriorityQueue.shift();
            this.stopSignals.delete(signal.id);
            
            if (this.stopPriorityQueue.length > 0) {
                setTimeout(() => this.processStopQueue(), 100);
            }
            return;
        }
        
        signal.attempts++;
        
        // Execute stop based on type
        this.executeStopSignal(signal);
        
        // Schedule next attempt if needed
        if (!signal.completed && signal.attempts < signal.maxAttempts) {
            setTimeout(() => this.processStopQueue(), this.stopRetryDelay);
        }
    }
    
    executeStopSignal(signal) {
        try {
            switch (signal.type) {
                case 'all':
                    this.executeAllStop(signal);
                    break;
                case 'stop_nc':
                    this.executeNCStop(signal);
                    break;
                case 'stop_slide':
                    this.executeSlideStop(signal);
                    break;
                case 'stop_txt':
                    this.executeTxtStop(signal);
                    break;
                case 'stop_vn':
                    this.executeVNStop(signal);
                    break;
                case 'stop_pic':
                    this.executePicStop(signal);
                    break;
                case 'stop_beat':
                    this.executeBeatStop(signal);
                    break;
                default:
                    if (signal.type.startsWith('stop_')) {
                        this.executeGenericStop(signal);
                    }
            }
            
            signal.acknowledged = true;
            
            // Mark as completed after execution
            setTimeout(() => {
                signal.completed = true;
                this.stopSignals.delete(signal.id);
                this.stopPriorityQueue = this.stopPriorityQueue.filter(s => s.signal.id !== signal.id);
                consolex.success(`${SYMBOLS.CHECK.green} Stop signal ${signal.id.substring(0, 15)}... completed`);
            }, 500);
            
        } catch (error) {
            consolex.error(`Stop execution error: ${error.message}`);
        }
    }
    
    executeAllStop(signal) {
        consolex.attack(`${SYMBOLS.FIREWALL.red} EXECUTING GLOBAL STOP FOR ${signal.groupJid || 'ALL GROUPS'}`);
        
        // Stop via parallel system
        if (signal.groupJid) {
            const stopped = parallelSystem.stopGroupAttacks(signal.groupJid);
            consolex.info(`${SYMBOLS.SHIELD.cyan} Stopped ${stopped} attacks in ${signal.groupJid}`);
        } else {
            // Stop all attacks globally
            let totalStopped = 0;
            const attacks = Array.from(parallelSystem.attacks.keys());
            attacks.forEach(attackId => {
                parallelSystem.stopAttack(attackId);
                totalStopped++;
            });
            consolex.info(`${SYMBOLS.SHIELD.cyan} Stopped ${totalStopped} attacks globally`);
        }
        
        // Stop all active threads
        const activeThreads = Array.from(ACTIVE_THREADS.keys());
        activeThreads.forEach(threadId => {
            unregisterThread(threadId);
        });
        
        // Clear all bot-specific attacks
        botManager.commandBus.getAllBots().forEach(bot => {
            if (bot.emergencyRecovery) {
                bot.emergencyRecovery();
            }
        });
        
        // Force garbage collection if available
        if (global.gc) {
            consolex.info(`${SYMBOLS.REFRESH.blue} Forcing garbage collection...`);
            global.gc();
        }
    }
    
    executeNCStop(signal) {
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING NC ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, 'nc');
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} NC attacks`);
    }
    
    executeSlideStop(signal) {
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING SLIDE ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, 'slide');
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} slide attacks`);
    }
    
    executeTxtStop(signal) {
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING TEXT ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, 'txt');
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} text attacks`);
    }
    
    executeVNStop(signal) {
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING VOICE ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, 'vn');
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} voice attacks`);
    }
    
    executePicStop(signal) {
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING IMAGE ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, 'pic');
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} image attacks`);
    }
    
    executeBeatStop(signal) {
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING BEAT ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, 'beat');
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} beat attacks`);
    }
    
    executeGenericStop(signal) {
        const attackType = signal.type.replace('stop_', '');
        consolex.attack(`${SYMBOLS.STOP.red} STOPPING ${attackType.toUpperCase()} ATTACKS IN ${signal.groupJid}`);
        const stopped = parallelSystem.stopAttacksByType(signal.groupJid, attackType);
        consolex.info(`${SYMBOLS.CHECK.green} Stopped ${stopped} ${attackType} attacks`);
    }
    
    // Enhanced stop checking with emergency override
    checkStopSignal(commandType, groupJid, botId) {
        // Update session activity
        updateSessionActivity(botId);
        
        // Emergency stop flag override
        if (this.emergencyStopFlag) {
            consolex.warning(`${SYMBOLS.WARNING.yellow} EMERGENCY STOP FLAG ACTIVE - Blocking ${commandType}`);
            return true;
        }
        
        const now = Date.now();
        let shouldStop = false;
        let stopSignalId = null;
        
        // Check all stop signals
        for (const [signalId, signal] of this.stopSignals.entries()) {
            // Clean old signals (30 seconds)
            if (now - signal.timestamp > 30000) {
                this.stopSignals.delete(signalId);
                continue;
            }
            
            const matchesStop = 
                (signal.type === 'all') ||
                (signal.type === commandType) ||
                (signal.type === 'stop_nc' && commandType.includes('nc')) ||
                (signal.type === 'stop_slide' && commandType === 'slide') ||
                (signal.type === 'stop_txt' && commandType === 'txt') ||
                (signal.type === 'stop_vn' && commandType === 'vn') ||
                (signal.type === 'stop_pic' && commandType === 'pic') ||
                (signal.type === 'stop_beat' && commandType === 'beat');
            
            const groupMatch = !signal.groupJid || signal.groupJid === groupJid;
            
            if (matchesStop && groupMatch) {
                consolex.warning(`${SYMBOLS.STOP.red} STOP COMMAND DETECTED: ${signalId.substring(0, 20)}...`);
                shouldStop = true;
                stopSignalId = signalId;
                
                // Acknowledge the signal
                signal.acknowledged = true;
                break;
            }
        }
        
        // Clean the signal after detection
        if (stopSignalId) {
            setTimeout(() => {
                this.stopSignals.delete(stopSignalId);
            }, 1000);
        }
        
        return shouldStop;
    }
    
    // Emergency stop function
    emergencyStopAll() {
        consolex.error(`${SYMBOLS.FIREWALL.red} EMERGENCY STOP INITIATED - FORCE STOPPING EVERYTHING`);
        this.emergencyStopFlag = true;
        
        // Send high priority stop signals
        this.sendGlobalStopSignal('all', null, 'emergency', true);
        
        // Force stop all threads immediately
        const threads = Array.from(ACTIVE_THREADS.keys());
        threads.forEach(threadId => {
            const thread = ACTIVE_THREADS.get(threadId);
            if (thread && thread.stopFunction) {
                try {
                    thread.stopFunction();
                } catch (e) {}
            }
            ACTIVE_THREADS.delete(threadId);
        });
        
        // Clear all bot activities
        botManager.commandBus.getAllBots().forEach(bot => {
            if (bot.activeThreads) {
                bot.activeThreads.clear();
            }
            if (bot.stopCommands) {
                bot.stopCommands.clear();
            }
        });
        
        // Reset flag after 5 seconds
        setTimeout(() => {
            this.emergencyStopFlag = false;
            consolex.success(`${SYMBOLS.CHECK.green} Emergency stop completed`);
        }, 5000);
    }
    
    // Register stop callback for specific operations
    registerStopCallback(operationId, callback) {
        this.stopCallbacks.set(operationId, callback);
    }
    
    // Unregister stop callback
    unregisterStopCallback(operationId) {
        this.stopCallbacks.delete(operationId);
    }
    
    // Execute registered stop callbacks
    executeStopCallbacks(signal) {
        this.stopCallbacks.forEach((callback, operationId) => {
            try {
                callback(signal);
            } catch (error) {
                consolex.error(`Stop callback error for ${operationId}: ${error.message}`);
            }
        });
    }
}

// Initialize enhanced stop system
const stopSystem = new StopCommandSystem();

// OPTIMIZED MEMORY MONITOR
setInterval(() => {
    const used = process.memoryUsage();
    const heapUsed = Math.round(used.heapUsed / 1024 / 1024);
    const heapTotal = Math.round(used.heapTotal / 1024 / 1024);
    const rss = Math.round(used.rss / 1024 / 1024);
    const usagePercent = Math.round((heapUsed / heapTotal) * 100);
    
    let memoryColor = 'memoryLow';
    if (usagePercent > 70) memoryColor = 'memoryHigh';
    else if (usagePercent > 40) memoryColor = 'memoryMedium';
    
    if (heapUsed > 8000) { // Only warn at 8GB (more headroom)
        consolex.warning(`${SYMBOLS.WARNING.yellow} HIGH MEMORY USAGE: Heap ${heapUsed}MB / ${heapTotal}MB | RSS: ${rss}MB`);
        // Force garbage collection if available
        if (global.gc) {
            consolex.info(`${SYMBOLS.REFRESH.blue} Forcing garbage collection...`);
            global.gc();
        }
    } else {
        // Regular memory status with color
        consolex.memory(`MEMORY: ${heapUsed}MB/${heapTotal}MB (${usagePercent}%) | RSS: ${rss}MB`, usagePercent);
    }
}, 15000); // Check every 15 seconds

// ==============================================
// ENHANCED SYSTEM CONFIGURATION
// ==============================================
const SYSTEM_OWNER = "qrixce";
const SYSTEM_BRAND = "X-BOT";
const VERSION = "2.0.2"; // Updated version
const COPYRIGHT_YEAR = "2024";
const MAX_BOTS = 4; // Maximum 4 bots allowed
const NC_THREADS = 100; // Increased to 100 threads for NC attacks
const DEFAULT_THREADS = 1; // For other attacks

// ==============================================
// ULTRA ENHANCED PARALLEL EXECUTION SYSTEM
// ==============================================
const ACTIVE_ATTACKS = new Map(); // Global attack tracker
const ACTIVE_THREADS = new Map();

// SESSION STABILITY TRACKER
const SESSION_STABILITY = new Map(); // botId -> {lastActivity, disconnectCount}

// YouTube Size Limits
const MAX_AUDIO_SIZE = 100 * 1024 * 1024; // 100MB limit for audio
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB limit for video

// YouTube Session Manager
const userYTSessions = {};

// ==============================================
// YOUTUBE DOWNLOADER FUNCTIONS
// ==============================================

// Audio Conversion Function
function convertToOgg(input, output, durationSeconds = null) {
    return new Promise((resolve, reject) => {
        let command = ffmpeg(input)
            .audioCodec("libopus")
            .audioBitrate("256k")
            .format("ogg");

        if (durationSeconds) {
            command = command.setDuration(durationSeconds);
        }

        command
            .on("end", resolve)
            .on("error", reject)
            .save(output);
    });
}

// Download YouTube Audio from URL
async function downloadYTFromUrl(url) {
    const id = Date.now();
    const mp3Path = path.join(__dirname, `play_${id}.mp3`);

    await ytDlp.execPromise([
        url,
        "-x",
        "--audio-format", "mp3",
        "--audio-quality", "320K",
        "--ffmpeg-location", ffmpegInstaller.path,
        "--js-runtimes", "node",
        "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "--cookies", "cookies.txt",
        "--no-playlist",
        "--geo-bypass",
        "-o", mp3Path
    ]);

    return mp3Path;
}

// Download YouTube Video
async function downloadYTVideo(url, quality = "sd", durationSeconds = null) {
    const id = Date.now();
    const mp4Path = path.join(__dirname, `video_${id}.mp4`);

    let format;
    if (quality === "hd") {
        format = "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080]";
    } else {
        format = "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720]";
    }

    const args = [
        url,
        "-f", format,
        "--merge-output-format", "mp4",
        "--ffmpeg-location", ffmpegInstaller.path,
        "--force-overwrites",
        "--postprocessor-args", "ffmpeg:-movflags +faststart",
        "--js-runtimes", "node",
        "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "--cookies", "cookies.txt",
        "--no-playlist",
        "--geo-bypass",
        "-o", mp4Path
    ];

    await ytDlp.execPromise(args);

    if (durationSeconds && durationSeconds > 0) {
        const trimmed = mp4Path.replace(".mp4", "_trim.mp4");
        await new Promise((res, rej) => {
            ffmpeg(mp4Path)
                .setDuration(durationSeconds)
                .output(trimmed)
                .on("end", res)
                .on("error", rej)
                .run();
        });
        fs.unlinkSync(mp4Path);
        return trimmed;
    }

    return mp4Path;
}

// Convert MP3 to OGG
function mp3ToOgg(mp3Path) {
    return new Promise((resolve, reject) => {
        const oggPath = mp3Path.replace(".mp3", ".ogg");
        ffmpeg(mp3Path)
            .audioCodec("libopus")
            .audioBitrate("256k")
            .format("ogg")
            .on("end", () => resolve(oggPath))
            .on("error", reject)
            .save(oggPath);
    });
}

// YouTube Search Function
async function searchYouTube(query) {
    try {
        const results = await ytSearch.GetListByKeyword(query, false, 10);
        return results.items.map((item, index) => ({
            number: index + 1,
            title: item.title,
            id: item.id,
            duration: item.length?.simpleText || "N/A",
            views: item.viewCountText?.simpleText || "N/A",
            channel: item.channelTitle || "Unknown",
            thumbnail: item.thumbnail?.thumbnails[0]?.url
        }));
    } catch (err) {
        console.error("YouTube search error:", err);
        return [];
    }
}

// YouTube Search Handler
async function sendYouTubeResults(sock, groupId, sender, query) {
    try {
        const results = await searchYouTube(query);
        
        if (results.length === 0) {
            return "❌ No results found.";
        }

        // Store results for this user
        const sessionId = `${groupId}:${sender}`;
        userYTSessions[sessionId] = {
            results: results,
            timestamp: Date.now()
        };

        // Clean old sessions (older than 10 minutes)
        for (const key in userYTSessions) {
            if (Date.now() - userYTSessions[key].timestamp > 10 * 60 * 1000) {
                delete userYTSessions[key];
            }
        }

        // Create results message
        let resultsText = `🎵 *YouTube Search Results*\n\n`;
        resultsText += `📝 Query: *${query}*\n\n`;
        
        results.forEach(item => {
            resultsText += `*${item.number}.* ${item.title}\n`;
            resultsText += `   ⏱ ${item.duration} | 👁️ ${item.views}\n`;
            resultsText += `   👤 ${item.channel}\n`;
            resultsText += `   ──────────────\n`;
        });

        resultsText += `\n📥 *How to Download:*\n`;
        resultsText += `• Reply with: */song 1* (for audio)\n`;
        resultsText += `• Or: */video 1* (for video - SD)\n`;
        resultsText += `• For HD: */video 1 hd*\n`;
        resultsText += `• Add duration: */song 1 30s* or */video 1 hd 60s*\n\n`;
        resultsText += `⏳ *Session valid for 10 minutes*`;
        resultsText += `\n📦 *Size Limits:* Audio: 100MB | Video: 500MB`;

        return resultsText;

    } catch (err) {
        console.error("YouTube search error:", err);
        return "❌ Search failed. Try again.";
    }
}

// YouTube Download Handler
async function handleYouTubeDownload(sock, groupId, sender, text, msg) {
    const sessionId = `${groupId}:${sender}`;
    const session = userYTSessions[sessionId];
    
    // Check if session exists and is not expired (10 minutes)
    if (!session || Date.now() - session.timestamp > 10 * 60 * 1000) {
        return "❌ Your search session has expired.\nPlease search again with: */yts <query>*";
    }

    const args = text.toLowerCase().split(" ");
    const type = args[0]; // "song" or "video"
    const itemNum = parseInt(args[1]);
    
    if (!type || !itemNum || isNaN(itemNum) || itemNum < 1 || itemNum > session.results.length) {
        return `❌ Invalid selection.\nUse: */song <1-${session.results.length}>* or */video <1-${session.results.length}>*`;
    }

    const selected = session.results[itemNum - 1];
    const videoUrl = `https://www.youtube.com/watch?v=${selected.id}`;
    
    // Parse additional options
    let durationSeconds = null;
    let quality = "sd"; // Default quality
    
    for (let i = 2; i < args.length; i++) {
        const arg = args[i];
        if (arg === "hd") {
            quality = "hd";
        } else if (arg === "sd") {
            quality = "sd";
        } else if (arg.endsWith("s")) {
            durationSeconds = parseInt(arg.replace("s", ""));
        } else if (!isNaN(parseInt(arg))) {
            durationSeconds = parseInt(arg) * 60; // Convert minutes to seconds
        }
    }

    return { selected, videoUrl, type, quality, durationSeconds };
}

// PARALLEL ATTACK TRACKER
class ParallelAttackSystem {
    constructor() {
        this.attacks = new Map(); // attackId -> attackData
        this.threadCount = new Map(); // attackId -> threadCount
        this.maxParallelAttacks = 50; // INCREASED: Maximum number of simultaneous attacks
        this.stopCallbacks = new Map(); // attackId -> stopCallback
    }
    
    // Generate unique attack ID
    generateAttackId(groupJid, attackType) {
        return `${groupJid}_${attackType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Register new attack with enhanced stop handling
    registerAttack(groupJid, attackType, data, stopCallback = null) {
        const attackId = this.generateAttackId(groupJid, attackType);
        
        const attack = {
            id: attackId,
            groupJid,
            type: attackType,
            data,
            startTime: Date.now(),
            active: true,
            threads: new Set(),
            stopRequested: false,
            stopPriority: 'normal'
        };
        
        this.attacks.set(attackId, attack);
        this.threadCount.set(attackId, 0);
        
        if (stopCallback) {
            this.stopCallbacks.set(attackId, stopCallback);
        }
        
        // Auto-cleanup after 30 minutes
        setTimeout(() => {
            if (this.attacks.has(attackId)) {
                this.gracefulStopAttack(attackId);
            }
        }, 1800000);
        
        consolex.attack(`${SYMBOLS.ROCKET.cyan} New attack registered: ${attackId.substring(0, 12)}...`);
        return attackId;
    }
    
    // Add thread to attack
    addThread(attackId, threadId) {
        if (this.attacks.has(attackId)) {
            const attack = this.attacks.get(attackId);
            attack.threads.add(threadId);
            this.threadCount.set(attackId, attack.threads.size);
        }
    }
    
    // Remove thread from attack
    removeThread(attackId, threadId) {
        if (this.attacks.has(attackId)) {
            const attack = this.attacks.get(attackId);
            attack.threads.delete(threadId);
            this.threadCount.set(attackId, attack.threads.size);
            
            // Remove attack if no threads left
            if (attack.threads.size === 0 && attack.stopRequested) {
                this.attacks.delete(attackId);
                this.threadCount.delete(attackId);
                this.stopCallbacks.delete(attackId);
                consolex.success(`${SYMBOLS.CHECK.green} Attack completed: ${attackId.substring(0, 12)}...`);
            }
        }
    }
    
    // Graceful stop specific attack (without disrupting session)
    gracefulStopAttack(attackId) {
        if (this.attacks.has(attackId)) {
            const attack = this.attacks.get(attackId);
            attack.stopRequested = true;
            attack.active = false;
            
            consolex.warning(`${SYMBOLS.STOP.yellow} Gracefully stopping attack: ${attackId.substring(0, 12)}...`);
            
            // Execute stop callback if exists
            if (this.stopCallbacks.has(attackId)) {
                try {
                    this.stopCallbacks.get(attackId)();
                } catch (error) {
                    consolex.error(`Stop callback error: ${error.message}`);
                }
            }
            
            // Mark for cleanup but don't force stop threads immediately
            setTimeout(() => {
                if (this.attacks.has(attackId)) {
                    this.attacks.delete(attackId);
                    this.threadCount.delete(attackId);
                    this.stopCallbacks.delete(attackId);
                }
            }, 5000); // Give threads 5 seconds to finish gracefully
        }
    }
    
    // Stop specific attack (with force)
    stopAttack(attackId) {
        if (this.attacks.has(attackId)) {
            const attack = this.attacks.get(attackId);
            attack.stopRequested = true;
            attack.active = false;
            
            consolex.error(`${SYMBOLS.STOP.red} Force stopping attack: ${attackId.substring(0, 12)}...`);
            
            // Execute stop callback if exists
            if (this.stopCallbacks.has(attackId)) {
                try {
                    this.stopCallbacks.get(attackId)();
                } catch (error) {
                    consolex.error(`Stop callback error: ${error.message}`);
                }
            }
            
            this.attacks.delete(attackId);
            this.threadCount.delete(attackId);
            this.stopCallbacks.delete(attackId);
        }
    }
    
    // Stop all attacks in a group
    stopGroupAttacks(groupJid) {
        let stopped = 0;
        this.attacks.forEach((attack, attackId) => {
            if (attack.groupJid === groupJid && attack.active) {
                this.gracefulStopAttack(attackId);
                stopped++;
            }
        });
        return stopped;
    }
    
    // Stop attacks by type in a group
    stopAttacksByType(groupJid, attackType) {
        let stopped = 0;
        this.attacks.forEach((attack, attackId) => {
            if (attack.groupJid === groupJid && attack.type === attackType && attack.active) {
                this.gracefulStopAttack(attackId);
                stopped++;
            }
        });
        return stopped;
    }
    
    // Get active attack count
    getActiveCount(groupJid = null, attackType = null) {
        let count = 0;
        this.attacks.forEach(attack => {
            if (!attack.active) return;
            
            const groupMatch = !groupJid || attack.groupJid === groupJid;
            const typeMatch = !attackType || attack.type === attackType;
            
            if (groupMatch && typeMatch) {
                count++;
            }
        });
        return count;
    }
    
    // Get thread count for attack
    getThreadCount(attackId) {
        return this.threadCount.get(attackId) || 0;
    }
    
    // List all active attacks
    listAttacks(groupJid = null) {
        const attacks = [];
        this.attacks.forEach(attack => {
            if (!attack.active) return;
            
            if (!groupJid || attack.groupJid === groupJid) {
                attacks.push({
                    id: attack.id,
                    type: attack.type,
                    group: attack.groupJid,
                    threads: attack.threads.size,
                    age: Math.round((Date.now() - attack.startTime) / 1000),
                    stopRequested: attack.stopRequested
                });
            }
        });
        return attacks;
    }
    
    // Check if specific attack should stop
    shouldAttackStop(attackId) {
        if (!this.attacks.has(attackId)) return true;
        
        const attack = this.attacks.get(attackId);
        return attack.stopRequested || !attack.active;
    }
    
    // Emergency stop all attacks
    emergencyStopAll() {
        let stopped = 0;
        this.attacks.forEach((attack, attackId) => {
            if (attack.active) {
                this.stopAttack(attackId);
                stopped++;
            }
        });
        return stopped;
    }
}

const parallelSystem = new ParallelAttackSystem();

// ==============================================
// GROUP FETCHER SYSTEM
// ==============================================
const FETCHED_GROUPS_FILE = './data/fetched_groups.json';

class GroupFetcher {
    constructor() {
        this.fetchedGroups = new Map(); // botId -> [groupData]
        this.loadFetchedGroups();
    }
    
    loadFetchedGroups() {
        try {
            if (fs.existsSync(FETCHED_GROUPS_FILE)) {
                const data = fs.readFileSync(FETCHED_GROUPS_FILE, 'utf8');
                const parsed = JSON.parse(data);
                for (const [botId, groups] of Object.entries(parsed)) {
                    this.fetchedGroups.set(botId, groups);
                }
                consolex.group(`${SYMBOLS.FOLDER.cyan} Loaded fetched groups for ${this.fetchedGroups.size} bots`);
            }
        } catch (err) {
            consolex.info(`${SYMBOLS.INFO.blue} No previous fetched groups found`);
        }
    }
    
    saveFetchedGroups() {
        try {
            const data = {};
            this.fetchedGroups.forEach((groups, botId) => {
                data[botId] = groups;
            });
            fs.writeFileSync(FETCHED_GROUPS_FILE, JSON.stringify(data, null, 2));
        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR.red} Error saving fetched groups: ${err.message}`);
        }
    }
    
    async fetchGroupsForBot(botSession) {
        try {
            if (!botSession.sock || !botSession.connected) {
                throw new Error('Bot not connected');
            }
            
            consolex.bot(`${SYMBOLS.SEARCH.cyan} Fetching groups...`, botSession.botId);
            
            // Fetch all groups using WhatsApp's group fetch method
            const groups = await botSession.sock.groupFetchAllParticipating();
            
            const groupList = [];
            
            for (const [jid, group] of Object.entries(groups)) {
                try {
                    const groupInfo = {
                        jid: jid,
                        name: group.subject || 'No Name',
                        size: group.participants?.length || 0,
                        creation: group.creation ? new Date(group.creation * 1000).toISOString().split('T')[0] : 'Unknown',
                        desc: group.desc || 'No description',
                        isAnnouncement: group.announce === true,
                        isLocked: group.restrict === true,
                        participants: group.participants?.length || 0,
                        admins: group.participants?.filter(p => p.admin).length || 0,
                        fetchedAt: new Date().toISOString()
                    };
                    groupList.push(groupInfo);
                } catch (groupErr) {
                    consolex.bot(`${SYMBOLS.ERROR.red} Error processing group ${jid}: ${groupErr.message}`, botSession.botId);
                }
            }
            
            // Store fetched groups for this bot
            this.fetchedGroups.set(botSession.botId, groupList);
            this.saveFetchedGroups();
            
            consolex.success(`${SYMBOLS.SUCCESS.green} Successfully fetched ${groupList.length} groups`);
            
            return {
                success: true,
                count: groupList.length,
                groups: groupList
            };
            
        } catch (error) {
            consolex.error(`${SYMBOLS.ERROR.red} Error fetching groups: ${error.message}`);
            return {
                success: false,
                error: error.message,
                count: 0,
                groups: []
            };
        }
    }
    
    getFetchedGroups(botId) {
        return this.fetchedGroups.get(botId) || [];
    }
    
    formatGroupList(groups, startIndex = 0) {
        if (groups.length === 0) {
            return "📭 No groups fetched or bot is not in any groups.";
        }
        
        let formatted = `📋 *FETCHED GROUPS (${groups.length})*\n\n`;
        
        groups.forEach((group, index) => {
            const actualIndex = startIndex + index + 1;
            formatted += `${actualIndex}. *${group.name}*\n`;
            formatted += `   👥 Members: ${group.size}\n`;
            formatted += `   🛡️ Admins: ${group.admins}\n`;
            formatted += `   📅 Created: ${group.creation}\n`;
            formatted += `   🆔 ID: ${group.jid.split('@')[0]}\n`;
            
            if (group.isAnnouncement) formatted += `   📢 Announcement Group\n`;
            if (group.isLocked) formatted += `   🔒 Restricted Group\n`;
            
            if (group.desc && group.desc !== 'No description') {
                const shortDesc = group.desc.length > 50 ? group.desc.substring(0, 47) + '...' : group.desc;
                formatted += `   📝 Description: ${shortDesc}\n`;
            }
            
            formatted += `\n`;
        });
        
        return formatted;
    }
    
    async leaveGroupByIndex(botSession, index, senderJid) {
        try {
            const groups = this.getFetchedGroups(botSession.botId);
            
            if (groups.length === 0) {
                throw new Error('No groups fetched. Use /fetchgc first.');
            }
            
            if (index < 0 || index >= groups.length) {
                throw new Error(`Invalid index. Please use a number between 1 and ${groups.length}`);
            }
            
            const group = groups[index];
            
            consolex.group(`${SYMBOLS.EXIT.red} Leaving group: ${group.name} (${group.jid})`);
            
            // Send notification before leaving
            await botSession.sendMessage(senderJid, 
                `🚪 *LEAVING GROUP*\n\n` +
                `📛 Name: ${group.name}\n` +
                `👥 Members: ${group.size}\n` +
                `🆔 ID: ${group.jid}\n\n` +
                `⚠️ Bot will leave the group now...`
            );
            
            // Leave the group
            await botSession.sock.groupLeave(group.jid);
            
            // Remove from fetched list
            groups.splice(index, 1);
            this.fetchedGroups.set(botSession.botId, groups);
            this.saveFetchedGroups();
            
            // Clear chat history by sending a chat modification request
            try {
                // This clears the chat from WhatsApp's perspective
                await botSession.sock.chatModify({ 
                    delete: true,
                    lastMessages: [{ key: { remoteJid: group.jid, fromMe: true, id: '1' }, messageTimestamp: Date.now() }]
                }, group.jid);
            } catch (clearErr) {
                consolex.warning(`${SYMBOLS.WARNING.yellow} Could not clear chat history: ${clearErr.message}`);
            }
            
            consolex.success(`${SYMBOLS.SUCCESS.green} Successfully left group: ${group.name}`);
            
            return {
                success: true,
                groupName: group.name,
                groupJid: group.jid,
                remainingGroups: groups.length
            };
            
        } catch (error) {
            consolex.error(`${SYMBOLS.ERROR.red} Error leaving group: ${error.message}`);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    clearFetchedGroups(botId) {
        this.fetchedGroups.delete(botId);
        this.saveFetchedGroups();
        consolex.info(`${SYMBOLS.INFO.blue} Cleared fetched groups for bot: ${botId}`);
    }
}

// Initialize group fetcher
const groupFetcher = new GroupFetcher();

// ENHANCED SESSION STABILITY CHECK
function updateSessionActivity(botId) {
    SESSION_STABILITY.set(botId, {
        lastActivity: Date.now(),
        disconnectCount: SESSION_STABILITY.get(botId)?.disconnectCount || 0
    });
}

// ENHANCED STOP CHECKING WITH PRIORITY
function checkStopSignal(commandType, groupJid, botId) {
    return stopSystem.checkStopSignal(commandType, groupJid, botId);
}

// REGISTER THREAD GLOBALLY
function registerThread(threadId, threadData) {
    ACTIVE_THREADS.set(threadId, {
        ...threadData,
        registeredAt: Date.now(),
        active: true
    });
    
    // Register thread in parallel system if it has an attackId
    if (threadData.attackId) {
        parallelSystem.addThread(threadData.attackId, threadId);
    }
    
    // Register stop callback
    if (threadData.stopFunction) {
        stopSystem.registerStopCallback(threadId, threadData.stopFunction);
    }
    
    // Auto-cleanup for stale threads (15 minutes)
    setTimeout(() => {
        if (ACTIVE_THREADS.has(threadId)) {
            const thread = ACTIVE_THREADS.get(threadId);
            if (thread.active) {
                consolex.thread(`${SYMBOLS.WARNING.yellow} Auto-cleaning stale thread: ${threadId.substring(0, 15)}...`);
                thread.active = false;
                ACTIVE_THREADS.delete(threadId);
                stopSystem.unregisterStopCallback(threadId);
            }
        }
    }, 900000);
}

// GRACEFUL UNREGISTER THREAD
function unregisterThread(threadId) {
    if (!ACTIVE_THREADS.has(threadId)) return;
    
    const threadData = ACTIVE_THREADS.get(threadId);
    
    // Mark as inactive first
    if (threadData) {
        threadData.active = false;
    }
    
    // Remove from parallel system
    if (threadData && threadData.attackId) {
        parallelSystem.removeThread(threadData.attackId, threadId);
    }
    
    // Unregister stop callback
    stopSystem.unregisterStopCallback(threadId);
    
    // Small delay before actual deletion to ensure cleanup
    setTimeout(() => {
        ACTIVE_THREADS.delete(threadId);
    }, 1000);
}

// GET ACTIVE THREAD COUNT
function getActiveThreadCount(commandType = null, groupJid = null) {
    let count = 0;
    ACTIVE_THREADS.forEach((thread) => {
        if (!thread.active) return;
        
        const typeMatch = !commandType || thread.type === commandType || 
                         (commandType === 'nc' && thread.type.includes('nc'));
        const groupMatch = !groupJid || thread.groupJid === groupJid;
        if (typeMatch && groupMatch) count++;
    });
    return count;
}

// ==============================================
// EXISTING CODE CONTINUES WITH MODIFICATIONS...
// ==============================================
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason, delay, fetchLatestBaileysVersion, Browsers, downloadMediaMessage } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const readline = require('readline');
const gtts = require('node-gtts');
const path = require('path');
const { spawn } = require("child_process");
const { execSync } = require('child_process');

// ==============================================
// SESSION MANAGEMENT SYSTEM
// ==============================================
const SESSIONS_FILE = './data/sessions.json';
const BOT_MODE_FILE = './data/bot_mode.json';

// Load saved sessions
function loadSessions() {
    try {
        if (fs.existsSync(SESSIONS_FILE)) {
            const data = fs.readFileSync(SESSIONS_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        consolex.info(`${SYMBOLS.INFO.blue} No saved sessions found`);
    }
    return {};
}

// Save sessions
function saveSessions(sessions) {
    try {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data', { recursive: true });
        }
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
        consolex.success(`${SYMBOLS.SUCCESS.green} Sessions saved: ${Object.keys(sessions).length} bots`);
    } catch (err) {
        consolex.error(`${SYMBOLS.ERROR.red} Error saving sessions: ${err.message}`);
    }
}

// Load bot mode (x1-x4)
function loadBotMode() {
    try {
        if (fs.existsSync(BOT_MODE_FILE)) {
            const data = fs.readFileSync(BOT_MODE_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        consolex.info(`${SYMBOLS.INFO.blue} No bot mode saved, using default (x4)`);
    }
    return { mode: 'x4', activeBots: [] };
}

// Save bot mode
function saveBotMode(mode) {
    try {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data', { recursive: true });
        }
        fs.writeFileSync(BOT_MODE_FILE, JSON.stringify(mode, null, 2));
        consolex.success(`${SYMBOLS.SUCCESS.green} Bot mode saved: ${mode.mode}`);
    } catch (err) {
        consolex.error(`${SYMBOLS.ERROR.red} Error saving bot mode: ${err.message}`);
    }
}

// Global bot mode state
let botMode = loadBotMode();
let savedSessions = loadSessions();

// Enhanced TTS Configuration
const TTS_CONFIG = {
    hindi: {
        lang: 'hi',
        rate: 1.0,
        pitch: 1.0
    },
    english: {
        lang: 'en',
        rate: 1.0,
        pitch: 1.0
    }
};

// Function to check if TTS is working
function checkTTS() {
    try {
        const tts = gtts('hi');
        consolex.success(`${SYMBOLS.SUCCESS.green} TTS engine initialized for Hindi`);
        return true;
    } catch (error) {
        consolex.error(`${SYMBOLS.ERROR.red} TTS engine error: ${error.message}`);
        consolex.info(`${SYMBOLS.INFO.blue} Install missing packages:`);
        consolex.info(`${SYMBOLS.INFO.blue}    npm install node-gtts`);
        consolex.info(`${SYMBOLS.INFO.blue}    Or try: npm install gtts`);
        return false;
    }
}

// Check TTS at startup
const TTS_AVAILABLE = checkTTS();

const ROLES_FILE = './data/roles.json';
const BOTS_FILE = './data/bots.json';
const DELAYS_FILE = './data/ncDelays.json';
const TMP_DIR = './tmp';

// Create necessary directories (REMOVED automatic creation of temp_music, temp_video, cookies)
// Only create essential directories
if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Create data directory
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data', { recursive: true });
}

// Create menu image directory
const MENU_IMAGES_DIR = './menu_images';
if (!fs.existsSync(MENU_IMAGES_DIR)) fs.mkdirSync(MENU_IMAGES_DIR, { recursive: true });

// Function to clean filename
function cleanFilename(title) {
    return title
        .replace(/[\\/:*?"<>|]/g, '_')  // Replace invalid filename characters
        .replace(/\s+/g, ' ')          // Replace multiple spaces with single space
        .trim()
        .substring(0, 100);             // Limit length
}

// Function to save react emoji
function saveReactEmoji(botId, emoji) {
    const REACT_FILE = path.join(TMP_DIR, `${botId}_react_emoji.txt`);
    fs.writeFileSync(REACT_FILE, emoji.trim());
}

// Function to load react emoji
function loadReactEmoji(botId) {
    const REACT_FILE = path.join(TMP_DIR, `${botId}_react_emoji.txt`);
    if (fs.existsSync(REACT_FILE)) {
        const emoji = fs.readFileSync(REACT_FILE, 'utf8').trim();
        return emoji || null;
    }
    return null;
}

// FIXED: Enhanced TTS function for Hindi
function generateVoiceNote(text, lang = 'hi') {
    return new Promise(async (resolve, reject) => {
        try {
            // Clean the text for better TTS results
            const cleanText = text
                .replace(/[^\u0900-\u097F\s\w.,!?;:'"()\-]/g, '') // Keep Hindi chars, spaces, basic punctuation
                .trim();
            
            if (!cleanText) {
                reject(new Error('Empty text after cleaning'));
                return;
            }
            
            // Use Google TTS with proper parameters
            const tts = gtts(lang);
            const tempFile = path.join('./temp', `tts_${Date.now()}_${Math.random().toString(36).substring(7)}.mp3`);
            
            if (!fs.existsSync('./temp')) {
                fs.mkdirSync('./temp', { recursive: true });
            }
            
            // Create the TTS file
            await new Promise((ttsResolve, ttsReject) => {
                tts.save(tempFile, cleanText, () => {
                    consolex.success(`${SYMBOLS.SUCCESS.green} TTS file created: ${tempFile}`);
                    ttsResolve();
                }, (err) => {
                    ttsReject(err);
                });
            });
            
            // Wait a bit for file to be fully written
            await delay(100);
            
            // Read the file
            if (!fs.existsSync(tempFile)) {
                reject(new Error('TTS file not created'));
                return;
            }
            
            const data = fs.readFileSync(tempFile);
            
            // Verify file has content
            if (data.length < 100) {
                reject(new Error('TTS file too small (empty audio)'));
                return;
            }
            
            // Clean up temp file
            try {
                fs.unlinkSync(tempFile);
            } catch (e) {
                // Ignore cleanup errors
            }
            
            resolve(data);
            
        } catch (error) {
            consolex.error(`${SYMBOLS.ERROR.red} TTS Error: ${error.message}`);
            
            // Fallback: Try alternative method
            try {
                consolex.info(`${SYMBOLS.INFO.blue} Trying fallback TTS method...`);
                const fallbackResult = await generateFallbackTTS(text, lang);
                resolve(fallbackResult);
            } catch (fallbackError) {
                reject(fallbackError);
            }
        }
    });
}

// Fallback TTS function using different approach
async function generateFallbackTTS(text, lang = 'hi') {
    return new Promise((resolve, reject) => {
        try {
            // Simple phonetic fallback for testing
            consolex.info(`${SYMBOLS.INFO.blue} Fallback TTS for: "${text}"`);
            
            // Create a minimal MP3 header (silent audio)
            const silentAudio = Buffer.alloc(44 + 1000);
            silentAudio.write('RIFF', 0);
            silentAudio.writeUInt32LE(1000 + 36, 4);
            silentAudio.write('WAVE', 8);
            silentAudio.write('fmt ', 12);
            silentAudio.writeUInt32LE(16, 16);
            silentAudio.writeUInt16LE(1, 20); // PCM format
            silentAudio.writeUInt16LE(1, 22); // Mono
            silentAudio.writeUInt32LE(22050, 24); // Sample rate
            silentAudio.writeUInt32LE(22050 * 2, 28); // Byte rate
            silentAudio.writeUInt16LE(2, 32); // Block align
            silentAudio.writeUInt16LE(16, 34); // Bits per sample
            silentAudio.write('data', 36);
            silentAudio.writeUInt32LE(1000, 40);
            
            resolve(silentAudio);
            
        } catch (error) {
            reject(new Error(`Fallback TTS failed: ${error.message}`));
        }
    });
}

// Function to extract group ID from WhatsApp link
function extractGroupIdFromLink(link) {
    try {
        // Remove any whitespace
        link = link.trim();
        
        // Check if it's a WhatsApp invite link
        if (!link.includes('chat.whatsapp.com')) {
            return null;
        }
        
        // Extract the invite code
        let inviteCode = '';
        
        if (link.includes('/invite/')) {
            inviteCode = link.split('/invite/')[1];
        } else if (link.includes('/')) {
            const parts = link.split('/');
            inviteCode = parts[parts.length - 1];
        }
        
        // Remove any query parameters
        inviteCode = inviteCode.split('?')[0];
        
        if (!inviteCode || inviteCode.length < 10) {
            return null;
        }
        
        return inviteCode;
    } catch (error) {
        consolex.error(`${SYMBOLS.ERROR.red} Error extracting group ID: ${error}`);
        return null;
    }
}

// Enhanced professional ownership display
function displayOwnership() {
    console.log('\n');
    consolex.header(`${SYMBOLS.ROCKET} ${SYSTEM_BRAND} ULTRA v${VERSION} ${SYMBOLS.ROCKET}`, `${SYMBOLS.CROWN} OWNER: ${SYSTEM_OWNER}`, 70);
    
    const content = [
        `${SYMBOLS.SERVER} SYSTEM: ${SYSTEM_BRAND}`,
        `${SYMBOLS.CROWN} OWNER: ${SYSTEM_OWNER}`,
        `${SYMBOLS.CALENDAR} YEAR: ${COPYRIGHT_YEAR}`,
        `${SYMBOLS.GEAR} VERSION: ${VERSION}`,
        `${SYMBOLS.SHIELD} STATUS: OPERATIONAL`,
        `${SYMBOLS.BOT} MAX BOTS: ${MAX_BOTS}`,
        `${SYMBOLS.THREAD} NC THREADS: ${NC_THREADS}`
    ];
    
    consolex.border.box(`${SYMBOLS.SHIELD} SYSTEM INFORMATION`, content, 68);
    console.log('\n');
    return true;
}

const defaultRoles = {
    admins: [],
    subAdmins: {}
};

const defaultDelays = {
    nc1: 1000, // CHANGED TO 1000ms DEFAULT
    nc2: 1000,
    nc3: 1000,
    nc4: 1000,
    nc5: 1000,
    nc7: 1000,
    nc8: 1000
};

function loadRoles() {
    try {
        if (fs.existsSync(ROLES_FILE)) {
            const data = fs.readFileSync(ROLES_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        consolex.system(`${SYMBOLS.INFO} Loading default roles`);
    }
    return { ...defaultRoles };
}

function saveRoles(roles) {
    try {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data', { recursive: true });
        }
        fs.writeFileSync(ROLES_FILE, JSON.stringify(roles, null, 2));
    } catch (err) {
        consolex.error(`${SYMBOLS.ERROR} Error saving roles: ${err.message}`);
    }
}

function loadDelays() {
    try {
        if (fs.existsSync(DELAYS_FILE)) {
            const data = fs.readFileSync(DELAYS_FILE, 'utf8');
            return { ...defaultDelays, ...JSON.parse(data) };
        }
    } catch (err) {
        consolex.system(`${SYMBOLS.INFO} Using default delays`);
    }
    return { ...defaultDelays };
}

function saveDelays(delays) {
    try {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data', { recursive: true });
        }
        fs.writeFileSync(DELAYS_FILE, JSON.stringify(delays, null, 2));
    } catch (err) {
        consolex.error(`${SYMBOLS.ERROR} Error saving delays: ${err.message}`);
    }
}

let roles = loadRoles();
let ncDelays = loadDelays();

function isAdmin(jid) {
    return roles.admins.includes(jid);
}

function isSubAdmin(jid, groupJid) {
    return roles.subAdmins[groupJid]?.includes(jid) || false;
}

function hasPermission(jid, groupJid) {
    return isAdmin(jid) || isSubAdmin(jid, groupJid);
}

function addAdmin(jid) {
    if (!roles.admins.includes(jid)) {
        roles.admins.push(jid);
        saveRoles(roles);
        return true;
    }
    return false;
}

function removeAdmin(jid) {
    const index = roles.admins.indexOf(jid);
    if (index > -1) {
        roles.admins.splice(index, 1);
        saveRoles(roles);
        return true;
    }
    return false;
}

function addSubAdmin(jid, groupJid) {
    if (!roles.subAdmins[groupJid]) {
        roles.subAdmins[groupJid] = [];
    }
    if (!roles.subAdmins[groupJid].includes(jid)) {
        roles.subAdmins[groupJid].push(jid);
        saveRoles(roles);
        return true;
    }
    return false;
}

function removeSubAdmin(jid, groupJid) {
    if (roles.subAdmins[groupJid]) {
        const index = roles.subAdmins[groupJid].indexOf(jid);
        if (index > -1) {
            roles.subAdmins[groupJid].splice(index, 1);
            saveRoles(roles);
            return true;
        }
    }
    return false;
}

const emojiArrays = {
    nc1: ['🖤', '❤️', '💙', '💜', '🧡', '💚', '💛', '🤎', '🤍', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔'],
    nc2: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '☺️', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝'],
    nc3: ['🌻', '🌼', '🌷', '🌱', '🌿', '☘️', '🎍', '🎋', '🍀', '🍂', '🍁', '🌾', '🌵', '🌴', '🌳', '🌲', '🌺', '🌸', '🏵️', '🌹', '🥀', '🪷', '💐', '🌧️', '⛈️', '🌩️', '🌪️', '🌈', '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌨️', '❄️', '☃️', '🌬️', '💨', '🌫️', '🔥', '💧', '🌊'],
    nc4: ['🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟'],
    nc5: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅'],
    nc7: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🥍', '🏏', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷'],
    nc8: ['🔥', '💥', '✨', '🌟', '💫', '⭐', '🌠', '☄️', '💦', '💨', '🌈', '🌪️', '🌀', '🌊', '🧨', '🎆', '🎇', '🧨', '🪔', '📡', '💎', '🔮', '🪄', '🧿', '🕶️', '🥽', '🔭', '🔬']
};

// ==============================================
// UPDATED MENU PANEL WITH x1-x4 COMMANDS
// ==============================================
const menuPanel = `╔══════════════╗
║               *X-BOT*             ║
╚══════════════╝

╔════════════════════╗
║ 👑 Owner     : ${SYSTEM_OWNER}
║ 🤖 System    : ${SYSTEM_BRAND}
║ 📅 Copyright : ${COPYRIGHT_YEAR}
╚════════════════════╝
────────────────────────✗
╔══════════════════╗
║ 📋 *ADMINISTRATION*
╚══════════════════╝
╔═══════════╗
║ /admin
║ /unadmin
║ /sub @user
║ /unsub @user
╚═══════════╝
────────────────────────✗
╔══════════════════╗
║ 🤖 *BOT MANAGEMENT*
╚══════════════════╝
╔═══════════╗
║ /add [number]
║ /bots
║ /ping
║ /recover
║ /threads
║ /pairstatus
╚═══════════╝
────────────────────────✗
╔══════════════════╗
║ 👥 *GROUP CONTROL*
╚══════════════════╝
╔═══════════╗
║ /join [link]
║ /leave
╚═══════════╝
────────────────────────✗
╔══════════════════╗
║ 👥 *GROUP FETCHER*
╚══════════════════╝
╔═════════════╗
║ /fetchgc
║ /gcl [number]
║ /cleargc
╚═════════════╝
────────────────────────✗
╔══════════════════╗
║ ⚡ *FAST ATTACKS*
╚══════════════════╝
╔════════╗
║ /nc1 [text]
║ /nc2 [text]
║ /nc3 [text]
║ /nc4 [text]
║ /nc5 [text]
║ /nc7 [text]
║ /nc8 [text]
║ /ncstop
╚════════╝
────────────────────────✗
╔══════════════════╗
║ 🥊 *BEAT ATTACK*
╚══════════════════╝
╔═════════╗
║ /beat @user
║ /stopbeat
╚═════════╝
────────────────────────✗
╔══════════════════╗
║ ⏱️ *DELAY CONFIG*
╚══════════════════╝
╔══════════╗
║ /dnc1 [ms]
║ /dnc2 [ms]
║ /dnc3 [ms]
║ /dnc4 [ms]
║ /dnc5 [ms]
║ /dnc7 [ms]
║ /dnc8 [ms]
╚══════════╝
────────────────────────✗
╔══════════════════╗
║ 🌪️ *SPAMS*
╚══════════════════╝
╔═════════════╗
║ /slide [text] [delay]
║ /slidestop
║ /txt [text] [delay]
║ /txtstop
╚═════════════╝
────────────────────────✗
╔══════════════════╗
║ 🎤 *VOICE NOTE*
╚══════════════════╝
╔══════════════╗
║ /vn [text]
║ /vnatk [text] [delay]
║ /vnstop
╚══════════════╝
────────────────────────✗
╔══════════════════╗
║ 🖼️ *MEDIA SPAM*
╚══════════════════╝
╔═════════╗
║ /pic [delay]
║ /picstop
╚═════════╝
────────────────────────✗
╔══════════════════╗
║ 🎵 *YOUTUBE DOWNLOADER*
╚══════════════════╝
╔════════════════════╗
║ /yts [query] - Search YouTube
║ /song [num] - Download audio 
║ /video [num] - Video (SD/HD)
║ Options: /song 1 30s
║  •  /video 1 hd 60s
║  • /video 1 sd 120s
╚════════════════════╝
────────────────────────✗
╔══════════════════╗
║ 🏵 *AUTO-REACT*
╚══════════════════╝
╔═════════════╗
║ /setreact [emoji]
║ /stopreact
║ /reactstatus
╚═════════════╝
────────────────────────✗
╔══════════════════╗
║ 🤖 *BOT SELECTION*
╚══════════════════╝
╔══════════╗
║ /x1 - Solo Mode
║ /x2 - 2 Bots
║ /x3 - 3 Bots
║ /x4 - All 4 Bots
╚══════════╝
────────────────────────✗
╔══════════════════╗
║ 🛡️ *SYSTEM CTRL*
╚══════════════════╝
╔══════════╗
║ /allstop
║ /attackstatus
╚══════════╝
────────────────────────✗
╔══════════════════╗
║ ℹ️ *INFORMATION*
╚══════════════════╝
╔═══════╗
║ /menu
║ /status
╚═══════╝
────────────────────────✗
╔════════════════════╗
║                 *-DEVELOPER-*              ║ 
╠════════════════════╣
║ Owner   : ${SYSTEM_OWNER}
║ Version : ${VERSION}
║ Status  : OPERATIONAL ⚡
╚════════════════════╝
`;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

function generateTTS(text, lang = 'en') {
    return new Promise((resolve, reject) => {
        const tts = gtts(lang);
        const chunks = [];
        
        tts.stream(text).on('data', (chunk) => {
            chunks.push(chunk);
        }).on('end', () => {
            resolve(Buffer.concat(chunks));
        }).on('error', (err) => {
            reject(err);
        });
    });
}

class CommandBus {
    constructor() {
        this.botSessions = new Map();
        this.processedMessages = new Map();
        this.messageCleanupInterval = 3000;
        
        // MEMORY MANAGEMENT: Clean processed messages more frequently
        setInterval(() => {
            const now = Date.now();
            let deleted = 0;
            this.processedMessages.forEach((timestamp, msgId) => {
                if (now - timestamp > this.messageCleanupInterval) {
                    this.processedMessages.delete(msgId);
                    deleted++;
                }
            });
            
            // Force cleanup if too many messages stored
            if (this.processedMessages.size > 10000) {
                const keys = Array.from(this.processedMessages.keys());
                for (let i = 0; i < 5000; i++) {
                    this.processedMessages.delete(keys[i]);
                }
            }
        }, this.messageCleanupInterval);
    }

    registerBot(botId, session) {
        this.botSessions.set(botId, session);
        // Initialize session stability tracker
        SESSION_STABILITY.set(botId, {
            lastActivity: Date.now(),
            disconnectCount: 0
        });
        
        // Save session
        savedSessions[botId] = {
            phoneNumber: session.phoneNumber,
            authPath: session.authPath,
            registeredAt: new Date().toISOString(),
            botName: session.botName || `BOT${this.getConnectedBots().length}`
        };
        saveSessions(savedSessions);
    }

    unregisterBot(botId) {
        this.botSessions.delete(botId);
        SESSION_STABILITY.delete(botId);
        
        // Remove from saved sessions
        if (savedSessions[botId]) {
            delete savedSessions[botId];
            saveSessions(savedSessions);
        }
    }

    shouldProcessMessage(msgId) {
        if (this.processedMessages.has(msgId)) {
            return false;
        }
        // Limit stored messages to prevent memory overflow
        if (this.processedMessages.size > 15000) {
            // Remove oldest entries
            const firstKey = this.processedMessages.keys().next().value;
            this.processedMessages.delete(firstKey);
        }
        this.processedMessages.set(msgId, Date.now());
        return true;
    }

    async broadcastCommand(commandType, data, originBotId, sendConfirmation = true) {
        // Filter bots based on current mode
        let bots = [];
        
        if (botMode.mode === 'x1') {
            // Solo mode - only use the first bot
            const firstBot = this.getConnectedBots()[0];
            if (firstBot) {
                bots = [firstBot];
            }
        } else if (botMode.mode === 'x2') {
            // Use first 2 bots
            bots = this.getConnectedBots().slice(0, 2);
        } else if (botMode.mode === 'x3') {
            // Use first 3 bots
            bots = this.getConnectedBots().slice(0, 3);
        } else {
            // x4 mode - use all bots
            bots = this.getConnectedBots();
        }
        
        // Update bot mode active bots
        botMode.activeBots = bots.map(b => b.botId);
        saveBotMode(botMode);
        
        // Limit concurrent broadcasts to prevent memory overflow
        const maxConcurrent = 5;
        const chunks = [];
        for (let i = 0; i < bots.length; i += maxConcurrent) {
            chunks.push(bots.slice(i, i + maxConcurrent));
        }
        
        for (const chunk of chunks) {
            const promises = chunk.map(async (bot) => {
                try {
                    const isOrigin = bot.botId === originBotId;
                    await bot.executeCommand(commandType, data, isOrigin && sendConfirmation);
                } catch (err) {
                    // Silent error
                }
            });
            
            await Promise.allSettled(promises);
            await delay(10); // Small delay between chunks
        }
    }

    getAllBots() {
        return Array.from(this.botSessions.values());
    }

    getConnectedBots() {
        return Array.from(this.botSessions.values()).filter(b => b.connected);
    }

    getLeaderBot() {
        const connected = this.getConnectedBots();
        return connected.length > 0 ? connected[0] : null;
    }
    
    // Get bot by display name (BOT1, BOT2, etc.)
    getBotByDisplayName(displayName) {
        return this.getAllBots().find(bot => bot.botName === displayName);
    }
}

class BotSession {
    constructor(botId, phoneNumber, botManager, requestingJid = null, botName = null) {
        this.systemBrand = SYSTEM_BRAND;
        this.systemOwner = SYSTEM_OWNER;
        this.version = VERSION;
        
        this.botId = botId;
        this.phoneNumber = phoneNumber;
        this.botManager = botManager;
        this.requestingJid = requestingJid;
        this.sock = null;
        this.connected = false;
        this.botNumber = null;
        this.authPath = `./auth/${botId}`;
        this.pairingCodeRequested = false;
        this.botName = botName || `BOT${botManager.commandBus.getConnectedBots().length + 1}`;
        
        // ENHANCED PAIRING SYSTEM
        this.pairingData = null;
        this.pairingTimeout = null;
        
        // PARALLEL ATTACK TRACKING - Each attack type has its own tracking
        this.activeNameChanges = new Map();  // Now tracks multiple NC attacks
        this.activeSlides = new Map();       // Now tracks multiple Slide attacks
        this.activeTxtSenders = new Map();   // Now tracks multiple Text attacks
        this.activeVNSenders = new Map();    // Now tracks multiple Voice attacks
        this.activePicSenders = new Map();   // Now tracks multiple Image attacks
        this.beatingGroups = {};
        this.beatIntervals = {};
        this.beatingTargets = {};
        this.stopCommands = new Map();
        this.threadCounter = 0;
        this.maxThreads = 200; // INCREASED for better parallel spam
        
        // ENHANCED THREAD MANAGEMENT
        this.activeThreads = new Map();
        this.threadCleanupInterval = null;
        
        // Session stability tracking
        this.lastActivity = Date.now();
        this.disconnectCount = 0;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        
        // Enhanced stop tracking
        this.stopFlags = new Map(); // attackId -> shouldStop
        
        // Start thread cleaner
        this.startThreadCleaner();
        
        // Start session monitor
        this.startSessionMonitor();
    }
    
    // NEW: Session monitor for stability
    startSessionMonitor() {
        setInterval(() => {
            const now = Date.now();
            const timeSinceActivity = now - this.lastActivity;
            
            // If no activity for 2 minutes and connected, send ping
            if (this.connected && timeSinceActivity > 120000) {
                consolex.bot(`${SYMBOLS.WARNING} Session inactive for ${Math.round(timeSinceActivity/1000)}s, sending ping...`, this.botId);
                this.sendPing();
            }
            
            // Update session stability
            SESSION_STABILITY.set(this.botId, {
                lastActivity: this.lastActivity,
                disconnectCount: this.disconnectCount
            });
        }, 30000); // Check every 30 seconds
    }
    
    async sendPing() {
        if (!this.sock || !this.connected) return;
        
        try {
            await this.sock.sendPresenceUpdate('available');
            this.lastActivity = Date.now();
            consolex.success(`${SYMBOLS.SUCCESS} Session ping successful`);
        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR} Session ping failed: ${err.message}`);
        }
    }
    
    startThreadCleaner() {
        if (this.threadCleanupInterval) clearInterval(this.threadCleanupInterval);
        
        this.threadCleanupInterval = setInterval(() => {
            const now = Date.now();
            this.activeThreads.forEach((thread, threadId) => {
                // Clean up threads older than 5 minutes
                if (now - thread.startTime > 300000) {
                    this.gracefulStopThread(threadId);
                }
            });
            
            // Limit total threads to prevent memory overflow
            if (this.activeThreads.size > 200) { // Increased limit
                const oldestThreads = Array.from(this.activeThreads.entries())
                    .sort((a, b) => a[1].startTime - b[1].startTime)
                    .slice(0, 50); // Increased cleanup batch
            
                oldestThreads.forEach(([threadId]) => {
                    this.gracefulStopThread(threadId);
                });
            }
        }, 30000); // Check every 30 seconds
    }
    
    // GRACEFUL thread stopping
    gracefulStopThread(threadId) {
        if (this.stopCommands.has(threadId)) {
            const stopFn = this.stopCommands.get(threadId);
            if (typeof stopFn === 'function') {
                try {
                    // Mark for stop but don't execute immediately
                    setTimeout(() => {
                        try {
                            stopFn();
                        } catch (e) {
                            // Silent error
                        }
                    }, 1000); // Delay execution
                } catch (e) {}
            }
            // Mark for deletion but keep for a while
            setTimeout(() => {
                this.stopCommands.delete(threadId);
            }, 2000);
        }
        
        if (this.activeThreads.has(threadId)) {
            const thread = this.activeThreads.get(threadId);
            thread.active = false;
            // Delay actual deletion
            setTimeout(() => {
                this.activeThreads.delete(threadId);
            }, 3000);
        }
    }
    
    // Force stop thread (emergency only)
    forceStopThread(threadId) {
        if (this.stopCommands.has(threadId)) {
            const stopFn = this.stopCommands.get(threadId);
            if (typeof stopFn === 'function') {
                try {
                    stopFn();
                } catch (e) {}
            }
            this.stopCommands.delete(threadId);
        }
        
        if (this.activeThreads.has(threadId)) {
            this.activeThreads.delete(threadId);
        }
    }
    
    // Enhanced stop checking for attack
    shouldAttackStop(attackId) {
        if (this.stopFlags.has(attackId)) {
            return this.stopFlags.get(attackId);
        }
        
        // Check parallel system
        if (parallelSystem.shouldAttackStop(attackId)) {
            return true;
        }
        
        return false;
    }
    
    // Mark attack for stop
    markAttackStop(attackId) {
        this.stopFlags.set(attackId, true);
    }
    
    async checkResponsiveness() {
        try {
            if (!this.sock || !this.connected) return false;
            
            const startTime = Date.now();
            await this.sock.sendPresenceUpdate('available');
            const responseTime = Date.now() - startTime;
            
            return responseTime < 5000; // 5 second timeout
        } catch (err) {
            return false;
        }
    }
    
    async emergencyRecovery() {
        consolex.bot(`${SYMBOLS.WARNING} Performing emergency recovery...`, this.botId);
        
        // GRACEFUL stop all threads
        this.stopCommands.forEach((stopFn, key) => {
            try { 
                setTimeout(() => {
                    try {
                        stopFn();
                    } catch (e) {}
                }, 1000);
            } catch (e) {}
        });
        
        // Clear all active attacks gradually
        setTimeout(() => {
            this.activeNameChanges.clear();
            this.activeSlides.clear();
            this.activeTxtSenders.clear();
            this.activeVNSenders.clear();
            this.activePicSenders.clear();
            this.activeThreads.clear();
            this.stopFlags.clear();
            
            // Clear beat attacks
            Object.keys(this.beatingGroups).forEach(key => {
                this.beatingGroups[key] = false;
            });
            
            Object.keys(this.beatIntervals).forEach(key => {
                if (this.beatIntervals[key]) {
                    clearInterval(this.beatIntervals[key]);
                }
            });
            
            this.beatIntervals = {};
            this.beatingTargets = {};
            
            consolex.success(`${SYMBOLS.SUCCESS} Emergency recovery complete`);
        }, 2000); // Delay cleanup to prevent session disruption
    }

    async connect() {
        try {
            if (!fs.existsSync(this.authPath)) {
                fs.mkdirSync(this.authPath, { recursive: true });
            }

            const { state, saveCreds } = await useMultiFileAuthState(this.authPath);
            const { version } = await fetchLatestBaileysVersion();
            
            const needsPairing = !state.creds.registered;

            // OPTIMIZED SOCKET SETTINGS FOR MEMORY AND STABILITY
            this.sock = makeWASocket({
                auth: state,
                logger: pino({ level: 'silent' }),
                browser: Browsers.ubuntu('Chrome'),
                version,
                printQRInTerminal: false,
                connectTimeoutMs: 60000, // Increased timeout
                defaultQueryTimeoutMs: 0,
                keepAliveIntervalMs: 15000, // Increased keep-alive
                emitOwnEvents: true,
                fireInitQueries: false,
                generateHighQualityLinkPreview: false,
                syncFullHistory: false,
                markOnlineOnConnect: true,
                retryRequestDelayMs: 200, // Increased retry delay
                maxMsgRetryCount: 3, // Reduced retries
                msgRetryCounterCache: new Map(),
                downloadHistory: false,
                syncFullHistory: false,
                transactionOpts: { maxCommitRetries: 2 },
                getMessage: async () => ({})
            });

            this.sock.ev.on('connection.update', async (update) => {
                const { connection, lastDisconnect } = update;
                
                // Update session activity
                this.lastActivity = Date.now();
                updateSessionActivity(this.botId);

                if (needsPairing && this.phoneNumber && !this.pairingCodeRequested && !state.creds.registered) {
                    this.pairingCodeRequested = true;
                    await delay(1000);
                    try {
                        const code = await this.sock.requestPairingCode(this.phoneNumber);
                        
                        // Send pairing code via WhatsApp to requesting user or admin
                        await this.sendPairingCodeViaWhatsApp(code);
                        
                    } catch (err) {
                        this.pairingCodeRequested = false;
                        consolex.error(`${SYMBOLS.ERROR} Pairing code request failed: ${err.message}`);
                    }
                }

                if (connection === 'close') {
                    const statusCode = (lastDisconnect?.error instanceof Boom)
                        ? lastDisconnect.error.output.statusCode
                        : 500;

                    const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
                    
                    consolex.connection(`${SYMBOLS.DISCONNECTED} Connection terminated. Status: ${statusCode}`, 'disconnected');
                    this.connected = false;
                    this.disconnectCount++;
                    
                    // Update session stability
                    const stability = SESSION_STABILITY.get(this.botId) || { disconnectCount: 0 };
                    stability.disconnectCount++;
                    SESSION_STABILITY.set(this.botId, stability);

                    if (shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
                        this.reconnectAttempts++;
                        const delayTime = Math.min(5000 * this.reconnectAttempts, 30000); // Exponential backoff
                        consolex.connection(`${SYMBOLS.CONNECTING} Re-establishing connection in ${delayTime/1000} seconds (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})...`, 'connecting');
                        await delay(delayTime);
                        this.connect();
                    } else if (!shouldReconnect) {
                        consolex.connection(`${SYMBOLS.DISCONNECTED} Session terminated.`, 'disconnected');
                        this.botManager.removeBot(this.botId);
                    } else {
                        consolex.connection(`${SYMBOLS.DISCONNECTED} Max reconnection attempts reached.`, 'disconnected');
                        this.botManager.removeBot(this.botId);
                    }
                } else if (connection === 'open') {
                    console.log('\n');
                    consolex.header(`${SYMBOLS.SUCCESS} BOT CONNECTION ESTABLISHED ${SYMBOLS.SUCCESS}`, `${SYMBOLS.BOT} ${this.botName}`, 70);
                    
                    const content = [
                        `${SYMBOLS.BOT} BOT NAME: ${this.botName}`,
                        `${SYMBOLS.PHONE} NUMBER: ${this.sock.user?.id?.split(':')[0] || 'Loading...'}`,
                        `${SYMBOLS.ONLINE} STATUS: ONLINE`,
                        `${SYMBOLS.SERVER} SYSTEM: ${this.systemBrand}`,
                        `${SYMBOLS.CHART} STABILITY: ${this.disconnectCount} disconnects`,
                        `${SYMBOLS.INFO} MODE: ${botMode.mode}`
                    ];
                    
                    consolex.border.box(`${SYMBOLS.SHIELD} CONNECTION DETAILS`, content, 68);
                    console.log('\n');
                    
                    this.connected = true;
                    this.botNumber = (this.sock.user?.id?.split(':')[0] || '') + '@s.whatsapp.net';
                    this.reconnectAttempts = 0; // Reset on successful connection
                    
                    // Send initial presence update
                    setTimeout(() => {
                        if (this.sock && this.connected) {
                            this.sock.sendPresenceUpdate('available');
                        }
                    }, 2000);
                    
                    // Auto-fetch groups on successful connection (optional)
                    setTimeout(async () => {
                        if (this.sock && this.connected) {
                            try {
                                // Auto-fetch groups quietly in background
                                const result = await groupFetcher.fetchGroupsForBot(this);
                                if (result.success) {
                                    consolex.group(`${SYMBOLS.FOLDER} Auto-fetched ${result.count} groups on connect`);
                                }
                            } catch (err) {
                                // Silent error for auto-fetch
                            }
                        }
                    }, 5000);
                } else if (connection === 'connecting') {
                    consolex.connection(`${SYMBOLS.CONNECTING} Connecting...`, 'connecting');
                }
            });

            this.sock.ev.on('creds.update', saveCreds);
            this.sock.ev.on('messages.upsert', async (m) => this.handleMessage(m));

        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR} Connection error: ${err.message}`);
            await delay(5000);
            this.connect();
        }
    }
    
    // NEW: Send pairing code via WhatsApp
    async sendPairingCodeViaWhatsApp(code) {
        try {
            // Try to send to the requesting user first
            if (this.requestingJid) {
                // Get any connected bot to send the pairing code
                const leaderBot = this.botManager.commandBus.getLeaderBot();
                if (leaderBot && leaderBot.connected) {
                    await leaderBot.sendMessage(this.requestingJid, 
                        `🔐 *NEW BOT PAIRING REQUIRED*\n\n` +
                        `🤖 *Bot Name:* ${this.botName}\n` +
                        `📱 *Phone:* ${this.phoneNumber}\n` +
                        `📁 *Folder:* auth/${this.botId}\n\n` +
                        `══════════════════════════════════\n` +
                        `         🔢 PAIRING CODE 🔢\n` +
                        `              ${code}\n` +
                        `══════════════════════════════════\n\n` +
                        `⚠️ *Note:* Enter this code in your WhatsApp app to link the bot.`
                    );
                    consolex.success(`${SYMBOLS.SUCCESS} Pairing code sent via WhatsApp to ${this.requestingJid}`);
                    return;
                }
            }
            
            // Fallback: Send to first admin if available
            if (roles.admins.length > 0) {
                const adminJid = roles.admins[0];
                const leaderBot = this.botManager.commandBus.getLeaderBot();
                if (leaderBot && leaderBot.connected) {
                    await leaderBot.sendMessage(adminJid, 
                        `🔐 *NEW BOT PAIRING REQUIRED*\n\n` +
                        `🤖 *Bot Name:* ${this.botName}\n` +
                        `📱 *Phone:* ${this.phoneNumber}\n` +
                        `📁 *Folder:* auth/${this.botId}\n\n` +
                        `══════════════════════════════════\n` +
                        `         🔢 PAIRING CODE 🔢\n` +
                        `              ${code}\n` +
                        `══════════════════════════════════\n\n` +
                        `⚠️ *Note:* Enter this code in your WhatsApp app to link the bot.`
                    );
                    consolex.success(`${SYMBOLS.SUCCESS} Pairing code sent via WhatsApp to admin`);
                    return;
                }
            }
            
            // Final fallback: Print in terminal
            console.log('\n');
            consolex.header(`${SYMBOLS.PHONE} BOT PAIRING REQUIRED ${SYMBOLS.PHONE}`, `${SYMBOLS.BOT} ${this.botName}`, 70);
            
            const content = [
                `${SYMBOLS.BOT} BOT NAME: ${this.botName}`,
                `${SYMBOLS.PHONE} PHONE: ${this.phoneNumber}`,
                `${SYMBOLS.FOLDER} FOLDER: ${this.authPath}`,
                '',
                `${SYMBOLS.KEY} PAIRING CODE:`,
                `    ${code}`
            ];
            
            consolex.border.box(`${SYMBOLS.SHIELD} PAIRING INFORMATION`, content, 68);
            console.log('\n');
            
        } catch (error) {
            consolex.error(`${SYMBOLS.ERROR} Failed to send pairing code via WhatsApp: ${error.message}`);
            // Fallback to terminal
            console.log(`\n${SYMBOLS.KEY.cyan} ${'Pairing Code'.cyan.bold} for ${this.botName.magenta}: ${code.green.bold}`);
            console.log(`${SYMBOLS.PHONE.blue} ${'Phone:'.blue} ${this.phoneNumber.green}`);
        }
    }

    async handleMessage({ messages, type }) {
        try {
            if (type !== 'notify') return;
            
            const msg = messages[0];
            if (!msg.message) return;
            if (msg.key.fromMe) return;
            
            const messageType = Object.keys(msg.message)[0];
            if (messageType === 'protocolMessage' || messageType === 'senderKeyDistributionMessage') return;

            const from = msg.key.remoteJid;
            const isGroup = from.endsWith('@g.us');
            const sender = isGroup ? msg.key.participant : from;
            
            const msgId = msg.key.id;
            
            if (!this.botManager.commandBus.shouldProcessMessage(msgId)) {
                return;
            }
            
            // Update session activity
            this.lastActivity = Date.now();
            updateSessionActivity(this.botId);
            
            // FIXED: Beat attack - Only reply when target sends ACTUAL messages (not reactions)
            const gid = from;
            if (isGroup && this.beatingTargets[gid] && sender === this.beatingTargets[gid]) {
                if (this.beatingGroups[gid]) {
                    // Check if it's NOT a reaction or system message
                    const isReaction = msg.message?.reactionMessage;
                    const isProtocolMessage = msg.message?.protocolMessage;
                    const isSenderKeyMessage = msg.message?.senderKeyDistributionMessage;
                    
                    // Only respond to actual text/image/video messages, NOT reactions or system messages
                    if (!isReaction && !isProtocolMessage && !isSenderKeyMessage) {
                        const hasText = msg.message?.conversation || 
                                       msg.message?.extendedTextMessage?.text ||
                                       msg.message?.imageMessage?.caption ||
                                       msg.message?.videoMessage?.caption;
                        
                        // Only respond if message has actual content (not empty)
                        if (hasText && hasText.trim().length > 0) {
                            const roastLines = [
                                "𝐊𝐄𝐄𝐃𝐄 𝐊𝐎 𝐏𝐄𝐋𝐓𝐄 𝐇𝐔𝐄 𝐏𝐀𝐏𝐀 𝐊𝐈 𝐄𝐍𝐓𝐑𝐘😎❤️‍🔥","𝐊𝐄𝐄𝐃𝐄 𝐂𝐇𝐀𝐋 𝐀𝐁 𝐏𝐀𝐏𝐀 𝐁𝐎𝐋 𝐆𝐔𝐋𝐀𝐌🤣🩷🤚🏼","𝐊𝐄𝐄𝐃𝐄 𝐑𝐄𝐏𝐋𝐈 𝐊𝐀𝐑 𝐆𝐀𝐑𝐈𝐁 𝐃𝐀𝐑 𝐊𝐘𝐔 𝐑𝐀𝐇𝐀 𝐇?😂🤙🏼🤍","𝐊𝐄𝐄𝐃𝐄 𝐂𝐇𝐀𝐋 𝐓𝐄𝐑𝐈 𝐌𝐀 𝐗𝐇𝐎𝐃𝐔 𝐏𝐀𝐓𝐀𝐊 𝐏𝐀𝐓𝐀𝐊 𝐊𝐄🤣👻🩶","𝐊𝐄𝐄𝐃𝐄̷𝐂𝐇𝐀𝐓 𝐌𝐀𝐙𝐃𝐔𝐑𝐈 𝐊𝐀𝐈𝐒𝐄 𝐑𝐔𝐊𝐈 𝐓𝐄𝐑𝐈 𝐁𝐀𝐔𝐍𝐄?🤣🩵🙌🏼","𝐂𝐏 𝐊𝐀𝐑 𝐆𝐀𝐑𝐈𝐁 𝐁𝐇𝐀𝐀𝐆 𝐌𝐀𝐓 𝐂𝐇𝐎𝐓𝐄𝐘😂🩶🤚🏼","𝐊𝐄𝐄𝐃𝐄 𝐘𝐑 𝐊𝐄 𝐍𝐀𝐀𝐌 𝐒𝐄 𝐅𝐀𝐌𝐄 𝐋𝐄𝐍𝐀 𝐁𝐀𝐍𝐃 𝐊𝐑 𝐆𝐀𝐑𝐈𝐁🩷✌🏼","𝐊𝐄𝐄𝐃𝐄 𝐘𝐑 𝐀𝐏𝐍𝐄 𝐁𝐀𝐀𝐏 𝐊 𝐍𝐀𝐌𝐊𝐈 𝐏𝐔𝐉𝐀 𝐊𝐑 𝐅𝐀𝐌𝐄 𝐌𝐈𝐋𝐉𝐀𝐘𝐄𝐆𝐀🤣🩶🤚🏼","𝐊𝐀𝐁𝐀𝐃𝐈 𝐖𝐀𝐋𝐄 𝐊𝐄𝐄𝐃𝐄 𝐊𝐈 𝐌𝐊𝐁😂👻🩷","𝐀𝐑𝐄𝐘 𝐊𝐄𝐄𝐃𝐄 𝐊𝐈 𝐌𝐊𝐁 𝐘𝐀𝐀𝐑 𝐁𝐇𝐀𝐆 𝐊𝐀𝐈𝐒𝐄 𝐑𝐇𝐄 𝐇𝐎 𝐆𝐀𝐑𝐈𝐁😤👻🩷","𝐊𝐄𝐄𝐃𝐄𝐊𝐎 𝐏𝐄𝐋𝐓𝐄 𝐇𝐔𝐄 𝐏𝐀𝐏𝐀 𝐊𝐈 𝐄𝐗𝐈𝐓😎❤️‍🔥","𝐊𝐄𝐄𝐃𝐄 𝐊𝐎 𝐏𝐄𝐋𝐓𝐄 𝐇𝐔𝐄 𝐏𝐀𝐏𝐀 𝐊𝐈 𝐄𝐍𝐓𝐑𝐘😎❤️‍🔥","𝐊𝐄𝐄𝐃𝐄 𝐂𝐇𝐀𝐋 𝐀𝐁 𝐏𝐀𝐏𝐀 𝐁𝐎𝐋 𝐆𝐔𝐋𝐀𝐌🤣🩷🤚🏼","𝐊𝐄𝐄𝐃𝐄 𝐑𝐄𝐏𝐋𝐈 𝐊𝐀𝐑 𝐆𝐀𝐑𝐈𝐁 𝐃𝐀𝐑 𝐊𝐘𝐔 𝐑𝐀𝐇𝐀 𝐇?😂🤙🏼🤍","𝐊𝐄𝐄𝐃𝐄 𝐂𝐇𝐀𝐋 𝐓𝐄𝐑𝐈 𝐌𝐀 𝐗𝐇𝐎𝐃𝐔 𝐏𝐀𝐓𝐀𝐊 𝐏𝐀𝐓𝐀𝐊 𝐊𝐄🤣👻🩶","𝐊𝐄𝐄𝐃𝐄 𝐂𝐇𝐀𝐓 𝐌𝐀𝐙𝐃𝐔𝐑𝐈 𝐊𝐀𝐈𝐒𝐄 𝐑𝐔𝐊𝐈 𝐓𝐄𝐑𝐈 𝐁𝐀𝐔𝐍𝐄?🤣🩵🙌🏼","𝐂𝐏 𝐊𝐀𝐑 𝐆𝐀𝐑𝐈𝐁 𝐁𝐇𝐀𝐀𝐆 𝐌𝐀𝐓 𝐂𝐇𝐎𝐓𝐄𝐘😂🩶🤚🏼","𝐊𝐄𝐄𝐃𝐄 𝐘𝐑 𝐊𝐄 𝐍𝐀𝐀𝐌 𝐒𝐄 𝐅𝐀𝐌𝐄 𝐋𝐄𝐍𝐀 𝐁𝐀𝐍𝐃 𝐊𝐑 𝐆𝐀𝐑𝐈𝐁🩷✌","𝐊𝐄𝐄𝐃𝐄 𝐊𝐎 𝐏𝐄𝐋𝐓𝐄 𝐇𝐔𝐄 𝐏𝐀𝐏𝐀 𝐊𝐈 𝐄𝐗𝐈𝐓😎❤️‍🔥"
                            ];
                            const reply = roastLines[Math.floor(Math.random() * roastLines.length)];
                            try {
                                await this.sock.sendMessage(from, { text: `[${this.botName}] ${reply}`, mentions: [sender] }, { quoted: msg });
                            } catch (e) {}
                        }
                    }
                }
            }
            
            // Track slide messages for multiple slide attacks
            this.activeSlides.forEach((task, taskId) => {
                if (task.active && task.groupJid === from && task.targetJid === sender) {
                    task.latestMsg = msg;
                    task.hasNewMsg = true;
                }
            });
            
            let text = '';
            if (msg.message.conversation) {
                text = msg.message.conversation;
            } else if (msg.message.extendedTextMessage?.text) {
                text = msg.message.extendedTextMessage.text;
            } else if (msg.message.imageMessage?.caption) {
                text = msg.message.imageMessage.caption;
            } else if (msg.message.videoMessage?.caption) {
                text = msg.message.videoMessage.caption;
            }

            const originalText = text;
            text = text.trim().toLowerCase();
            
            const isDM = !isGroup;
            const senderIsAdmin = isAdmin(sender);
            const senderIsSubAdmin = isGroup ? isSubAdmin(sender, from) : false;
            const senderHasPermission = senderIsAdmin || senderIsSubAdmin;

            // AUTO-REACT COMMANDS
            if (originalText.startsWith('/setreact ')) {
                if (!senderHasPermission) return;
                const emoji = originalText.replace('/setreact ', '').trim();
                if (!emoji) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 *Usage:* /setreact [emoji]\nExample: /setreact ❤️`);
                    } catch (e) {}
                    return;
                }
                saveReactEmoji(this.botId, emoji);
                try {
                    await this.sendMessage(from, `[${this.botName}] ✅ Auto-react set to: ${emoji}`);
                } catch (e) {}
                return;
            }

            if (originalText === '/stopreact') {
                if (!senderHasPermission) return;
                saveReactEmoji(this.botId, '');
                try {
                    await this.sendMessage(from, `[${this.botName}] ✅ Auto-react disabled.`);
                } catch (e) {}
                return;
            }

            if (originalText === '/reactstatus') {
                if (!senderHasPermission) return;
                const currentEmoji = loadReactEmoji(this.botId);
                const status = currentEmoji ? `Active with emoji: ${currentEmoji}` : 'Inactive';
                try {
                    await this.sendMessage(from, `[${this.botName}] 📊 Auto-react status: ${status}`);
                } catch (e) {}
                return;
            }

            // AUTO-REACT LOGIC
            const reactEmoji = loadReactEmoji(this.botId);
            if (reactEmoji && !msg.key.fromMe) {
                try {
                    await this.sock.sendMessage(from, {
                        react: {
                            text: reactEmoji,
                            key: msg.key
                        }
                    });
                } catch (error) {
                    // Ignore
                }
            }

            // NEW: x1-x4 COMMANDS
            if (originalText === '/x1' && senderHasPermission) {
                botMode.mode = 'x1';
                botMode.activeBots = [this.botId];
                saveBotMode(botMode);
                
                const connectedBots = this.botManager.commandBus.getConnectedBots();
                const activeBot = connectedBots[0];
                
                try {
                    await this.sendMessage(from, 
                        `[${this.botName}] 🤖 *SOLO MODE ACTIVATED*\n\n` +
                        `⚡ *Mode:* x1 (Solo)\n` +
                        `🤖 *Active Bot:* ${activeBot ? activeBot.botName : 'None'}\n` +
                        `📊 *Total Connected:* ${connectedBots.length}\n` +
                        `✅ *Status:* Only ${activeBot ? activeBot.botName : 'first bot'} will respond to commands`
                    );
                } catch (e) {}
                return;
            }

            if (originalText === '/x2' && senderHasPermission) {
                botMode.mode = 'x2';
                const connectedBots = this.botManager.commandBus.getConnectedBots();
                botMode.activeBots = connectedBots.slice(0, 2).map(b => b.botId);
                saveBotMode(botMode);
                
                const activeBots = connectedBots.slice(0, 2).map(b => b.botName);
                
                try {
                    await this.sendMessage(from, 
                        `[${this.botName}] 🤖 *DUAL MODE ACTIVATED*\n\n` +
                        `⚡ *Mode:* x2 (Dual)\n` +
                        `🤖 *Active Bots:* ${activeBots.join(', ')}\n` +
                        `📊 *Total Connected:* ${connectedBots.length}\n` +
                        `✅ *Status:* ${activeBots.length} bots will respond to commands`
                    );
                } catch (e) {}
                return;
            }

            if (originalText === '/x3' && senderHasPermission) {
                botMode.mode = 'x3';
                const connectedBots = this.botManager.commandBus.getConnectedBots();
                botMode.activeBots = connectedBots.slice(0, 3).map(b => b.botId);
                saveBotMode(botMode);
                
                const activeBots = connectedBots.slice(0, 3).map(b => b.botName);
                
                try {
                    await this.sendMessage(from, 
                        `[${this.botName}] 🤖 *TRI MODE ACTIVATED*\n\n` +
                        `⚡ *Mode:* x3 (Tri)\n` +
                        `🤖 *Active Bots:* ${activeBots.join(', ')}\n` +
                        `📊 *Total Connected:* ${connectedBots.length}\n` +
                        `✅ *Status:* ${activeBots.length} bots will respond to commands`
                    );
                } catch (e) {}
                return;
            }

            if (originalText === '/x4' && senderHasPermission) {
                botMode.mode = 'x4';
                const connectedBots = this.botManager.commandBus.getConnectedBots();
                botMode.activeBots = connectedBots.map(b => b.botId);
                saveBotMode(botMode);
                
                const activeBots = connectedBots.map(b => b.botName);
                
                try {
                    await this.sendMessage(from, 
                        `[${this.botName}] 🤖 *QUAD MODE ACTIVATED*\n\n` +
                        `⚡ *Mode:* x4 (Quad)\n` +
                        `🤖 *Active Bots:* ${activeBots.join(', ')}\n` +
                        `📊 *Total Connected:* ${connectedBots.length}\n` +
                        `✅ *Status:* All ${activeBots.length} bots will respond to commands`
                    );
                } catch (e) {}
                return;
            }

            // NEW: ENHANCED STOP COMMANDS WITH PRIORITY
            if (originalText === '/allstop' && senderHasPermission) {
                consolex.attack(`${SYMBOLS.STOP} Executing global stop command`);
                // Use high priority stop
                stopSystem.sendGlobalStopSignal('all', from, 'high', true);
                try {
                    await this.sendMessage(from, 
                        `[${this.botName}] 🛑 *EMERGENCY STOP EXECUTED*\n\n` +
                        `⚡ *Priority:* HIGH\n` +
                        `🤖 *Bot:* ${this.botName}\n` +
                        `📊 *Status:* Force stopping all attacks\n` +
                        `✅ *Action:* All parallel attacks being terminated`
                    );
                } catch (e) {}
                return;
            }

            if (originalText === '/ncstop' && senderHasPermission) {
                if (!isGroup) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ This command is only available in group conversations.`);
                    } catch (e) {}
                    return;
                }
                stopSystem.sendGlobalStopSignal('stop_nc', from, 'normal', false);
                try {
                    await this.sendMessage(from, `[${this.botName}] 🛑 *NC ATTACKS TERMINATED*\n\n` +
                                                `🤖 *Bot:* ${this.botName}\n` +
                                                `⚡ *Status:* All NC attacks stopping\n` +
                                                `📊 *Threads being killed:* ${getActiveThreadCount('nc', from)}`);
                } catch (e) {}
                return;
            }

            // NEW: ATTACK STATUS COMMAND
            if (text === '/attackstatus' && senderHasPermission) {
                const attacks = parallelSystem.listAttacks(from);
                
                let statusMsg = `[${this.botName}] ⚡ *PARALLEL ATTACK STATUS*\n\n`;
                
                if (attacks.length === 0) {
                    statusMsg += `📭 No active attacks in this group\n`;
                } else {
                    statusMsg += `📊 *Active Attacks: ${attacks.length}*\n\n`;
                    
                    attacks.forEach((attack, index) => {
                        statusMsg += `${index + 1}. *${attack.type.toUpperCase()}*\n`;
                        statusMsg += `   🆔 ID: ${attack.id.substring(0, 8)}...\n`;
                        statusMsg += `   🧵 Threads: ${attack.threads}\n`;
                        statusMsg += `   ⏱️ Age: ${attack.age}s\n`;
                        if (attack.stopRequested) statusMsg += `   🛑 STOP REQUESTED\n`;
                        statusMsg += `\n`;
                    });
                }
                
                // Add global stats
                statusMsg += `🌍 *Global Stats:*\n`;
                statusMsg += `• NC Attacks: ${parallelSystem.getActiveCount(from, 'nc')}\n`;
                statusMsg += `• Slide Attacks: ${parallelSystem.getActiveCount(from, 'slide')}\n`;
                statusMsg += `• Text Attacks: ${parallelSystem.getActiveCount(from, 'txt')}\n`;
                statusMsg += `• Voice Attacks: ${parallelSystem.getActiveCount(from, 'vn')}\n`;
                statusMsg += `• Image Attacks: ${parallelSystem.getActiveCount(from, 'pic')}\n`;
                statusMsg += `• Beat Attacks: ${parallelSystem.getActiveCount(from, 'beat')}\n`;
                
                // Add stop system info
                const activeStopSignals = Array.from(stopSystem.stopSignals.values())
                    .filter(s => s.groupJid === from || !s.groupJid)
                    .length;
                statusMsg += `\n🛑 *Stop System:* ${activeStopSignals} active stop signals`;
                
                try {
                    await this.sendMessage(from, statusMsg);
                } catch (e) {}
                return;
            }

            // FORCE RECOVERY COMMAND
            if (text === '/recover' && senderIsAdmin) {
                await this.emergencyRecovery();
                await this.sendMessage(from, 
                    `[${this.botName}] 🔄 *EMERGENCY RECOVERY EXECUTED*\n\n` +
                    `🤖 *Bot:* ${this.botName}\n` +
                    `🧹 *Cleaned:* All threads and attacks\n` +
                    `✅ *Status:* Bot should now be responsive\n\n` +
                    `📊 *Stats:*\n` +
                    `• Threads: ${this.activeThreads.size}\n` +
                    `• Stop commands: ${this.stopCommands.size}\n` +
                    `• Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
                );
                return;
            }
            
            // STATUS WITH THREAD INFO
            if (text === '/threads' && senderHasPermission) {
                let threadInfo = `[${this.botName}] 📊 *THREAD STATUS*\n\n`;
                
                threadInfo += `🔄 *Active Threads:* ${this.activeThreads.size}\n`;
                threadInfo += `🛑 *Stop Commands:* ${this.stopCommands.size}\n\n`;
                
                if (this.activeThreads.size > 0) {
                    threadInfo += `📋 *Thread Details:*\n`;
                    this.activeThreads.forEach((thread, threadId) => {
                        const age = Math.round((Date.now() - thread.startTime) / 1000);
                        threadInfo += `• ${threadId} (${thread.type}) - ${age}s old\n`;
                    });
                }
                
                const isResponsive = await this.checkResponsiveness();
                threadInfo += `\n📶 *Response Time:* ${isResponsive ? '✅ Responsive' : '❌ Unresponsive'}`;
                
                await this.sendMessage(from, threadInfo);
                return;
            }

            // FIXED: /ping command - Now works on first try
            if (text === '/ping' && senderHasPermission) {
                try {
                    const startTime = Date.now();
                    
                    // Send a simple test message first
                    await this.sendMessage(from, `[${this.botName}] 📶 Pinging...`);
                    
                    const latency = Date.now() - startTime;
                    const status = latency < 500 ? '⚡ Excellent' : latency < 1000 ? '✅ Good' : latency < 2000 ? '⚠️ Acceptable' : '❌ Poor';
                    
                    // Get bot stats
                    const isResponsive = await this.checkResponsiveness();
                    const botCount = this.botManager.commandBus.getConnectedBots().length;
                    const memoryUsage = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
                    
                    await this.sendMessage(from, 
                        `[${this.botName}] 📊 *SYSTEM PERFORMANCE REPORT*\n\n` +
                        `⚡ *System:* ${this.systemBrand}\n` +
                        `⏱️ *Response Time:* ${latency}ms\n` +
                        `📶 *Status:* ${status}\n` +
                        `🤖 *Bot:* ${this.botName}\n` +
                        `🔗 *Connection:* ${isResponsive ? '✅ Stable' : '⚠️ Unstable'}\n` +
                        `👥 *Active Bots:* ${botCount}\n` +
                        `🧠 *Memory Usage:* ${memoryUsage}MB\n\n` +
                        `_This message proves bot is responsive._`
                    );
                } catch (e) {
                    // If first message fails, try alternative
                    try {
                        await this.sendMessage(from, `[${this.botName}] ⚠️ Ping failed. Bot might be processing other commands.`);
                    } catch (e2) {}
                }
                return;
            }

            // GROUP FETCHER COMMANDS
            if (originalText === '/fetchgc' && senderHasPermission) {
                try {
                    await this.sendMessage(from, `[${this.botName}] 🔄 Fetching groups for ${this.botName}...\nThis may take a moment.`);
                    
                    const result = await groupFetcher.fetchGroupsForBot(this);
                    
                    if (result.success) {
                        const groups = result.groups;
                        
                        if (groups.length === 0) {
                            await this.sendMessage(from, `[${this.botName}] 📭 *NO GROUPS FOUND*\n\nThis bot is not in any groups.`);
                            return;
                        }
                        
                        // Send in chunks if too many groups
                        const chunkSize = 10;
                        for (let i = 0; i < groups.length; i += chunkSize) {
                            const chunk = groups.slice(i, i + chunkSize);
                            const formatted = groupFetcher.formatGroupList(chunk, i);
                            
                            const header = i === 0 ? 
                                `[${this.botName}] ✅ *GROUPS FETCHED SUCCESSFULLY*\n\n` +
                                `🤖 Bot: ${this.botName}\n` +
                                `📊 Total Groups: ${groups.length}\n` +
                                `⏰ Fetched: ${new Date().toLocaleTimeString()}\n\n` : '';
                            
                            await this.sendMessage(from, header + formatted);
                            
                            // Delay between chunks to avoid rate limiting
                            if (i + chunkSize < groups.length) {
                                await delay(1000);
                            }
                        }
                        
                        // Add instructions for leaving groups
                        await this.sendMessage(from,
                            `[${this.botName}] 📋 *GROUP MANAGEMENT*\n\n` +
                            `To leave a group, use:\n` +
                            `/gcl [number]\n\n` +
                            `Example: /gcl 1 (to leave the first group)\n` +
                            `Example: /gcl 5 (to leave the fifth group)\n\n` +
                            `⚠️ *Warning:* This will:\n` +
                            `• Remove bot from the group\n` +
                            `• Clear chat history\n` +
                            `• Remove group from fetched list\n\n` +
                            `Use /cleargc to clear all fetched groups data.`
                        );
                        
                    } else {
                        await this.sendMessage(from, 
                            `[${this.botName}] ❌ *FAILED TO FETCH GROUPS*\n\n` +
                            `Error: ${result.error}\n\n` +
                            `Possible solutions:\n` +
                            `1. Ensure bot is connected\n` +
                            `2. Check internet connection\n` +
                            `3. Try again later\n` +
                            `4. Restart the bot if problem persists`
                        );
                    }
                } catch (error) {
                    consolex.error(`${SYMBOLS.ERROR} Fetch groups error: ${error.message}`);
                    await this.sendMessage(from, `[${this.botName}] ❌ Error fetching groups: ${error.message}`);
                }
                return;
            }

            if (originalText.toLowerCase().startsWith('/gcl ') && senderHasPermission) {
                const args = originalText.slice(5).trim();
                const index = parseInt(args) - 1; // Convert to 0-based index
                
                if (isNaN(index)) {
                    await this.sendMessage(from, 
                        `[${this.botName}] ❌ *INVALID INDEX*\n\n` +
                        `Usage: /gcl [number]\n` +
                        `Example: /gcl 1\n` +
                        `Example: /gcl 5\n\n` +
                        `Use /fetchgc first to see group numbers.`
                    );
                    return;
                }
                
                const groups = groupFetcher.getFetchedGroups(this.botId);
                
                if (groups.length === 0) {
                    await this.sendMessage(from, 
                        `[${this.botName}] 📭 *NO FETCHED GROUPS*\n\n` +
                        `Please use /fetchgc first to fetch groups.`
                    );
                    return;
                }
                
                if (index < 0 || index >= groups.length) {
                    await this.sendMessage(from, 
                        `[${this.botName}] ❌ *INDEX OUT OF RANGE*\n\n` +
                        `Valid range: 1 to ${groups.length}\n` +
                        `Current groups fetched: ${groups.length}`
                    );
                    return;
                }
                
                const group = groups[index];
                
                // Confirm before leaving
                await this.sendMessage(from,
                    `[${this.botName}] ⚠️ *CONFIRM GROUP LEAVE*\n\n` +
                    `📛 Group: ${group.name}\n` +
                    `👥 Members: ${group.size}\n` +
                    `🆔 ID: ${group.jid}\n` +
                    `📅 Created: ${group.creation}\n\n` +
                    `Are you sure you want to leave this group?\n\n` +
                    `✅ Type: /gclconfirm ${index + 1}\n` +
                    `❌ Or wait for this message to expire.`
                );
                return;
            }

            if (originalText.toLowerCase().startsWith('/gclconfirm ') && senderHasPermission) {
                const args = originalText.slice(12).trim();
                const index = parseInt(args) - 1;
                
                if (isNaN(index)) {
                    await this.sendMessage(from, `[${this.botName}] ❌ Invalid confirmation.`);
                    return;
                }
                
                try {
                    const result = await groupFetcher.leaveGroupByIndex(this, index, from);
                    
                    if (result.success) {
                        await this.sendMessage(from,
                            `[${this.botName}] ✅ *GROUP LEFT SUCCESSFULLY*\n\n` +
                            `📛 Group: ${result.groupName}\n` +
                            `🆔 ID: ${result.groupJid}\n` +
                            `🧹 Chat history cleared\n` +
                            `🗑️ Removed from fetched list\n\n` +
                            `📊 Remaining groups: ${result.remainingGroups}\n` +
                            `🔄 Use /fetchgc to update list.`
                        );
                    } else {
                        await this.sendMessage(from,
                            `[${this.botName}] ❌ *FAILED TO LEAVE GROUP*\n\n` +
                            `Error: ${result.error}\n\n` +
                            `Possible reasons:\n` +
                            `• Bot is not in the group\n` +
                            `• Group doesn't exist\n` +
                            `• Permission issue\n` +
                            `• Network problem`
                        );
                    }
                } catch (error) {
                    await this.sendMessage(from, `[${this.botName}] ❌ Error leaving group: ${error.message}`);
                }
                return;
            }

            if (originalText === '/cleargc' && senderHasPermission) {
                groupFetcher.clearFetchedGroups(this.botId);
                await this.sendMessage(from,
                    `[${this.botName}] 🧹 *FETCHED GROUPS CLEARED*\n\n` +
                    `🤖 Bot: ${this.botName}\n` +
                    `✅ All fetched group data has been cleared.\n\n` +
                    `Use /fetchgc to fetch groups again.`
                );
                return;
            }

// ==================== YOUTUBE COMMANDS ====================

// YouTube Search Command
if (originalText.toLowerCase().startsWith('/yts ')) {
    if (!senderHasPermission) return;
    const query = originalText.slice(5).trim();
    if (!query) {
        await this.sendMessage(from, `[${this.botName}] ❌ Usage: /yts <search query>\nExample: /yts @qrixce`);
        return;
    }
    
    try {
        const results = await sendYouTubeResults(this.sock, from, sender, query);
        await this.sendMessage(from, `[${this.botName}]\n${results}`);
    } catch (error) {
        await this.sendMessage(from, `[${this.botName}] ❌ YouTube search error: ${error.message}`);
    }
    return;
}

// Song Download Command - FIXED VERSION
if (originalText.toLowerCase().startsWith('/song ')) {
    if (!senderHasPermission) return;
    
    const downloadData = await handleYouTubeDownload(this.sock, from, sender, originalText.toLowerCase().slice(1), msg);
    if (typeof downloadData === 'string') {
        await this.sendMessage(from, `[${this.botName}]\n${downloadData}`, { quoted: msg });
        return;
    }
    
    const { selected, videoUrl, type, quality, durationSeconds } = downloadData;
    
    const infoText = `[${this.botName}] ⬇️ Downloading: *${selected.title}*\n🎧 Quality: 320Kbps\n⏱ ${durationSeconds ? durationSeconds + "s clip" : "Full audio"}`;
    try {
        const infoMsg = await this.sendMessage(from, infoText);
        
        try {
            const mp3Path = await downloadYTFromUrl(videoUrl);
            const oggPath = mp3Path.replace(".mp3", ".ogg");
            
            // Check audio file size
            const stats = fs.statSync(mp3Path);
            if (stats.size > MAX_AUDIO_SIZE) {
                await this.sendMessage(from, `[${this.botName}] ❌ Audio file too large (${(stats.size / (1024 * 1024)).toFixed(2)}MB).\nMax allowed: 100MB`);
                // Try to delete the info message safely
                try {
                    if (infoMsg && infoMsg.key) {
                        await this.sock.sendMessage(from, { delete: infoMsg.key });
                    }
                } catch (deleteErr) {
                    // Ignore delete error
                }
                fs.unlinkSync(mp3Path);
                return;
            }
            
            await convertToOgg(mp3Path, oggPath, durationSeconds);
            
            await this.sock.sendMessage(
                from,
                {
                    audio: fs.readFileSync(oggPath),
                    mimetype: "audio/ogg; codecs=opus",
                    ptt: true
                },
                { quoted: msg }
            );
            
            // Try to delete the info message safely
            try {
                if (infoMsg && infoMsg.key) {
                    await this.sock.sendMessage(from, { delete: infoMsg.key });
                }
            } catch (deleteErr) {
                // Ignore delete error
            }
            
            fs.unlinkSync(mp3Path);
            fs.unlinkSync(oggPath);
            
        } catch (err) {
            console.error("YouTube download error:", err);
            // Try to delete the info message safely
            try {
                if (infoMsg && infoMsg.key) {
                    await this.sock.sendMessage(from, { delete: infoMsg.key });
                }
            } catch (deleteErr) {
                // Ignore delete error
            }
            await this.sendMessage(from, `[${this.botName}] ❌ Download failed.\nVideo may be private, age-restricted, or too long.`);
        }
    } catch (infoMsgErr) {
        // If sending info message fails, continue with download anyway
        console.error("Failed to send info message:", infoMsgErr);
        
        try {
            const mp3Path = await downloadYTFromUrl(videoUrl);
            const oggPath = mp3Path.replace(".mp3", ".ogg");
            
            // Check audio file size
            const stats = fs.statSync(mp3Path);
            if (stats.size > MAX_AUDIO_SIZE) {
                await this.sendMessage(from, `[${this.botName}] ❌ Audio file too large (${(stats.size / (1024 * 1024)).toFixed(2)}MB).\nMax allowed: 100MB`);
                fs.unlinkSync(mp3Path);
                return;
            }
            
            await convertToOgg(mp3Path, oggPath, durationSeconds);
            
            await this.sock.sendMessage(
                from,
                {
                    audio: fs.readFileSync(oggPath),
                    mimetype: "audio/ogg; codecs=opus",
                    ptt: true
                },
                { quoted: msg }
            );
            
            fs.unlinkSync(mp3Path);
            fs.unlinkSync(oggPath);
            
        } catch (err) {
            console.error("YouTube download error:", err);
            await this.sendMessage(from, `[${this.botName}] ❌ Download failed.\nVideo may be private, age-restricted, or too long.`);
        }
    }
    return;
}

// Video Download Command - FIXED VERSION
if (originalText.toLowerCase().startsWith('/video ')) {
    if (!senderHasPermission) return;
    
    const downloadData = await handleYouTubeDownload(this.sock, from, sender, originalText.toLowerCase().slice(1), msg);
    if (typeof downloadData === 'string') {
        await this.sendMessage(from, `[${this.botName}]\n${downloadData}`, { quoted: msg });
        return;
    }
    
    const { selected, videoUrl, type, quality, durationSeconds } = downloadData;
    
    const infoText = `[${this.botName}] ⬇️ Downloading: *${selected.title}*\n🎬 Quality: ${quality.toUpperCase()}\n⏱ ${durationSeconds ? durationSeconds + "s" : "Full video"}`;
    try {
        const infoMsg = await this.sendMessage(from, infoText);
        
        try {
            const videoPath = await downloadYTVideo(videoUrl, quality, durationSeconds);
            
            // Check video file size
            const stats = fs.statSync(videoPath);
            if (stats.size > MAX_VIDEO_SIZE) {
                await this.sendMessage(from, `[${this.botName}] ❌ Video file too large (${(stats.size / (1024 * 1024)).toFixed(2)}MB).\nMax allowed: 500MB`);
                // Try to delete the info message safely
                try {
                    if (infoMsg && infoMsg.key) {
                        await this.sock.sendMessage(from, { delete: infoMsg.key });
                    }
                } catch (deleteErr) {
                    // Ignore delete error
                }
                fs.unlinkSync(videoPath);
                return;
            }
            
            await this.sock.sendMessage(
                from,
                {
                    video: fs.readFileSync(videoPath),
                    mimetype: "video/mp4",
                    caption: `[${this.botName}] 🎬 ${selected.title}`
                },
                { quoted: msg }
            );
            
            // Try to delete the info message safely
            try {
                if (infoMsg && infoMsg.key) {
                    await this.sock.sendMessage(from, { delete: infoMsg.key });
                }
            } catch (deleteErr) {
                // Ignore delete error
            }
            
            fs.unlinkSync(videoPath);
            
        } catch (err) {
            console.error("YouTube video download error:", err);
            // Try to delete the info message safely
            try {
                if (infoMsg && infoMsg.key) {
                    await this.sock.sendMessage(from, { delete: infoMsg.key });
                }
            } catch (deleteErr) {
                // Ignore delete error
            }
            await this.sendMessage(from, `[${this.botName}] ❌ Video download failed.\nVideo may be private, age-restricted, or too long.`);
        }
    } catch (infoMsgErr) {
        // If sending info message fails, continue with download anyway
        console.error("Failed to send info message:", infoMsgErr);
        
        try {
            const videoPath = await downloadYTVideo(videoUrl, quality, durationSeconds);
            
            // Check video file size
            const stats = fs.statSync(videoPath);
            if (stats.size > MAX_VIDEO_SIZE) {
                await this.sendMessage(from, `[${this.botName}] ❌ Video file too large (${(stats.size / (1024 * 1024)).toFixed(2)}MB).\nMax allowed: 500MB`);
                fs.unlinkSync(videoPath);
                return;
            }
            
            await this.sock.sendMessage(
                from,
                {
                    video: fs.readFileSync(videoPath),
                    mimetype: "video/mp4",
                    caption: `[${this.botName}] 🎬 ${selected.title}`
                },
                { quoted: msg }
            );
            
            fs.unlinkSync(videoPath);
            
        } catch (err) {
            console.error("YouTube video download error:", err);
            await this.sendMessage(from, `[${this.botName}] ❌ Video download failed.\nVideo may be private, age-restricted, or too long.`);
        }
    }
    return;
}
            if (isDM && text === '/admin') {
                if (roles.admins.length === 0) {
                    addAdmin(sender);
                    try {
                        await this.sendMessage(from, `[${this.botName}] 👑 *ADMINISTRATOR PRIVILEGES GRANTED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `✅ *Status:* You have been appointed as system administrator\n` +
                                                    `🤖 *Bot:* ${this.botName}\n\n` +
                                                    `📱 Access control panel with /menu\n` +
                                                    `🔒 This is a permanent system role`);
                    } catch (e) {}
                    consolex.success(`${SYMBOLS.SUCCESS} New administrator appointed: ${sender.split('@')[0]}`);
                } else if (senderIsAdmin) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 👑 You currently hold administrator privileges.`);
                    } catch (e) {}
                } else {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 👑 Administrator position is currently occupied.\n` +
                                                    `Only one administrator can be appointed at a time.`);
                    } catch (e) {}
                }
                return;
            }

            if (isDM && text === '/unadmin') {
                if (senderIsAdmin) {
                    removeAdmin(sender);
                    try {
                        await this.sendMessage(from, `[${this.botName}] 👑 *ADMINISTRATOR PRIVILEGES REVOKED*\n\n` +
                                                    `You are no longer the system administrator.`);
                    } catch (e) {}
                    consolex.success(`${SYMBOLS.SUCCESS} Administrator removed: ${sender.split('@')[0]}`);
                } else {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 👑 You do not hold administrator privileges.`);
                    } catch (e) {}
                }
                return;
            }

            if (isGroup && text === '/sub' && senderIsAdmin) {
                if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 Reply to someone to make them sub-admin!`);
                    } catch (e) {}
                    return;
                }
                const targetJid = msg.message.extendedTextMessage.contextInfo.participant;
                if (addSubAdmin(targetJid, from)) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ✅ @${targetJid.split('@')[0]} is now a SUB-ADMIN!`, [targetJid]);
                    } catch (e) {}
                } else {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ Already a sub-admin!`);
                    } catch (e) {}
                }
                return;
            }

            if (isGroup && text === '/unsub' && senderIsAdmin) {
                if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 Reply to someone to remove them as sub-admin!`);
                    } catch (e) {}
                    return;
                }
                const targetJid = msg.message.extendedTextMessage.contextInfo.participant;
                if (removeSubAdmin(targetJid, from)) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ @${targetJid.split('@')[0]} is no longer a sub-admin!`, [targetJid]);
                    } catch (e) {}
                } else {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ Not a sub-admin!`);
                    } catch (e) {}
                }
                return;
            }

            // NEW: /join command
            if (originalText.toLowerCase().startsWith('/join ') && senderIsAdmin) {
                const groupLink = originalText.slice(6).trim();
                
                if (!groupLink.includes('chat.whatsapp.com')) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID WHATSAPP GROUP LINK*\n\n` +
                                                    `📝 *Format:* /join https://chat.whatsapp.com/INVITE_CODE\n` +
                                                    `🔗 *Example:* /join https://chat.whatsapp.com/AbcDefGhiJk`);
                    } catch (e) {}
                    return;
                }

                const inviteCode = extractGroupIdFromLink(groupLink);
                if (!inviteCode) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID INVITE CODE*\n\n` +
                                                    `⚠️ Could not extract invite code from link.\n` +
                                                    `🔗 Make sure the link is a valid WhatsApp group invite.`);
                    } catch (e) {}
                    return;
                }

                try {
                    await this.sendMessage(from, `[${this.botName}] 👥 *GROUP JOIN OPERATION INITIATED*\n\n` +
                                                `🔗 *Link:* ${groupLink}\n` +
                                                `🔐 *Invite Code:* ${inviteCode}\n` +
                                                `🤖 *Bot:* ${this.botName}\n` +
                                                `🔄 *Status:* Attempting to join...`);
                    
                    await this.botManager.commandBus.broadcastCommand('join_group', { 
                        inviteCode: inviteCode,
                        groupLink: groupLink 
                    }, this.botId, false);
                    
                } catch (e) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ Failed to initiate join operation.`);
                    } catch (e2) {}
                }
                return;
            }

            // NEW: /leave command
            if (text === '/leave' && senderHasPermission) {
                if (!isGroup) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ This command is only available in group conversations.`);
                    } catch (e) {}
                    return;
                }

                try {
                    await this.sendMessage(from, `[${this.botName}] 👥 *GROUP LEAVE OPERATION INITIATED*\n\n` +
                                                `🗑️ *Group:* ${from}\n` +
                                                `🤖 *Bot:* ${this.botName}\n` +
                                                `🔄 *Status:* Preparing to leave...`);
                    
                    await this.botManager.commandBus.broadcastCommand('leave_group', { 
                        groupJid: from 
                    }, this.botId, false);
                    
                } catch (e) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ Failed to initiate leave operation.`);
                    } catch (e2) {}
                }
                return;
            }

            if (originalText.toLowerCase().startsWith('/add ') && senderIsAdmin) {
                const number = originalText.slice(5).trim().replace(/[^0-9]/g, '');
                if (number.length < 10) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID PHONE NUMBER*\n\n` +
                                                    `📝 *Expected Format:* Country code + phone number\n` +
                                                    `🔢 *Example:* /add 91xxxxxxxxxx\n` +
                                                    `📏 *Minimum length:* 10 digits`);
                    } catch (e) {}
                    return;
                }
                
                const result = await this.botManager.addBot(number, from);
                try {
                    await this.sendMessage(from, `[${this.botName}]\n${result}`);
                } catch (e) {}
                return;
            }

            if (text === '/bots' && senderHasPermission) {
                const bots = this.botManager.commandBus.getAllBots();
                let msgText = `[${this.botName}] 🤖 *ACTIVE BOT SESSIONS*\n\n`;
                msgText += `⚡ *System:* ${this.systemBrand}\n`;
                msgText += `🔗 *Total connected:* ${bots.length} session(s)\n`;
                msgText += `🎯 *Current Mode:* ${botMode.mode}\n`;
                msgText += `----------------------------\n\n`;
                
                bots.forEach((bot, index) => {
                    const status = bot.connected ? '🟢 Online' : '🔴 Offline';
                    const isActive = botMode.activeBots.includes(bot.botId) ? '✅ Active' : '❌ Inactive';
                    msgText += `${index + 1}. *${bot.botName}:* ${status} | ${isActive}\n`;
                    if (bot.botNumber) {
                        const cleanNum = bot.botNumber.split('@')[0];
                        msgText += `   📱 *Phone:* ${cleanNum}\n`;
                    }
                    msgText += `\n`;
                });
                
                try {
                    await this.sendMessage(from, msgText);
                } catch (e) {}
                return;
            }

            if (!senderHasPermission) return;

            if (text === '/menu') {
                try {
                    // Try to send menu with image
                    await this.sendMenuWithImage(from);
                } catch (e) {
                    // Fallback to text-only menu
                    try {
                        await this.sendMessage(from, menuPanel);
                    } catch (e2) {}
                }
                return;
            }

            if (text === '/status') {
                const allBots = this.botManager.commandBus.getAllBots();
                
                // Get parallel attack stats
                const ncCount = parallelSystem.getActiveCount(from, 'nc');
                const slideCount = parallelSystem.getActiveCount(from, 'slide');
                const txtCount = parallelSystem.getActiveCount(from, 'txt');
                const vnCount = parallelSystem.getActiveCount(from, 'vn');
                const picCount = parallelSystem.getActiveCount(from, 'pic');
                const beatCount = parallelSystem.getActiveCount(from, 'beat');
                
                // Get stop system status
                const stopSignals = Array.from(stopSystem.stopSignals.values())
                    .filter(s => s.groupJid === from || !s.groupJid);
                
                const statusMsg = `[${this.botName}] 📊 *SYSTEM STATUS REPORT*\n\n` +
                                 `⚡ *System:* ${this.systemBrand}\n` +
                                 `🤖 *Current Bot:* ${this.botName}\n` +
                                 `🎯 *Mode:* ${botMode.mode}\n` +
                                 `----------------------------\n` +
                                 `⚡ *PARALLEL ATTACKS (This Group):*\n` +
                                 `• 🔄 NC Attacks: ${ncCount}\n` +
                                 `• ⚡ Slide Attacks: ${slideCount}\n` +
                                 `• 📝 Text Attacks: ${txtCount}\n` +
                                 `• 🎤 Voice Attacks: ${vnCount}\n` +
                                 `• 🖼️ Image Attacks: ${picCount}\n` +
                                 `• 👊 Beat Attacks: ${beatCount}\n\n` +
                                 `🛑 *STOP SYSTEM:* ${stopSignals.length} active signals\n` +
                                 `🌍 *Global Bot Status:* ${allBots.filter(b => b.connected).length}/${allBots.length} online\n` +
                                 `📈 *Maximum Parallel Attacks:* 20 simultaneous`;
                
                try {
                    await this.sendMessage(from, statusMsg);
                } catch (e) {}
                return;
            }

            const dncCommands = ['dnc1', 'dnc2', 'dnc3', 'dnc4', 'dnc5', 'dnc7', 'dnc8'];
            for (const dncKey of dncCommands) {
                if (originalText.toLowerCase().startsWith(`/${dncKey} `)) {
                    const delayValue = parseInt(originalText.split(' ')[1]);
                    if (isNaN(delayValue) || delayValue < 1) {
                        try {
                            await this.sendMessage(from, `[${this.botName}] ❌ *INVALID DELAY VALUE*\n\n` +
                                                        `📏 *Minimum allowed:* 1ms\n` +
                                                        `⚠️ *Maximum recommended:* 1000ms`);
                        } catch (e) {}
                        return;
                    }
                    const ncKey = dncKey.replace('dnc', 'nc');
                    ncDelays[ncKey] = delayValue;
                    saveDelays(ncDelays);
                    try {
                        await this.sendMessage(from, `[${this.botName}] ⚙️ *DELAY CONFIGURATION UPDATED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `🌀 *Operation:* ${ncKey.toUpperCase()}\n` +
                                                    `⏱️ *Delay:* ${delayValue}ms\n` +
                                                    `✅ *Status:* Applied successfully`);
                    } catch (e) {}
                    return;
                }
            }

            const ncCommands = ['nc1', 'nc2', 'nc3', 'nc4', 'nc5', 'nc7', 'nc8'];
            for (const ncKey of ncCommands) {
                if (originalText.toLowerCase().startsWith(`/${ncKey} `)) {
                    const nameText = originalText.slice(ncKey.length + 2).trim();
                    if (!nameText) {
                        try {
                            await this.sendMessage(from, `[${this.botName}] 📝 *USAGE*\n\n` +
                                                        `🔤 *Format:* /${ncKey} [text]\n` +
                                                        `💬 *Example:* /${ncKey} OperationActive`);
                        } catch (e) {}
                        return;
                    }

                    if (!isGroup) {
                        try {
                            await this.sendMessage(from, `[${this.botName}] ❌ This operation requires a group environment.`);
                        } catch (e) {}
                        return;
                    }

                    await this.botManager.commandBus.broadcastCommand('start_nc', { from, nameText, ncKey }, this.botId);
                    return;
                }
            }

            if (originalText.toLowerCase().startsWith('/slide ')) {
                if (!msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 *USAGE*\n\n` +
                                                    `↩️ Reply to target message\n` +
                                                    `🔤 *Format:* /slide [text] [delay]\n` +
                                                    `💬 *Example:* /slide MessageText 1`);
                    } catch (e) {}
                    return;
                }

                const args = originalText.slice(7).trim().split(' ');
                if (args.length < 2) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID FORMAT*\n\n` +
                                                    `📝 *Usage:* /slide [text] [delay]\n` +
                                                    `💬 *Example:* /slide TargetMessage 1`);
                    } catch (e) {}
                    return;
                }

                const slideDelay = parseInt(args[args.length - 1]);
                const slideText = args.slice(0, -1).join(' ');

                if (isNaN(slideDelay) || slideDelay < 1) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID DELAY*\n\n` +
                                                    `⏱️ Delay must be 1ms or greater\n` +
                                                    `📏 Current minimum: 1ms`);
                    } catch (e) {}
                    return;
                }

                const quotedParticipant = msg.message.extendedTextMessage.contextInfo.participant || 
                                        msg.message.extendedTextMessage.contextInfo.remoteJid;
                const quotedMsgId = msg.message.extendedTextMessage.contextInfo.stanzaId;
                const quotedMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage;

                await this.botManager.commandBus.broadcastCommand('start_slide', {
                    from,
                    slideText,
                    slideDelay,
                    quotedParticipant,
                    quotedMsgId,
                    quotedMessage
                }, this.botId);
                return;
            }

            else if (text === '/slidestop') {
                await this.botManager.commandBus.broadcastCommand('stop_slide', { from }, this.botId);
                return;
            }

            else if (originalText.toLowerCase().startsWith('/txt ')) {
                const args = originalText.slice(5).trim().split(' ');
                if (args.length < 2) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 *USAGE*\n\n` +
                                                    `🔤 *Format:* /txt [text] [delay]\n` +
                                                    `💬 *Example:* /txt Hello 1`);
                    } catch (e) {}
                    return;
                }

                const txtDelay = parseInt(args[args.length - 1]);
                const txtText = args.slice(0, -1).join(' ');

                if (isNaN(txtDelay) || txtDelay < 1) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID DELAY*\n\n` +
                                                    `⏱️ Delay must be = 1ms`);
                    } catch (e) {}
                    return;
                }

                await this.botManager.commandBus.broadcastCommand('start_txt', { from, txtText, txtDelay }, this.botId);
                return;
            }

            else if (text === '/txtstop') {
                await this.botManager.commandBus.broadcastCommand('stop_txt', { from }, this.botId);
                return;
            }

            // FIXED: /vn command for Hindi voice notes
            else if (originalText.toLowerCase().startsWith('/vn ')) {
                const vnText = originalText.slice(4).trim();
                if (!vnText) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 *USAGE*\n\n` +
                                                    `🔤 *Format:* /vn [text]\n` +
                                                    `💬 *Example:* /vn नमस्ते दोस्तों`);
                    } catch (e) {}
                    return;
                }

                if (!TTS_AVAILABLE) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ TTS service unavailable\n\n` +
                                                    `💡 Install: npm install node-gtts`);
                    } catch (e) {}
                    return;
                }

                try {
                    await this.sock.sendMessage(from, { 
                        text: `[${this.botName}] 🎤 Converting text to Hindi voice: "${vnText}"...` 
                    });
                    
                    const audioBuffer = await generateVoiceNote(vnText, 'hi');
                    
                    if (!audioBuffer || audioBuffer.length < 100) {
                        throw new Error('Empty audio generated');
                    }
                    
                    await this.sock.sendMessage(from, {
                        audio: audioBuffer,
                        mimetype: 'audio/mpeg',
                        fileName: 'voice_note.mp3',
                        ptt: true
                    });
                    
                    consolex.success(`${SYMBOLS.SUCCESS} Voice note sent: "${vnText}"`);
                    
                } catch (err) {
                    consolex.error(`${SYMBOLS.ERROR} Voice note error: ${err.message}`);
                    
                    let errorMsg = `[${this.botName}] ❌ Failed to generate voice note.`;
                    
                    if (err.message.includes('node-gtts') || err.message.includes('gtts')) {
                        errorMsg += "\n\n💡 *Solution:*\n" +
                                   "1. Install TTS: `npm install node-gtts`\n" +
                                   "2. Or try: `npm install gtts`\n" +
                                   "3. Restart the bot";
                    } else if (err.message.includes('Empty audio')) {
                        errorMsg += "\n\n⚠️ Text may contain unsupported characters.\n" +
                                   "Try simple Hindi text like: 'नमस्ते'";
                    }
                    
                    try {
                        await this.sendMessage(from, errorMsg);
                    } catch (e) {}
                }
                return;
            }

            // FIXED: /vnatk command
            else if (originalText.toLowerCase().startsWith('/vnatk ')) {
                const args = originalText.slice(7).trim().split(' ');
                if (args.length < 2) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID FORMAT*\n\n` +
                                                    `📝 *Usage:* /vnatk [text] [delay]\n` +
                                                    `💬 *Example:* /vnatk नमस्ते 2000`);
                    } catch (e) {}
                    return;
                }

                const vnDelay = parseInt(args[args.length - 1]);
                const vnText = args.slice(0, -1).join(' ');

                if (isNaN(vnDelay) || vnDelay < 1000) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID DELAY*\n\n` +
                                                    `⏱️ Voice notes require at least 1000ms delay.`);
                    } catch (e) {}
                    return;
                }

                await this.botManager.commandBus.broadcastCommand('start_vn', { from, vnText, vnDelay }, this.botId);
                return;
            }

            else if (text === '/vnstop') {
                await this.botManager.commandBus.broadcastCommand('stop_vn', { from }, this.botId);
                return;
            }

            else if (originalText.toLowerCase().startsWith('/pic ')) {
                if (!msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 📝 *USAGE*\n\n` +
                                                    `🖼️ Reply to an image\n` +
                                                    `⏱️ *Format:* /pic [delay]\n` +
                                                    `💬 *Example:* /pic 1`);
                    } catch (e) {}
                    return;
                }

                const picDelay = parseInt(originalText.slice(5).trim());
                if (isNaN(picDelay) || picDelay < 1) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ *INVALID DELAY*\n\n` +
                                                    `⏱️ Delay must be 1ms or greater\n` +
                                                    `📏 Current minimum: 1ms`);
                    } catch (e) {}
                    return;
                }

                const quotedMsg = {
                    key: {
                        remoteJid: from,
                        fromMe: false,
                        id: msg.message.extendedTextMessage.contextInfo.stanzaId,
                        participant: msg.message.extendedTextMessage.contextInfo.participant
                    },
                    message: msg.message.extendedTextMessage.contextInfo.quotedMessage
                };

                try {
                    const imageBuffer = await downloadMediaMessage(quotedMsg, 'buffer', {});
                    const imageMessage = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
                    
                    await this.botManager.commandBus.broadcastCommand('start_pic', { 
                        from, 
                        picDelay, 
                        imageBuffer: imageBuffer.toString('base64'),
                        mimetype: imageMessage.mimetype || 'image/jpeg'
                    }, this.botId);
                } catch (err) {
                    // Silent
                }
                return;
            }

            else if (text === '/picstop') {
                await this.botManager.commandBus.broadcastCommand('stop_pic', { from }, this.botId);
                return;
            }

            if (originalText.toLowerCase().startsWith('/beat')) {
                if (!isGroup) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ❌ This operation requires a group environment.`);
                    } catch (e) {}
                    return;
                }

                if (!senderHasPermission) return;

                let targetId = null;

                if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
                    targetId = msg.message.extendedTextMessage.contextInfo.participant;
                } else if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
                    targetId = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
                } else {
                    const num = originalText.replace('/beat', '').trim().replace(/[^0-9]/g, '');
                    if (num.length >= 8) targetId = `${num}@s.whatsapp.net`;
                }

                if (!targetId) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🎯 *SPECIFY TARGET*\n\n` +
                                                    `↩️ Reply to target, mention, or provide number`);
                    } catch (e) {}
                    return;
                }

                await this.botManager.commandBus.broadcastCommand('start_beat', { from, targetId }, this.botId);
                return;
            }

            if (text === '/stopbeat') {
                if (!senderHasPermission) return;
                await this.botManager.commandBus.broadcastCommand('stop_beat', { from }, this.botId);
                return;
            }

        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR} Message handling error: ${err.message}`);
        }
    }

    async sendMenuWithImage(jid) {
        try {
            // Get menu image from the folder
            const menuImagesDir = MENU_IMAGES_DIR;
            const files = fs.readdirSync(menuImagesDir);
            
            // Find image files (jpg, jpeg, png)
            const imageFiles = files.filter(file => 
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
            );
            
            if (imageFiles.length > 0) {
                // Use the first image found
                const imagePath = path.join(menuImagesDir, imageFiles[0]);
                
                // Read the image file
                const imageBuffer = fs.readFileSync(imagePath);
                
                // Determine mime type
                const ext = path.extname(imageFiles[0]).toLowerCase();
                let mimeType = 'image/jpeg';
                if (ext === '.png') mimeType = 'image/png';
                else if (ext === '.gif') mimeType = 'image/gif';
                else if (ext === '.webp') mimeType = 'image/webp';
                
                // Send image with caption as menu
                await this.sock.sendMessage(jid, {
                    image: imageBuffer,
                    caption: menuPanel,
                    mimetype: mimeType
                });
                
                consolex.success(`${SYMBOLS.SUCCESS} Menu sent with image: ${imageFiles[0]}`);
            } else {
                // Fallback to text-only menu if no image found
                await this.sendMessage(jid, menuPanel);
                consolex.info(`${SYMBOLS.INFO} Menu sent as text (no image found in ${menuImagesDir})`);
                
                // Create a sample image or instructions
                const sampleText = `[${this.botName}] 🖼️ *HOW TO ADD MENU IMAGE*\n\n` +
                                 `1. Create a folder called "menu_images" in the bot directory\n` +
                                 `2. Add your menu image (jpg/png) to that folder\n` +
                                 `3. Restart the bot\n` +
                                 `4. The /menu command will show your image!\n\n` +
                                 `📁 Current folder: ${menuImagesDir}`;
                
                await this.sendMessage(jid, sampleText);
            }
        } catch (error) {
            consolex.error(`${SYMBOLS.ERROR} Error sending menu with image: ${error.message}`);
            
            // Fallback to text-only menu
            await this.sendMessage(jid, menuPanel);
        }
    }

    async executeCommand(commandType, data, sendConfirmation = true) {
        try {
            // Update session activity
            this.lastActivity = Date.now();
            updateSessionActivity(this.botId);
            
            // ENHANCED STOP CHECKING WITH PRIORITY
            if (checkStopSignal(commandType, data.from, this.botId)) {
                consolex.warning(`${SYMBOLS.WARNING} Received stop signal for ${commandType}`);
                return;
            }
            
            if (commandType === 'start_nc') {
                const { from, nameText, ncKey } = data;
                const emojis = emojiArrays[ncKey];
                const nameDelay = ncDelays[ncKey];
                
                consolex.attack(`${SYMBOLS.ROCKET} NC ATTACK STARTED (${nameDelay}ms delay) by ${this.botName}`);
                
                // Register attack in parallel system with enhanced stop handling
                const attackId = parallelSystem.registerAttack(from, 'nc', { nameText, ncKey }, () => {
                    // Stop callback when attack is stopped
                    this.markAttackStop(attackId);
                });
                
                // Generate unique task ID for this specific attack
                const taskId = `${from}_${ncKey}_${Date.now()}`;
                
                // ENHANCED: CREATE 100 THREADS FOR NC ATTACKS
                const threads = [];
                for (let i = 0; i < NC_THREADS; i++) {
                    const threadId = `${taskId}_${i}`;
                    const threadKey = `${threadId}_thread`;
                    
                    let shouldStop = false;
                    const stopFunction = () => { 
                        shouldStop = true; 
                        this.markAttackStop(attackId);
                        consolex.warning(`${SYMBOLS.STOP} Stopping NC thread ${i}: ${threadKey.substring(0, 15)}...`);
                        unregisterThread(threadKey);
                        parallelSystem.removeThread(attackId, threadKey);
                    };
                    
                    // REGISTER THREAD GLOBALLY
                    registerThread(threadKey, {
                        type: 'nc',
                        groupJid: from,
                        botId: this.botId,
                        attackId: attackId,
                        stopFunction: stopFunction
                    });
                    
                    this.stopCommands.set(threadId, stopFunction);
                    threads.push({ threadId, threadKey, stopFunction, shouldStop });
                }
                
                // Run each thread
                threads.forEach((thread, index) => {
                    const runLoop = async () => {
                        let emojiIndex = index; // Start each thread with different emoji index
                        
                        while (!thread.shouldStop && !this.shouldAttackStop(attackId)) {
                            // ENHANCED STOP CHECKING EVERY ITERATION
                            if (checkStopSignal('stop_nc', from, this.botId) || 
                                checkStopSignal('all', from, this.botId) ||
                                parallelSystem.shouldAttackStop(attackId)) {
                                consolex.warning(`${SYMBOLS.STOP} STOP DETECTED in NC thread ${index}`);
                                break;
                            }
                            
                            try {
                                const emoji = emojis[Math.floor(emojiIndex) % emojis.length];
                                const newName = `${nameText} ${emoji}`;
                                await this.sock.groupUpdateSubject(from, newName);
                                emojiIndex++;
                                
                                // Wait for the delay before next execution
                                await delay(nameDelay);
                                
                            } catch (err) {
                                await delay(100); // Small delay on error
                            }
                        }
                        
                        // GRACEFUL cleanup
                        setTimeout(() => {
                            this.stopCommands.delete(thread.threadId);
                            unregisterThread(thread.threadKey);
                            parallelSystem.removeThread(attackId, thread.threadKey);
                            consolex.success(`${SYMBOLS.CHECK} NC thread ${index} stopped: ${thread.threadKey.substring(0, 15)}...`);
                        }, 1000);
                    };

                    runLoop().catch(() => {});
                });

                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🔥 *NC ATTACK STARTED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `🌀 *Type:* ${ncKey.toUpperCase()}\n` +
                                                    `🔤 *Text:* ${nameText}\n` +
                                                    `⏱️ *Delay:* ${nameDelay}ms\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `🧵 *Threads:* ${NC_THREADS} (ULTRA PARALLEL)\n` +
                                                    `📊 *Attack ID:* ${attackId.substring(0, 8)}...\n` +
                                                    `✅ *Status:* ${NC_THREADS} parallel threads activated!`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'stop_nc') {
                const { from } = data;
                
                // SEND ENHANCED STOP SIGNAL WITH PRIORITY
                stopSystem.sendGlobalStopSignal('stop_nc', from, 'normal', false);
                
                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🛑 *NC ATTACKS TERMINATED*\n\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `⚡ *Status:* All NC attacks stopping\n` +
                                                    `📊 *Threads being killed:* ${getActiveThreadCount('nc', from)}`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'start_slide') {
                const { from, slideText, slideDelay, quotedParticipant, quotedMsgId, quotedMessage } = data;
                
                // Register attack in parallel system with enhanced stop handling
                const attackId = parallelSystem.registerAttack(from, 'slide', { slideText, slideDelay, quotedParticipant }, () => {
                    // Stop callback when attack is stopped
                    this.markAttackStop(attackId);
                });
                
                const taskId = `${from}_${quotedParticipant}_${Date.now()}`;
                
                // Create slide task
                const slideTask = {
                    targetJid: quotedParticipant,
                    text: slideText,
                    groupJid: from,
                    latestMsg: {
                        key: {
                            remoteJid: from,
                            fromMe: false,
                            id: quotedMsgId,
                            participant: quotedParticipant
                        },
                        message: quotedMessage
                    },
                    hasNewMsg: true,
                    lastRepliedId: null,
                    active: true,
                    attackId: attackId
                };

                this.activeSlides.set(taskId, slideTask);

                // SINGLE THREAD FOR SLIDE ATTACKS
                const threadId = `${taskId}_0`;
                const threadKey = `${threadId}_thread`;
                
                let shouldStop = false;
                const stopFunction = () => { 
                    shouldStop = true; 
                    this.markAttackStop(attackId);
                    consolex.warning(`${SYMBOLS.STOP} Stopping slide thread: ${threadKey.substring(0, 15)}...`);
                    unregisterThread(threadKey);
                    parallelSystem.removeThread(attackId, threadKey);
                };
                
                // REGISTER THREAD GLOBALLY
                registerThread(threadKey, {
                    type: 'slide',
                    groupJid: from,
                    botId: this.botId,
                    attackId: attackId,
                    stopFunction: stopFunction
                });
                
                this.stopCommands.set(threadId, stopFunction);
                
                const runSlide = async () => {
                    let lastExecutionTime = 0;
                    
                    while (!shouldStop && slideTask.active && !this.shouldAttackStop(attackId)) {
                        // ENHANCED STOP CHECKING EVERY ITERATION
                        if (checkStopSignal('stop_slide', from, this.botId) || 
                            checkStopSignal('all', from, this.botId) ||
                            parallelSystem.shouldAttackStop(attackId)) {
                            consolex.warning(`${SYMBOLS.STOP} STOP DETECTED in Slide thread`);
                            break;
                        }
                        
                        const now = Date.now();
                        const timeSinceLastExecution = now - lastExecutionTime;
                        
                        // ENFORCE DELAY STRICTLY
                        if (timeSinceLastExecution < slideDelay) {
                            await delay(slideDelay - timeSinceLastExecution);
                            continue;
                        }
                        
                        try {
                            await this.sock.sendMessage(from, { 
                                text: `[${this.botName}] ${slideText}`
                            }, { 
                                quoted: slideTask.latestMsg
                            });
                            
                            lastExecutionTime = Date.now();
                            
                            // Wait for the FULL delay before next execution
                            await delay(slideDelay);
                            
                        } catch (err) {
                            await delay(100); // Small delay on error
                        }
                    }
                    
                    // GRACEFUL cleanup
                    setTimeout(() => {
                        this.stopCommands.delete(threadId);
                        unregisterThread(threadKey);
                        parallelSystem.removeThread(attackId, threadKey);
                        consolex.success(`${SYMBOLS.CHECK} Slide thread stopped: ${threadKey.substring(0, 15)}...`);
                    }, 1000);
                };
                
                runSlide().catch(() => {});

                if (sendConfirmation) {
                    const cleanPhone = quotedParticipant.split('@')[0];
                    try {
                        await this.sendMessage(from, `[${this.botName}] ⚡ *SLIDE ATTACK STARTED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `🔤 *Text:* ${slideText}\n` +
                                                    `⏱️ *Delay:* ${slideDelay}ms\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `🎯 *Target:* @${cleanPhone}\n` +
                                                    `🧵 *Threads:* 1 (for accurate targeting)\n` +
                                                    `📊 *Attack ID:* ${attackId.substring(0, 8)}...\n` +
                                                    `✅ *Status:* Slide attack activated`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'stop_slide') {
                const { from } = data;
                
                // SEND ENHANCED STOP SIGNAL WITH PRIORITY
                stopSystem.sendGlobalStopSignal('stop_slide', from, 'normal', false);
                
                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🛑 *SLIDE ATTACKS TERMINATED*\n\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `⚡ *Status:* All slide attacks stopping`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'start_txt') {
                const { from, txtText, txtDelay } = data;
                
                // Register attack in parallel system with enhanced stop handling
                const attackId = parallelSystem.registerAttack(from, 'txt', { txtText, txtDelay }, () => {
                    // Stop callback when attack is stopped
                    this.markAttackStop(attackId);
                });
                
                const taskId = `${from}_txt_${Date.now()}`;
                
                const txtTask = { 
                    active: true,
                    attackId: attackId 
                };
                this.activeTxtSenders.set(taskId, txtTask);

                // SINGLE THREAD FOR TEXT ATTACKS
                const threadId = `${taskId}_0`;
                const threadKey = `${threadId}_thread`;
                
                let shouldStop = false;
                const stopFunction = () => { 
                    shouldStop = true; 
                    this.markAttackStop(attackId);
                    consolex.warning(`${SYMBOLS.STOP} Stopping txt thread: ${threadKey.substring(0, 15)}...`);
                    unregisterThread(threadKey);
                    parallelSystem.removeThread(attackId, threadKey);
                };
                
                // REGISTER THREAD GLOBALLY
                registerThread(threadKey, {
                    type: 'txt',
                    groupJid: from,
                    botId: this.botId,
                    attackId: attackId,
                    stopFunction: stopFunction
                });
                
                this.stopCommands.set(threadId, stopFunction);
                
                const runTxt = async () => {
                    let lastExecutionTime = 0;
                    
                    while (!shouldStop && txtTask.active && !this.shouldAttackStop(attackId)) {
                        // ENHANCED STOP CHECKING EVERY ITERATION
                        if (checkStopSignal('stop_txt', from, this.botId) || 
                            checkStopSignal('all', from, this.botId) ||
                            parallelSystem.shouldAttackStop(attackId)) {
                            consolex.warning(`${SYMBOLS.STOP} STOP DETECTED in Text thread`);
                            break;
                        }
                        
                        const now = Date.now();
                        const timeSinceLastExecution = now - lastExecutionTime;
                        
                        // ENFORCE DELAY STRICTLY
                        if (timeSinceLastExecution < txtDelay) {
                            await delay(txtDelay - timeSinceLastExecution);
                            continue;
                        }
                        
                        try {
                            await this.sock.sendMessage(from, { text: `[${this.botName}] ${txtText}` });
                            
                            lastExecutionTime = Date.now();
                            
                            // Wait for the FULL delay before next execution
                            await delay(txtDelay);
                            
                        } catch (err) {
                            await delay(100); // Small delay on error
                        }
                    }
                    
                    // GRACEFUL cleanup
                    setTimeout(() => {
                        this.stopCommands.delete(threadId);
                        unregisterThread(threadKey);
                        parallelSystem.removeThread(attackId, threadKey);
                        consolex.success(`${SYMBOLS.CHECK} Txt thread stopped: ${threadKey.substring(0, 15)}...`);
                    }, 1000);
                };
                
                runTxt().catch(() => {});

                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] ⚡ *TEXT FLOOD STARTED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `🔤 *Text:* ${txtText}\n` +
                                                    `⏱️ *Delay:* ${txtDelay}ms\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `🧵 *Threads:* 1 (for message consistency)\n` +
                                                    `📊 *Attack ID:* ${attackId.substring(0, 8)}...\n` +
                                                    `✅ *Status:* Text flood activated`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'stop_txt') {
                const { from } = data;
                
                // SEND ENHANCED STOP SIGNAL WITH PRIORITY
                stopSystem.sendGlobalStopSignal('stop_txt', from, 'normal', false);
                
                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🛑 *TEXT FLOODS TERMINATED*\n\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `⚡ *Status:* All text floods stopping`);
                    } catch (e) {}
                }
            }
            // FIXED: start_vn command
            else if (commandType === 'start_vn') {
                const { from, vnText, vnDelay } = data;
                
                if (!TTS_AVAILABLE) {
                    if (sendConfirmation) {
                        try {
                            await this.sendMessage(from, `[${this.botName}] ❌ TTS service unavailable\n\n` +
                                                        `💡 Install: npm install node-gtts`);
                        } catch (e) {}
                    }
                    return;
                }
                
                // Register attack in parallel system with enhanced stop handling
                const attackId = parallelSystem.registerAttack(from, 'vn', { vnText, vnDelay }, () => {
                    // Stop callback when attack is stopped
                    this.markAttackStop(attackId);
                });
                
                const taskId = `${from}_vn_${Date.now()}`;
                
                let shouldStop = false;
                const stopFunction = () => { 
                    shouldStop = true; 
                    this.markAttackStop(attackId);
                    consolex.warning(`${SYMBOLS.STOP} Stopping vn thread: ${taskId.substring(0, 15)}...`);
                    unregisterThread(taskId);
                    parallelSystem.removeThread(attackId, taskId);
                };
                
                // REGISTER THREAD GLOBALLY
                registerThread(taskId, {
                    type: 'vn',
                    groupJid: from,
                    botId: this.botId,
                    attackId: attackId,
                    stopFunction: stopFunction
                });
                
                this.stopCommands.set(taskId, stopFunction);
                
                const vnTask = { 
                    active: true,
                    attackId: attackId 
                };
                this.activeVNSenders.set(taskId, vnTask);

                const runVN = async () => {
                    let lastExecutionTime = 0;
                    
                    while (!shouldStop && vnTask.active && !this.shouldAttackStop(attackId)) {
                        // ENHANCED STOP CHECKING EVERY ITERATION
                        if (checkStopSignal('stop_vn', from, this.botId) || 
                            checkStopSignal('all', from, this.botId) ||
                            parallelSystem.shouldAttackStop(attackId)) {
                            consolex.warning(`${SYMBOLS.STOP} STOP DETECTED in VN thread`);
                            break;
                        }
                        
                        const now = Date.now();
                        const timeSinceLastExecution = now - lastExecutionTime;
                        
                        // ENFORCE DELAY STRICTLY
                        if (timeSinceLastExecution < vnDelay) {
                            await delay(vnDelay - timeSinceLastExecution);
                            continue;
                        }
                        
                        try {
                            const audioBuffer = await generateVoiceNote(vnText, 'hi');
                            
                            if (audioBuffer && audioBuffer.length > 100) {
                                await this.sock.sendMessage(from, {
                                    audio: audioBuffer,
                                    mimetype: 'audio/mpeg',
                                    fileName: `[${this.botName}] voice_attack.mp3`,
                                    ptt: true
                                });
                                
                                consolex.success(`${SYMBOLS.SUCCESS} Voice attack sent by ${this.botName}: "${vnText}"`);
                            }
                            
                            lastExecutionTime = Date.now();
                            
                            // Wait for the FULL delay before next execution
                            await delay(vnDelay);
                            
                        } catch (err) {
                            consolex.error(`${SYMBOLS.ERROR} Voice attack error: ${err.message}`);
                            await delay(1000); // Wait on error
                        }
                    }
                    
                    // GRACEFUL cleanup
                    setTimeout(() => {
                        this.stopCommands.delete(taskId);
                        unregisterThread(taskId);
                        parallelSystem.removeThread(attackId, taskId);
                        consolex.success(`${SYMBOLS.CHECK} VN thread stopped: ${taskId.substring(0, 15)}...`);
                    }, 1000);
                };

                runVN().catch(() => {});

                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🎤 *HINDI VOICE ATTACK STARTED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `🔤 *Text:* ${vnText}\n` +
                                                    `🇮🇳 *Language:* Hindi\n` +
                                                    `⏱️ *Delay:* ${vnDelay}ms\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `🧵 *Threads:* 1 (voice consistency)\n` +
                                                    `📊 *Attack ID:* ${attackId.substring(0, 8)}...\n` +
                                                    `✅ *Status:* Voice attack activated`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'stop_vn') {
                const { from } = data;
                
                // SEND ENHANCED STOP SIGNAL WITH PRIORITY
                stopSystem.sendGlobalStopSignal('stop_vn', from, 'normal', false);
                
                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🛑 *VOICE ATTACKS TERMINATED*\n\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `⚡ *Status:* All voice attacks stopping`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'start_pic') {
                const { from, picDelay, imageBuffer, mimetype } = data;
                
                // Register attack in parallel system with enhanced stop handling
                const attackId = parallelSystem.registerAttack(from, 'pic', { picDelay }, () => {
                    // Stop callback when attack is stopped
                    this.markAttackStop(attackId);
                });
                
                const taskId = `${from}_pic_${Date.now()}`;
                
                const picTask = { 
                    active: true, 
                    buffer: Buffer.from(imageBuffer, 'base64'), 
                    mimetype,
                    attackId: attackId
                };
                this.activePicSenders.set(taskId, picTask);

                // SINGLE THREAD FOR IMAGE ATTACKS
                const threadId = `${taskId}_0`;
                const threadKey = `${threadId}_thread`;
                
                let shouldStop = false;
                const stopFunction = () => { 
                    shouldStop = true; 
                    this.markAttackStop(attackId);
                    consolex.warning(`${SYMBOLS.STOP} Stopping pic thread: ${threadKey.substring(0, 15)}...`);
                    unregisterThread(threadKey);
                    parallelSystem.removeThread(attackId, threadKey);
                };
                
                // REGISTER THREAD GLOBALLY
                registerThread(threadKey, {
                    type: 'pic',
                    groupJid: from,
                    botId: this.botId,
                    attackId: attackId,
                    stopFunction: stopFunction
                });
                
                this.stopCommands.set(threadId, stopFunction);
                
                const runPic = async () => {
                    let lastExecutionTime = 0;
                    
                    while (!shouldStop && picTask.active && !this.shouldAttackStop(attackId)) {
                        // ENHANCED STOP CHECKING EVERY ITERATION
                        if (checkStopSignal('stop_pic', from, this.botId) || 
                            checkStopSignal('all', from, this.botId) ||
                            parallelSystem.shouldAttackStop(attackId)) {
                            consolex.warning(`${SYMBOLS.STOP} STOP DETECTED in Image thread`);
                            break;
                        }
                        
                        const now = Date.now();
                        const timeSinceLastExecution = now - lastExecutionTime;
                        
                        // ENFORCE DELAY STRICTLY
                        if (timeSinceLastExecution < picDelay) {
                            await delay(picDelay - timeSinceLastExecution);
                            continue;
                        }
                        
                        try {
                            await this.sock.sendMessage(from, {
                                image: picTask.buffer,
                                mimetype: picTask.mimetype,
                                caption: `[${this.botName}]`
                            });
                            
                            lastExecutionTime = Date.now();
                            
                            // Wait for the FULL delay before next execution
                            await delay(picDelay);
                            
                        } catch (err) {
                            await delay(100); // Small delay on error
                        }
                    }
                    
                    // GRACEFUL cleanup
                    setTimeout(() => {
                        this.stopCommands.delete(threadId);
                        unregisterThread(threadKey);
                        parallelSystem.removeThread(attackId, threadKey);
                        consolex.success(`${SYMBOLS.CHECK} Pic thread stopped: ${threadKey.substring(0, 15)}...`);
                    }, 1000);
                };
                
                runPic().catch(() => {});

                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🖼️ *IMAGE SPAM STARTED*\n\n` +
                                                    `⚡ *System:* ${this.systemBrand}\n` +
                                                    `⏱️ *Delay:* ${picDelay}ms\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `🧵 *Threads:* 1 (image consistency)\n` +
                                                    `📊 *Attack ID:* ${attackId.substring(0, 8)}...\n` +
                                                    `✅ *Status:* Image spam activated`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'stop_pic') {
                const { from } = data;
                
                // SEND ENHANCED STOP SIGNAL WITH PRIORITY
                stopSystem.sendGlobalStopSignal('stop_pic', from, 'normal', false);
                
                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🛑 *IMAGE ATTACKS TERMINATED*\n\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `⚡ *Status:* All image attacks stopping`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'start_beat') {
                const { from, targetId } = data;
                const gid = from;

                if (this.beatingGroups[gid]) {
                    if (sendConfirmation) {
                        try {
                            await this.sendMessage(from, `[${this.botName}] ⚠️ Beat attack already active on this group.`);
                        } catch (e) {}
                    }
                    return;
                }

                // Register attack in parallel system with enhanced stop handling
                const attackId = parallelSystem.registerAttack(from, 'beat', { targetId }, () => {
                    // Stop callback when attack is stopped
                    this.beatingGroups[gid] = false;
                    delete this.beatingTargets[gid];
                    delete this.lastBeatTime?.[gid];
                });

                this.beatingTargets[gid] = targetId;
                this.beatingGroups[gid] = true;
                
                // ADD RATE LIMITER
                this.lastBeatTime = this.lastBeatTime || {};
                this.lastBeatTime[gid] = 0;
                
                // REGISTER THREAD GLOBALLY
                const beatThreadId = `${gid}_beat_${this.botId}`;
                const stopFunction = () => {
                    this.beatingGroups[gid] = false;
                    delete this.beatingTargets[gid];
                    delete this.lastBeatTime?.[gid];
                    this.markAttackStop(attackId);
                    unregisterThread(beatThreadId);
                    parallelSystem.removeThread(attackId, beatThreadId);
                };
                
                registerThread(beatThreadId, {
                    type: 'beat',
                    groupJid: from,
                    botId: this.botId,
                    attackId: attackId,
                    targetId: targetId,
                    stopFunction: stopFunction
                });

                // Register stop callback
                this.stopCommands.set(beatThreadId, stopFunction);

                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 👊 *BEAT ATTACK STARTED*\n\n` +
                                                    `🎯 *Target:* @${targetId.split('@')[0]}\n` +
                                                    `⚡ *Mode:* Reply on target's messages\n` +
                                                    `🤖 *Bot:* ${this.botName}\n` +
                                                    `⏱️ *Rate Limit:* 1 reply per message\n` +
                                                    `🚫 *Ignores:* Reactions & system messages\n` +
                                                    `📊 *Attack ID:* ${attackId.substring(0, 8)}...\n` +
                                                    `✅ *Status:* ACTIVE - Will reply to target's messages`);
                    } catch (e) {}
                }
            }
            else if (commandType === 'stop_beat') {
                const { from } = data;
                const gid = from;

                if (!this.beatingGroups[gid]) {
                    if (sendConfirmation) {
                        try {
                            await this.sendMessage(from, `[${this.botName}] ⚠️ No active beat attack on this group.`);
                        } catch (e) {}
                    }
                    return;
                }

                // SEND ENHANCED STOP SIGNAL WITH PRIORITY
                stopSystem.sendGlobalStopSignal('stop_beat', from, 'normal', false);

                this.beatingGroups[gid] = false;
                if (this.beatIntervals[gid]) {
                    clearInterval(this.beatIntervals[gid]);
                    delete this.beatIntervals[gid];
                }
                delete this.beatingTargets[gid];
                delete this.lastBeatTime?.[gid];
                
                // Clean global thread registry
                const beatThreadId = `${gid}_beat_${this.botId}`;
                if (this.stopCommands.has(beatThreadId)) {
                    this.stopCommands.delete(beatThreadId);
                }
                unregisterThread(beatThreadId);

                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, `[${this.botName}] 🛑 *BEAT ATTACK STOPPED*\n\n` +
                                                    `🤖 *Bot:* ${this.botName}`);
                    } catch (e) {}
                }
            }
            // ULTRA ENHANCED STOP ALL COMMAND
            else if (commandType === 'stop_all') {
                const { from } = data;
                
                // SEND ENHANCED STOP SIGNAL WITH HIGH PRIORITY
                stopSystem.sendGlobalStopSignal('all', from, 'high', true);
                
                if (sendConfirmation) {
                    try {
                        await this.sendMessage(from, 
                            `[${this.botName}] 🛑 *EMERGENCY STOP EXECUTED*\n\n` +
                            `⚡ *System:* ${this.systemBrand}\n` +
                            `🤖 *Bot:* ${this.botName}\n` +
                            `⚡ *Priority:* HIGH\n` +
                            `📊 *Threads being stopped:* ${getActiveThreadCount(null, from)}\n` +
                            `✅ *Status:* All parallel attacks being force terminated - Delays reset`
                        );
                    } catch (e) {}
                }
            }
            // NEW: join_group command
            else if (commandType === 'join_group') {
                const { inviteCode, groupLink } = data;
                
                try {
                    consolex.group(`${SYMBOLS.JOIN} Attempting to join group with invite code: ${inviteCode}`);
                    
                    // Use the Baileys method to accept invite
                    const result = await this.sock.groupAcceptInvite(inviteCode);
                    
                    if (result) {
                        consolex.success(`${SYMBOLS.SUCCESS} Successfully joined group via invite code`);
                        
                        if (sendConfirmation) {
                            const leaderBot = this.botManager.commandBus.getLeaderBot();
                            if (leaderBot && leaderBot.botId === this.botId) {
                                await leaderBot.sendMessage(leaderBot.sock.user?.id, 
                                    `[${this.botName}] ✅ *GROUP JOIN SUCCESS*\n\n` +
                                    `🔗 *Link:* ${groupLink}\n` +
                                    `🤖 *Bot:* ${this.botName}\n` +
                                    `✅ *Status:* Successfully joined the group\n` +
                                    `⏰ *Time:* ${new Date().toLocaleTimeString()}\n\n` +
                                    `👥 Use /leave in the group to exit all bots`
                                );
                            }
                        }
                    } else {
                        consolex.error(`${SYMBOLS.ERROR} Failed to join group`);
                    }
                } catch (joinError) {
                    consolex.error(`${SYMBOLS.ERROR} Group join error: ${joinError.message}`);
                    
                    if (sendConfirmation) {
                        const leaderBot = this.botManager.commandBus.getLeaderBot();
                        if (leaderBot && leaderBot.botId === this.botId) {
                            await leaderBot.sendMessage(leaderBot.sock.user?.id, 
                                `[${this.botName}] ❌ *GROUP JOIN FAILED*\n\n` +
                                `🔗 *Link:* ${groupLink}\n` +
                                `🤖 *Bot:* ${this.botName}\n` +
                                `❌ *Error:* ${joinError.message}\n` +
                                `⚠️ *Possible reasons:*\n` +
                                `• Invalid or expired invite link\n` +
                                `• Group is full\n` +
                                `• Bot is banned from group\n` +
                                `• Network issue`
                            );
                        }
                    }
                }
            }
            // NEW: leave_group command
            else if (commandType === 'leave_group') {
                const { groupJid } = data;
                
                try {
                    consolex.group(`${SYMBOLS.EXIT} Attempting to leave group: ${groupJid}`);
                    
                    // Check if bot is in the group
                    const groupMetadata = await this.sock.groupMetadata(groupJid).catch(() => null);
                    
                    if (groupMetadata) {
                        // Leave the group
                        await this.sock.groupLeave(groupJid);
                        
                        consolex.success(`${SYMBOLS.SUCCESS} Successfully left group: ${groupJid}`);
                        
                        if (sendConfirmation) {
                            const leaderBot = this.botManager.commandBus.getLeaderBot();
                            if (leaderBot && leaderBot.botId === this.botId) {
                                await leaderBot.sendMessage(leaderBot.sock.user?.id, 
                                    `[${this.botName}] ✅ *GROUP LEAVE SUCCESS*\n\n` +
                                    `🗑️ *Group:* ${groupJid}\n` +
                                    `🤖 *Bot:* ${this.botName}\n` +
                                    `✅ *Status:* Successfully left the group\n` +
                                    `⏰ *Time:* ${new Date().toLocaleTimeString()}\n\n` +
                                    `👥 All bots have been removed from the group`
                                );
                            }
                        }
                    } else {
                        consolex.warning(`${SYMBOLS.WARNING} Bot is not in group: ${groupJid}`);
                    }
                } catch (leaveError) {
                    consolex.error(`${SYMBOLS.ERROR} Group leave error: ${leaveError.message}`);
                    
                    if (sendConfirmation) {
                        const leaderBot = this.botManager.commandBus.getLeaderBot();
                        if (leaderBot && leaderBot.botId === this.botId) {
                            await leaderBot.sendMessage(leaderBot.sock.user?.id, 
                                `[${this.botName}] ❌ *GROUP LEAVE FAILED*\n\n` +
                                `🗑️ *Group:* ${groupJid}\n` +
                                `🤖 *Bot:* ${this.botName}\n` +
                                `❌ *Error:* ${leaveError.message}\n` +
                                `⚠️ *Possible reasons:*\n` +
                                `• Bot is not in the group\n` +
                                `• Permission issue\n` +
                                `• Network problem`
                            );
                        }
                    }
                }
            }
        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR} Command execution error: ${err.message}`);
        }
    }

    async sendMessage(jid, content, options = {}) {
        try {
            const message = typeof content === 'string' ? { text: content } : content;
            const sentMsg = await this.sock.sendMessage(jid, message, options);
            return sentMsg;
        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR} Send message error: ${err.message}`);
            return null;
        }
    }
}

class BotManager {
    constructor() {
        this.commandBus = new CommandBus();
        this.botCounter = 0;
        this.maxBots = MAX_BOTS;
        this.init();
    }

    init() {
        displayOwnership();
        consolex.system(`${SYMBOLS.SERVER} ${SYSTEM_BRAND} Ultra v${VERSION} Initialized`);
        consolex.system(`${SYMBOLS.CROWN} Owner: ${SYSTEM_OWNER}`);
        consolex.system(`${SYMBOLS.CALENDAR} Copyright ${COPYRIGHT_YEAR}`);
        consolex.system(`${SYMBOLS.INFO} Maximum Bots: ${MAX_BOTS} | NC Threads: ${NC_THREADS}`);
        console.log('\n');
        
        // Display saved sessions
        this.displaySavedSessions();
        
        // Start interactive setup
        this.startInteractive();
    }
    
    displaySavedSessions() {
        const sessionKeys = Object.keys(savedSessions);
        if (sessionKeys.length > 0) {
            consolex.header(`${SYMBOLS.FOLDER} SAVED SESSIONS FOUND ${SYMBOLS.FOLDER}`, "", 70);
            
            const content = [
                `${SYMBOLS.INFO} *SAVED BOT SESSIONS:*`,
                ``
            ];
            
            sessionKeys.forEach((botId, index) => {
                const session = savedSessions[botId];
                content.push(`${index + 1}. ${session.botName || `BOT${index + 1}`}`);
                content.push(`   📱 Phone: ${session.phoneNumber}`);
                content.push(`   📁 Folder: ${session.authPath}`);
                content.push(`   📅 Registered: ${new Date(session.registeredAt).toLocaleDateString()}`);
                content.push(``);
            });
            
            content.push(`${SYMBOLS.WARNING} *AUTO-CONNECTING SAVED SESSIONS...*`);
            
            consolex.border.box(`${SYMBOLS.GEAR} SAVED SESSIONS`, content, 68);
            console.log('\n');
            
            // Auto-connect saved sessions
            this.autoConnectSavedSessions();
        } else {
            consolex.header(`${SYMBOLS.PHONE} INITIAL BOT SETUP REQUIRED ${SYMBOLS.PHONE}`, "", 70);
            
            const content = [
                `${SYMBOLS.INFO} *HOW TO ADD BOTS:*`,
                `1. System will ask for phone numbers`,
                `2. Enter phone with country code (e.g., 91XXXXXXXXXX)`,
                `3. Bot will generate WhatsApp pairing code`,
                `4. Open WhatsApp > Linked Devices > Link a Device`,
                `5. Enter the pairing code shown in terminal`,
                `6. Bot will connect automatically`,
                ``,
                `${SYMBOLS.WARNING} *IMPORTANT:*`,
                `• You can connect up to ${MAX_BOTS} bots`,
                `• Each bot will be named BOT1, BOT2, etc.`,
                `• Use /x1 to /x4 commands to control bot count`,
                `• Sessions are saved automatically`,
                ``,
                `${SYMBOLS.SUCCESS} *X-BOT By - @qrixce ;)*`
            ];
            
            consolex.border.box(`${SYMBOLS.GEAR} SETUP INSTRUCTIONS`, content, 68);
            console.log('\n');
        }
    }
    
    autoConnectSavedSessions() {
        const sessionKeys = Object.keys(savedSessions);
        let connectedCount = 0;
        
        sessionKeys.forEach((botId, index) => {
            const session = savedSessions[botId];
            
            // Check if bot is already connected
            const existingBot = this.commandBus.getConnectedBots().find(b => b.botId === botId);
            if (!existingBot) {
                const botName = session.botName || `BOT${index + 1}`;
                consolex.info(`${SYMBOLS.INFO} Auto-connecting ${botName}...`);
                
                const botSession = new BotSession(botId, session.phoneNumber, this, null, botName);
                this.commandBus.registerBot(botId, botSession);
                botSession.connect();
                connectedCount++;
            }
        });
        
        if (connectedCount > 0) {
            consolex.success(`${SYMBOLS.SUCCESS} Auto-connected ${connectedCount} saved sessions`);
        }
        
        // Ask if user wants to add more bots
        setTimeout(() => {
            this.askForMoreBots();
        }, 3000);
    }
    
    async askForMoreBots() {
        const connectedBots = this.commandBus.getConnectedBots();
        const totalBots = this.commandBus.getAllBots().length;
        
        if (totalBots >= MAX_BOTS) {
            consolex.info(`${SYMBOLS.INFO} Maximum of ${MAX_BOTS} bots already connected.`);
            return;
        }
        
        const remainingSlots = MAX_BOTS - totalBots;
        
        console.log('\n');
        consolex.header(`${SYMBOLS.BOT} BOT STATUS ${SYMBOLS.BOT}`, `Connected: ${connectedBots.length}/${totalBots} | Available slots: ${remainingSlots}`, 70);
        
        const answer = await question(`${SYMBOLS.PHONE.cyan} Do you want to add more bots? (y/n): `.cyan);
        
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            this.startInteractive();
        } else {
            consolex.success(`${SYMBOLS.SUCCESS} Bot setup completed. Use /x1 to /x4 commands to control bot activation.`);
        }
    }

    async startInteractive() {
        const totalBots = this.commandBus.getAllBots().length;
        
        if (totalBots >= MAX_BOTS) {
            consolex.error(`${SYMBOLS.ERROR} Maximum of ${MAX_BOTS} bots already reached.`);
            return;
        }
        
        const remainingSlots = MAX_BOTS - totalBots;
        const botNumber = totalBots + 1;
        const botName = `BOT${botNumber}`;
        
        try {
            console.log('\n');
            consolex.header(`${SYMBOLS.PHONE} ADDING BOT ${botNumber}/${MAX_BOTS} ${SYMBOLS.PHONE}`, `Bot Name: ${botName}`, 70);
            
            const answer = await question(`${SYMBOLS.PHONE.cyan} Enter phone number for ${botName} (with country code): `.cyan);
            const phoneNumber = answer.trim();
            
            if (!phoneNumber || phoneNumber.length < 10) {
                consolex.error(`${SYMBOLS.ERROR} Invalid phone number. Must be at least 10 digits.`);
                this.startInteractive();
                return;
            }
            
            const botId = `bot_${Date.now()}_${botNumber}`;
            consolex.info(`${SYMBOLS.INFO} Creating ${botName}: ${botId} for ${phoneNumber}`);
            
            const botSession = new BotSession(botId, phoneNumber, this, null, botName);
            this.commandBus.registerBot(botId, botSession);
            botSession.connect();
            
            consolex.success(`${SYMBOLS.SUCCESS} ${botName} initialization started. Check for pairing code above.`);
            
            // Ask for next bot after delay
            setTimeout(() => {
                this.askForMoreBots();
            }, 5000);
            
        } catch (err) {
            consolex.error(`${SYMBOLS.ERROR} Interactive setup error: ${err.message}`);
            this.startInteractive();
        }
    }

    async addBot(phoneNumber, requestingJid = null) {
        const totalBots = this.commandBus.getAllBots().length;
        
        if (totalBots >= this.maxBots) {
            return `[SYSTEM] ❌ *MAXIMUM BOT LIMIT REACHED*\n\n` +
                   `📏 Maximum allowed: ${this.maxBots} bots\n` +
                   `📊 Current count: ${totalBots}\n` +
                   `⚠️ Remove some bots before adding more.`;
        }

        const botNumber = totalBots + 1;
        const botName = `BOT${botNumber}`;
        const botId = `bot_${++this.botCounter}_${Date.now()}`;
        
        consolex.bot(`${SYMBOLS.PLUS} Adding new bot: ${botName} (${botId}) for ${phoneNumber}`, botId);
        
        const botSession = new BotSession(botId, phoneNumber, this, requestingJid, botName);
        this.commandBus.registerBot(botId, botSession);
        botSession.connect();
        
        return `[SYSTEM] ✅ *NEW BOT ADDED*\n\n` +
               `🤖 *Bot Name:* ${botName}\n` +
               `📱 *Phone:* ${phoneNumber}\n` +
               `🔗 *Status:* Initializing connection\n` +
               `📁 *Auth folder:* auth/${botId}\n` +
               `⏰ *Wait for pairing code...*\n\n` +
               `📲 *Pairing Instructions:*\n` +
               `1. Wait for pairing code (will be sent via WhatsApp)\n` +
               `2. Open WhatsApp > Linked Devices > Link a Device\n` +
               `3. Enter the pairing code\n` +
               `4. Bot will connect automatically\n\n` +
               `🎯 *Use /x1 to /x4 to control active bots*`;
    }

    removeBot(botId) {
        const bot = this.commandBus.botSessions.get(botId);
        if (bot) {
            // GRACEFUL cleanup
            bot.emergencyRecovery();
            
            // Clear all threads and stop commands
            setTimeout(() => {
                bot.activeThreads.clear();
                bot.stopCommands.clear();
                bot.activeNameChanges.clear();
                bot.activeSlides.clear();
                bot.activeTxtSenders.clear();
                bot.activeVNSenders.clear();
                bot.activePicSenders.clear();
                
                // Clear beat attacks
                Object.keys(bot.beatingGroups).forEach(key => {
                    bot.beatingGroups[key] = false;
                });
                
                Object.keys(bot.beatIntervals).forEach(key => {
                    if (bot.beatIntervals[key]) {
                        clearInterval(bot.beatIntervals[key]);
                    }
                });
                
                bot.beatIntervals = {};
                bot.beatingTargets = {};
                bot.stopFlags.clear();
                
                // Unregister from command bus
                this.commandBus.unregisterBot(botId);
                
                consolex.bot(`${SYMBOLS.MINUS} Bot removed: ${bot.botName}`, botId);
            }, 2000); // Delay cleanup
        }
    }

    async cleanupAll() {
        consolex.warning(`${SYMBOLS.WARNING} Performing system-wide cleanup...`);
        
        // Stop all parallel attacks
        const stopped = parallelSystem.emergencyStopAll();
        consolex.info(`${SYMBOLS.INFO} Stopped ${stopped} parallel attacks`);
        
        // Clear global thread registry
        ACTIVE_THREADS.clear();
        
        // Clear all stop signals
        stopSystem.emergencyStopAll();
        
        // Gracefully cleanup all bots
        this.commandBus.getAllBots().forEach(bot => {
            bot.emergencyRecovery();
        });
        
        // Force garbage collection if available
        if (global.gc) {
            consolex.info(`${SYMBOLS.REFRESH} Forcing garbage collection...`);
            global.gc();
        }
        
        consolex.success(`${SYMBOLS.SUCCESS} System cleanup completed`);
    }
}

// Initialize bot manager
const botManager = new BotManager();

// Graceful shutdown handler
process.on('SIGINT', async () => {
    console.log('\n');
    consolex.header(`${SYMBOLS.STOP} GRACEFUL SHUTDOWN ${SYMBOLS.STOP}`, "Saving sessions and cleaning up...", 70);
    
    // Save sessions
    saveSessions(savedSessions);
    
    // Cleanup
    await botManager.cleanupAll();
    
    console.log('\n');
    consolex.success(`${SYMBOLS.SUCCESS} All sessions saved. Goodbye!`);
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    consolex.error(`${SYMBOLS.ERROR} Uncaught Exception: ${err.message}`);
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    consolex.error(`${SYMBOLS.ERROR} Unhandled Rejection at: ${promise}`);
    console.error('Reason:', reason);
});