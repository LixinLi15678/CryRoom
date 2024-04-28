var firebaseConfig = {
    apiKey: "AIzaSyCF6KsAQiz8kSD-XV8tFbIv0Zy7fbgIo2I",
    authDomain: "cryroom-e063f.firebaseapp.com",
    projectId: "cryroom-e063f",
    storageBucket: "cryroom-e063f.appspot.com",
    messagingSenderId: "1077524899177",
    appId: "1:1077524899177:web:fec699a01494574df9c9f8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References to the database for messages and online user count
var messagesRef = firebase.database().ref('messages');
var onlineUsersRef = firebase.database().ref('onlineUsers');

// Track each user's presence
var currentUserRef; 
firebase.database().ref('.info/connected').on('value', function(snapshot) {
    if (snapshot.val() && !currentUserRef) {
        currentUserRef = onlineUsersRef.push(true); // Add user to the list of online users
        currentUserRef.onDisconnect().remove(); // Remove them when they disconnect
    }
});

// Function to display messages with random styles
function displayMessage(text, style) {
    var messagesContainer = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.textContent = text;
    if (style) {
        messageElement.style.fontFamily = style.font;
        messageElement.style.fontSize = style.size;
        messageElement.style.color = style.color;
    }
    messagesContainer.appendChild(messageElement);
}

// Listen for new messages
messagesRef.on('child_added', function(snapshot) {
    var messageData = snapshot.val();
    displayMessage(messageData.text, messageData.style);
});

// Update online user count
onlineUsersRef.on('value', function(snapshot) {
    var userCountDisplay = document.getElementById('user_count');
    userCountDisplay.textContent = 'Online Users: ' + snapshot.numChildren();
});

function sendMessage() {
    var input = document.getElementById('message_input');
    var message = input.value.trim();
    if (message) {
        message = filterMessage(message);
        messagesRef.push({
            text: message,
            style: getRandomStyle(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        if (message.toLowerCase() === "brad mcdanel" || message.toLowerCase() === "brad" || message.toLowerCase() === "mcdanel"
            || message.toLowerCase() === "professor mcdanel" || message.toLowerCase() === "prof mcdanel"|| message.toLowerCase() === "novak"|| message.toLowerCase() === "ed novak"){
            triggerSpecialAnimation();
        }

        input.value = '';
    }
}

const bannedWords = ['2g1c', '2 girls 1 cup', 'acrotomophilia', 'alabama hot pocket', 'alaskan pipeline', 'anal', 'anilingus', 'anus', 'apeshit', 'arsehole', 'ass', 'asshole', 'assmunch', 'auto erotic', 'autoerotic', 'babeland', 'baby batter', 'baby juice', 'ball gag', 'ball gravy', 'ball kicking', 'ball licking', 'ball sack', 'ball sucking', 'bangbros', 'bangbus', 'bareback', 'barely legal', 'barenaked', 'bastard', 'bastardo', 'bastinado', 'bbw', 'bdsm', 'beaner', 'beaners', 'beaver cleaver', 'beaver lips', 'beastiality', 'bestiality', 'big black', 'big breasts', 'big knockers', 'big tits', 'bimbos', 'birdlock', 'bitch', 'bitches', 'black cock', 'blonde action', 'blonde on blonde action', 'blowjob', 'blow job', 'blow your load', 'blue waffle', 'blumpkin', 'bollocks', 'bondage', 'boner', 'boob', 'boobs', 'booty call', 'brown showers', 'brunette action', 'bukkake', 'bulldyke', 'bullet vibe', 'bullshit', 'bung hole', 'bunghole', 'busty', 'butt', 'buttcheeks', 'butthole', 'camel toe', 'camgirl', 'camslut', 'camwhore', 'carpet muncher', 'carpetmuncher', 'chocolate rosebuds', 'cialis', 'circlejerk', 'cleveland steamer', 'clit', 'clitoris', 'clover clamps', 'clusterfuck', 'cock', 'cocks', 'coprolagnia', 'coprophilia', 'cornhole', 'coon', 'coons', 'creampie', 'cum', 'cumming', 'cumshot', 'cumshots', 'cunnilingus', 'cunt', 'darkie', 'date rape', 'daterape', 'deep throat', 'deepthroat', 'dendrophilia', 'dick', 'dildo', 'dingleberry', 'dingleberries', 'dirty pillows', 'dirty sanchez', 'doggie style', 'doggiestyle', 'doggy style', 'doggystyle', 'dog style', 'dolcett', 'domination', 'dominatrix', 'dommes', 'donkey punch', 'double dong', 'double penetration', 'dp action', 'dry hump', 'dvda', 'eat my ass', 'ecchi', 'ejaculation', 'erotic', 'erotism', 'escort', 'eunuch', 'fag', 'faggot', 'fecal', 'felch', 'fellatio', 'feltch', 'female squirting', 'femdom', 'figging', 'fingerbang', 'fingering', 'fisting', 'foot fetish', 'footjob', 'frotting', 'fuck', 'fuck buttons', 'fuckin', 'fucking', 'fucktards', 'fudge packer', 'fudgepacker', 'futanari', 'gangbang', 'gang bang', 'gay sex', 'genitals', 'giant cock', 'girl on', 'girl on top', 'girls gone wild', 'goatcx', 'goatse', 'god damn', 'gokkun', 'golden shower', 'goodpoop', 'goo girl', 'goregasm', 'grope', 'group sex', 'g-spot', 'guro', 'hand job', 'handjob', 'hard core', 'hardcore', 'hentai', 'homoerotic', 'honkey', 'hooker', 'horny', 'hot carl', 'hot chick', 'how to kill', 'how to murder', 'huge fat', 'humping', 'incest', 'intercourse', 'jack off', 'jail bait', 'jailbait', 'jelly donut', 'jerk off', 'jigaboo', 'jiggaboo', 'jiggerboo', 'jizz', 'juggs', 'kike', 'kinbaku', 'kinkster', 'kinky', 'knobbing', 'leather restraint', 'leather straight jacket', 'lemon party', 'livesex', 'lolita', 'lovemaking', 'make me come', 'male squirting', 'masturbate', 'masturbating', 'masturbation', 'menage a trois', 'milf', 'missionary position', 'mong', 'motherfucker', 'mound of venus', 'mr hands', 'muff diver', 'muffdiving', 'nambla', 'nawashi', 'negro', 'neonazi', 'nigga', 'nigger', 'nig nog', 'nimphomania', 'nipple', 'nipples', 'nsfw', 'nsfw images', 'nude', 'nudity', 'nutten', 'nympho', 'nymphomania', 'octopussy', 'omorashi', 'one cup two girls', 'one guy one jar', 'orgasm', 'orgy', 'paedophile', 'paki', 'panties', 'panty', 'pedobear', 'pedophile', 'pegging', 'penis', 'phone sex', 'piece of shit', 'pikey', 'pissing', 'piss pig', 'pisspig', 'playboy', 'pleasure chest', 'pole smoker', 'ponyplay', 'poof', 'poon', 'poontang', 'punany', 'poop chute', 'poopchute', 'porn', 'porno', 'pornography', 'prince albert piercing', 'pthc', 'pubes', 'pussy', 'queaf', 'queef', 'quim', 'raghead', 'raging boner', 'rape', 'raping', 'rapist', 'rectum', 'reverse cowgirl', 'rimjob', 'rimming', 'rosy palm', 'rosy palm and her 5 sisters', 'rusty trombone', 'sadism', 'santorum', 'scat', 'schlong', 'scissoring', 'semen', 'sex', 'sexcam', 'sexo', 'sexy', 'sexual', 'sexually', 'sexuality', 'shaved beaver', 'shaved pussy', 'shemale', 'shibari', 'shit', 'shitblimp', 'shitty', 'shota', 'shrimping', 'skeet', 'slanteye', 'slut', 's&m', 'smut', 'snatch', 'snowballing', 'sodomize', 'sodomy', 'spastic', 'spic', 'splooge', 'splooge moose', 'spooge', 'spread legs', 'spunk', 'strap on', 'strapon', 'strappado', 'strip club', 'style doggy', 'suck', 'sucks', 'suicide girls', 'sultry women', 'swastika', 'swinger', 'tainted love', 'taste my', 'tea bagging', 'threesome', 'throating', 'thumbzilla', 'tied up', 'tight white', 'tit', 'tits', 'titties', 'titty', 'tongue in a', 'topless', 'tosser', 'towelhead', 'tranny', 'tribadism', 'tub girl', 'tubgirl', 'tushy', 'twat', 'twink', 'twinkie', 'two girls one cup', 'undressing', 'upskirt', 'urethra play', 'urophilia', 'vagina', 'venus mound', 'viagra', 'vibrator', 'violet wand', 'vorarephilia', 'voyeur', 'voyeurweb', 'voyuer', 'vulva', 'wank', 'wetback', 'wet dream', 'white power', 'whore', 'worldsex', 'wrapping men', 'wrinkled starfish', 'xx', 'xxx', 'yaoi', 'yellow showers', 'yiffy', 'zoophilia', '🖕', 'faggot', 'skank'];

function filterMessage(message) {
    let filteredMessage = message.toLowerCase(); // Convert to lower case to ensure case-insensitive matching

    bannedWords.forEach(word => {
        const regExp = new RegExp(word, "gi"); // "g" for global, "i" for case insensitive
        filteredMessage = filteredMessage.replace(regExp, "*".repeat(word.length)); // Replace with asterisks
    });

    return filteredMessage;
}

// Generate random style properties
function getRandomStyle() {
    const fonts = ['Arial', 'Verdana', 'Courier New', 'Georgia', 'Times New Roman', 'Comic Sans MS'];
    const sizes = ['16px', '18px', '20px', '22px', '24px', '26px'];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#8B0000', '#000080'];
    return {
        font: fonts[Math.floor(Math.random() * fonts.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}

// Send message when enter key is pressed
document.getElementById('message_input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { // Enter key
        event.preventDefault();
        sendMessage();
    }
});

// Cry button functionality
function cry() {
    var cryButton = document.getElementById('cry_button');
    if (!cryButton.disabled) {
        messagesRef.push({
            text: "😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭",
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        animateCryingEmoji(); // Create the crying emoji animation
        cryButton.disabled = true;
        setTimeout(function() {
            cryButton.disabled = false;
        }, 5000); 
    }
}

function animateCryingEmoji() {
    var body = document.body;
    var emojiCount = 60; 

    for (let i = 0; i < emojiCount; i++) {
        var emoji = document.createElement('div');
        emoji.textContent = '😭'; 
        emoji.className = 'cryingEmoji';
        emoji.style.left = (Math.random() * (window.innerWidth - 50)) + 'px'; // Random horizontal position
        emoji.style.top = (Math.random() * (window.innerHeight - 50)) + 'px'; // Random vertical position

        body.appendChild(emoji);

        // Remove the emoji after the animation ends
        setTimeout(() => {
            if (body.contains(emoji)) {
                body.removeChild(emoji);
            }
        }, 4000); 
    }
}

function triggerSpecialAnimation() {
    const animationContainer = document.createElement('div');
    animationContainer.id = 'special-animation';
    animationContainer.innerHTML = `<div class="hearts"></div><div class="flash-message">Best Professor</div>`;

    document.body.appendChild(animationContainer);

    const heartsContainer = animationContainer.querySelector('.hearts');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️'; 
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heartsContainer.appendChild(heart);
    }

    const flashMessage = animationContainer.querySelector('.flash-message');
    flashMessage.style.opacity = 1; 

    setTimeout(() => {
        document.body.removeChild(animationContainer);
    }, 4000);
}