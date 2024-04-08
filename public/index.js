const socket = io('ws://localhost:3000');

socket.on('connect', () => {
    console.log("connected", socket.id);
})

socket.on("gameState", (data) => {
    // Update your UI based on the initial game state
    updateUI(data);
});

socket.on("updatedTestArray", (data) => {
    console.log("Updated test array:", data);
    // Handle the updated array as needed
    // For example, you might want to update your UI or perform other actions
});

let choosingSpot = false;

var player1 = {
    name: "player1", 
    health: 100,
    role: false
};

var player2 = { 
    name: "player2",
    health: 100,
    role: false
};

var allCards = [];

var card = {
    name: "",
    attack: 0,
    health: 0,
    img: "",
    rank: 1,
    desc: "null",
    currentHealth: null,
    trait: "null"
};

var tinyKnight = Object.assign({}, card, {
    name: "Tiny Knight",
    attack: 1,
    health: 2,
    img: "card-images/lilknight.jpg",
    rank: 1,
    desc: 'null',
    currentHealth: 2
});

var superNinja = Object.assign({}, card, {
    name: "Super Ninja",
    attack: 2,
    health: 1,
    img: "card-images/4_WEAPON_NINJA.png",
    rank: 0,
    desc: "null",
    currentHealth: 1
});

var demonEyeball = Object.assign({}, card, {
    name: "Demon Eyeball",
    attack: 0,
    health: 3,
    img: "card-images/eyeball.jpg",
    rank: 0,
    desc: "null",
    currentHealth: 3
});

var sword = Object.assign({}, card, {
    name: "Sword",
    img: "card-images/REALSWORD1.png",
    rank: 0,
    desc: "Equip to any character: Increase its attack by 1."
})

var kenonoForceOfBear = Object.assign({}, card, {
    name: "Kenono, Force of Bear",
    attack: 7,
    health: 5,
    img: "card-images/Kenono_Force_Of_Bear.png",
    rank: 2,
    trait: "TROOP",
    desc: "Whenever this card is in a Attack: Decrease the Attack of the Enemy card in battle with this card by 1 for EACH ANIMAL troop on your side of the field for the rest of this turn."
})

var alchemApprentice = Object.assign({}, card, {
    name: "Alchem Apprentice",
    attack: 2,
    health: 4,
    img: "card-images/Alchem_Apprentice.png",
    rank: 1,
    trait: "TROOP",
    desc: "Once per turn, target an Enemy troop: Add 1 Poison token to it. At the end of your turn, inflict damage to all Enemy cards with Poison tokens equal to the total number of Poison tokens on that card."
})

var gardenDweller = Object.assign({}, card, {
    name: "Garden Dweller",
    attack: 2,
    health: 3,
    img: "card-images/Garden_Dweller.png",
    rank: 1,
    desc: "Increase this card's attack and health by 1 for each PLANT card on your side of the field.",
    trait: ["PLANT", "TROOP"],
    defaultHP: 3,
    defaultATK: 2
})

var oneWithNature = Object.assign({}, card, {
    name: "One With Nature",
    img: "card-images/One_With_Nature.png",
    rank: 0,
    desc: "Target any card on the field: Increase its Health by 2. If the target card is a PLANT card, increase its Attack by 2 as well.",
    trait: ["PLANT", "SPELL"]
})

var deathIsNotTheEnd = Object.assign({}, card, {
    name: '"Death Is Not The End"',
    img: "card-images/Death_Is_Not_The_End.png",
    rank: 0,
    desc: "Choose a troop on your field: EQUIP this card to it. If the troop this is EQUIPPED to is defeated by an Attack, return the EQUIPPED troop to your hand."
})

var kanGrandWatcherOfPeace = Object.assign({}, card, {
    name: "Kan, Grand Watcher of Peace",
    attack: 3,
    health: 6,
    img: "card-images/Kan_Grand_Watcher_Of_Peace.png",
    rank: 2,
    trait: "TROOP",
    desc: "Whenever a friendly Troop is in a Attack, temporarily increase its Health by 4 for that Attack only."
})

var visitFromTheMajestic = Object.assign({}, card, {
    name: "Visit From The Majestic",
    img: "card-images/Visit_From_The_Majestic.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. Whenever a friendly troop is destroyed, add 1 token to this card. You may remove 3 tokens from this card: Search your deck for a card, place it on top of your deck, then destroy this card."
    
})

var bejeweledCollectorsKunai = Object.assign({}, card, {
    name: "Bejeweled Collector's Kunai",
    img: "card-images/Bejeweled_Collectors_Kunai.png",
    rank: 0,
    desc: "EQUIP this card to a troop on your field. Whenever the troop this is EQUIPPED to defeats an Enemy troop, place 1 token on this card. You may remove 3 tokens placed on this card: Select a card from your deck, and add it to your hand."
})

var tricksterNibbler = Object.assign({}, card, {
    name: "Trickster Nibbler",
    attack: 1,
    health: 1,
    img: "card-images/Survival_Instincts.png",
    rank: 0,
    desc: "On Summon: You may target a friendly PLANT troop: Destroy it, give this card 3 Attack and 3 Health.",
    trait: ["PLANT", "TROOP"]
})

var antoniPrideFang = Object.assign({}, card, {
    name: "Antoni, Pride Fang",
    attack: 3,
    health: 5,
    img: "card-images/Antoni_Pride_Fang.png",
    rank: 2,
    trait: "TROOP",
    desc: "Whenever you summon a ANIMAL troop, increase this card's Attack and Health by 1."
})

var renarkStrengthOfTheProtector = Object.assign({}, card, {
    name: "Renark, Strength of the Protector",
    attack: 1,
    health: 6,
    img: "card-images/Renark_Strength_Of_The_Protector.png",
    rank: 1,
    trait: "TROOP",
    desc: "Your other friendly ANIMAL troops (except this card) cannot be targeted by Enemy troops for Attacks while this card is on the field."

})

var wutonkCourageBorn = Object.assign({}, card, {
    name: "Wutonk, Courage Born",
    attack: 2,
    health: 2,
    img: "card-images/Wutonk_Courage_Born.png",
    rank: 0,
    trait: "TROOP",
    desc: "On Summon: You may target a friendly ANIMAL troop except this card: Increase its Attack and Health by 1."
})

var pawnOfEvil = Object.assign({}, card, {
    name: "Pawn of Evil",
    attack: 3,
    health: 1,
    img: "card-images/Pawn_Of_Evil.png",
    rank: 0,
    trait: "TROOP",
    desc: "If this troop is sent to the graveyard for the summoning of a EVIL troop, return it to your hand."
})

var evilDoesntSleep = Object.assign({}, card, {
    name: "Evil Doesn't Sleep",
    img: "card-images/Evil_Doesnt_Sleep.png",
    rank: 0,
    desc: "Target a friendly troop: Return it to your hand, and draw a card. If the friendly troop selected was a EVIL card, draw 2 cards instead."
})

var sirMoti = Object.assign({}, card, {
    name: "Sir Moti",
    attack: 3,
    health: 4,
    img: "card-images/Sir_Moti.png",
    rank: 1,
    trait: "TROOP",
    desc: "Once per turn: You may target any other friendly troop other than this card, heal it by 2. If the friendly troop selected was already at full health, increase its Attack by 2 instead."
})

var companionOfEvil = Object.assign({}, card, {
    name: "Companion of Evil",
    attack: 4,
    health: 4,
    img: "card-images/Companion_Of_Evil.png",
    rank: 1,
    trait: "TROOP",
    desc: "If you have another EVIL troop on your field, increase this card's Attack by 1 and Health by 2."
})

var fauvGiyuo = Object.assign({}, card, {
    name: "Fauv & Giyuo",
    attack: 5,
    health: 5,
    img: "card-images/Fauv_&_Giyuo.png",
    rank: 2,
    trait: "TROOP",
    desc: "Whenever this card destroys an Enemy troop in a Attack, you may choose one of two effects: 1. Draw a card. 2. Target a friendly troop, increase its Attack and Health by 2."
})

var motherTelona = Object.assign({}, card, {
    
    name: "Mother Telona",
    attack: 3,
    health: 6,
    img: "card-images/Mother_Telona.png",
    rank: 2,
    trait: "TROOP",
    desc: "Grant +2 Attack and +2 Health to all friendly troops on the field. Decrease all Enemy troop's Attack and Health by 1."
})

var cosmicFlock = Object.assign({}, card, {
    name: "Cosmic Flock",
    img: "card-images/Cosmic_Flock.png",
    rank: 0,
    desc: "If you have 3 or more troops on your field, destroy all cards in your enemy's Backrow."
})

var planetHunter = Object.assign({}, card, {
    name: "Planet Hunter",
    attack: 3,
    health: 2,
    img: "card-images/Planet_Hunter.png",
    rank: 0,
    trait: "TROOP",
    desc: "When this card is destroyed in an Attack, draw 1 card."
})

var rescueTeam26TheDirtRollers = Object.assign({}, card, {
    name: "Rescue Team 26: The DirtRollers",
    attack: 2,
    health: 2,
    img: "card-images/Rescue_Team_26_The_DirtRollers.png",
    rank: 3,
    trait: "TROOP",
    desc: "On Summon: Summon 2 RANK 1 copies of this card."
})

var rescueTeam14TheLlamageddon = Object.assign({}, card, {
    name: "Rescue Team 14: The Llamageddon",
    attack: 4,
    health: 4,
    img: "card-images/Rescue_Team_14_The_Llamanators.png",
    rank: 2,
    trait: "TROOP",
    desc: "On Summon: Target any Enemy, deal 6 damage to it."
})

var Melani = Object.assign({}, card, {
    name: "Melani",
    attack: 2,
    health: 3,
    img: "card-images/Melani.png",
    rank: 1,
    trait: "TROOP",
    desc: "On Summon: You may target a troop in your hand. Grant it +2 Attack and +2 Health."
})

var melanisPromise = Object.assign({}, card, {
    name: "Melani's Promise",
    img: "card-images/Melanis_Promise.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. At the end of your turn: Target a friendly troop, and restore its health by 3."
})

var melanisStudent = Object.assign({}, card, {
    name: "Melani's Student",
    attack: 1,
    health: 3,
    img: "card-images/Melanis_Student.png",
    rank: 0,
    trait: "TROOP",
    desc: "Whenever you summon a troop, grant it +2 Health."
})

var pyroJuggler = Object.assign({}, card, {
    name: "Pyro Juggler",
    attack: 3,
    health: 3,
    img: "card-images/PyroJuggler.png",
    rank: 1,
    desc: "Deal damage equal to the total number of PYRO troops on your field to any Enemy. You may use this ability twice per turn."
})

var pyroMagician = Object.assign({}, card, {
    name: "Pyro Magician",
    attack: 1,
    health: 2,
    img: "card-images/Pyro_Magician.png",
    rank: 0,
    trait: "TROOP",
    desc: "On Summon: Draw a random spell from your deck. If the drawn spell is a PYRO spell, increase this card's Attack by 2."
})

var pyroEvilWield = Object.assign({}, card, {
    name: "Pyro EvilWield",
    attack: 4,
    health: 2,
    img: "card-images/Pyro_EvilWield.png",
    rank: 1,
    trait: "TROOP",
    desc: "Once per turn: Target an Enemy troop, deal 4 damage to it. At the end of your turn, choose one of 2 effects: 1. Deal 4 damage to the player controlling this card. 2. Destroy this card."
})

var alchemKidRogue = Object.assign({}, card, {
    name: "Alchem KidRogue",
    attack: 3,
    health: 3,
    img: "card-images/Alchem_KidRogue.png",
    rank: 0,
    trait: "TROOP",
    desc: "Whenever this card has attacked an Enemy troop: Place a Poison token on the attacked troop. At the end of your turn, deal 1 damage to each Enemy troop with at least 1 Poison token on it."
})

var alchemTrustTheToxin = Object.assign({}, card, {
    name: 'Alchem: "Trust The Toxin"',
    img: "card-images/Alchem_Trust_The_Toxin.png",
    rank: 0,
    desc: "Double the total count of all Poison tokens on all Enemy troops on the field."
})

var storedPower = Object.assign({}, card, {
    name: "Stored Power",
    img: "card-images/Stored_Power.png",
    rank: 0,
    desc: "Send a card from your hand to your graveyard: Target a friendly Troop on your field, increase it's Attack by 3."
})

var gemnaDragon = Object.assign({}, card, {
    name: "Gemna Dragon",
    attack: 7,
    health: 7,
    img: "card-images/Gemna_Dragon.png",
    rank: 2,
    trait: ["DRAGON", "TROOP"],
    desc: "On Summon: Draw a random DRAGON card from your deck."
})

var drakingKnight = Object.assign({}, card, {
    name: "Draking Knight",
    attack: 5,
    health: 5,
    img: "card-images/Draking_Knight.png",
    rank: 1,
    trait: "TROOP",
    desc: ""
})

var venerableBeastMan = Object.assign({}, card, {
    name: "Venerable BeastMan",
    attack: 3,
    health: 5,
    img: "card-images/BeastMan.png",
    rank: 1,
    trait: "TROOP",
    desc: "Whenever a friendly ANIMAL card is sent to the graveyard: Increase this card's Attack and Health by 1."

})

var rescueGeneralZeth = Object.assign({}, card, {
    name: "Rescue General: Zeth",
    attack: 5,
    health: 5,
    img: "card-images/Rescue_General_Zeth.png",
    rank: 2,
    trait: "TROOP",
    desc: "On Summon: Target a RANK 1 or lower card in your graveyard, summon it to your field."
})

var gentleForestGrubber = Object.assign({}, card, {
    name: "Gentle Forest Grubber",
    attack: 2,
    health: 3,
    img: "card-images/Gentle_Forest_Martyr.png",
    rank: 0,
    desc: "This card gains +1 Health for each friendly PLANT card on your field.",
    trait: ["PLANT", "TROOP"]
})

var babyFurphant = Object.assign({}, card, {
    name: "Baby Furphant",
    attack: 3,
    health: 4,
    img: "card-images/Baby_Furphant.png",
    rank: 0,
    trait: "TROOP",
    desc: "BEAST."
})

var babySlime = Object.assign({}, card, {
    name: "Baby Slime",
    attack: 2,
    health: 2,
    img: "card-images/Baby_Slime.png",
    rank: 0,
    trait: "TROOP",
    desc: "If you control another SLIME troop on your field other than this card, increase this card's Attack and Health by 2."
})

var slimeGrubber = Object.assign({}, card, {
    name: "Slime Grubber",
    attack: 3,
    health: 3,
    img: "card-images/Slime_Grubber.png",
    rank: 0,
    trait: "TROOP",
    desc: "On Summon: Choose one of 2 effects: 1. Draw a random SLIME troop from your deck. 2. Draw a random SLIME spell from your deck."
})

var slimeSynthesis = Object.assign({}, card, {
    name: "Slime Synthesis",
    img: "card-images/Slime_Synthesis.png",
    rank: 0,
    desc: "Target a friendly SLIME troop: Grant it's stats to another friendly Troop, then destroy it."
})

var slimeDungeonNightmare = Object.assign({}, card, {
    name: "Slime Dungeon Nightmare",
    attack: 3,
    health: 5,
    img: "card-images/Slime_Dungeon_Nightmare.png",
    rank: 1,
    trait: "TROOP",
    desc: "On Summon: You may target up to 2 Enemy troops, reduce their Attack and Health by half."
})

var terrorMegaSlime = Object.assign({}, card, {
    name: "Terror Mega Slime",
    attack: 4,
    health: 7,
    img: "card-images/Terror_Mega_Slime.png",
    rank: 2,
    trait: "TROOP",
    desc: "On Summon: Grant all friendly SLIME troops on the field +2 Attack."
})

var heavySlimeGuardian = Object.assign({}, card, {
    name: "Heavy Slime Guardian",
    attack: 4,
    health: 6,
    img: "card-images/Heavy_Slime_Guardian.png",
    rank: 1,
    trait: "TROOP",
    desc: "Your other Friendly SLIME troops on the field have +1 Health. Your other Friendly SLIME troops on the field cannot be targeted by Attacks."
})

var maestroArenaChampion = Object.assign({}, card, {
    name: "Maestro Arena Champion",
    attack: 5,
    health: 4,
    img: "card-images/Maestro_Arena_Champion.png",
    rank: 1,
    trait: "TROOP",
    desc: "Whenever this card defeats an Enemy by Attack: Increase this card's Attack and Health by 2."
})

var maestroProdigySword = Object.assign({}, card, {
    name: "Maestro ProdigySword",
    attack: 3,
    health: 2,
    img: "card-images/Maestro_ProdigySword.png",
    rank: 0,
    trait: "TROOP",
    desc: "Whenever this card attacks: Draw 1 card."


})

var bendAlchemBlades = Object.assign({}, card, {
    name: "Bend Alchem Blades",
    attack: 4,
    health: 4,
    img: "card-images/Bend_Poison_Blades.png",
    rank: 1,
    trait: "TROOP",
    desc: "This card gains +1 Attack and +1 Health for each Poison token on the field."
})

var alchemBrew = Object.assign({}, card, {
    name: "Alchem Brew",
    img: "card-images/Alchem_Brew.png",
    rank: 0,
    desc: "Target a Enemy troop: Add 1 Poison token to it. You may use this card's effect up to 2 times."


})

var pureAlchemBrew = Object.assign({}, card, {
    name: "Pure Alchem Brew",
    img: "card-images/Pure_Alchem_Brew.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. Once per turn, you may target an Enemy card with at least 1 Poison token on it: Place a Poison token on it. At the end of your turn: Deal 1 damage to all Enemy cards with at least 1 Poison token on it."
})

var pyroSiege = Object.assign({}, card, {
    name: "Pyro Siege",
    img: "card-images/Pyro_Siege.png",
    rank: 0,
    desc: "Target an Enemy card: If it's a Troop, deal 3 damage to it, and if you control a PYRO troop, you may choose to destroy the Enemy troop instead. If it's a STRUCTURE card, destroy it."
    
})

var towerOfPyro = Object.assign({}, card, {
    name: "Tower of Pyro",
    img: "card-images/Tower_of_Pyro.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. Your friendly PYRO troops on the field gain +1 Attack and +1 Health. Once per turn, you may target an Enemy: Deal damage to it equal to the total number of Friendly troops on your field."
})

var pyroDefenseTower = Object.assign({}, card, {
    name: "Pyro DefenseTower",
    attack: 3,
    health: 5,
    img: "card-images/Pyro_DefenseTower.png",
    rank: 1,
    desc: "GUARDIAN: Anytime an Enemy troop Attacks, you may choose to make this card it's Attack target. Once per turn, the first time this card is Attacked by an Enemy troop: Cancel that Attack, and deal 2 damage to the attacking card."

})

var pyroKing = Object.assign({}, card, {
    name: "Pyro King",
    attack: 5,
    health: 7,
    img: "card-images/Pyro_King.png",
    rank: 2,
    desc: "Once per turn: Target an Enemy, deal 5 damage to it + 1 damage for each friendly PYRO card on the field."
})
var dailyCombo = Object.assign({}, card, {
    name: "Daily Combo",
    attack: 0,
    health: 3,
    img: "card-images/Daily_Combo.png",
    rank: 0,
    desc: "EQUIPMENT: Target a friendly troop, and EQUIP this card to it. At the end of each of your turns, increase the EQUIPPED card's Attack and Health by 1."
})

var soraBattleReady = Object.assign({}, card, {
    name: "Sora, BattleReady",
    attack: 2,
    health: 2,
    img: "card-images/Sora_BattleReady.png",
    rank: 0,
    trait: "TROOP",
    desc: "On Summon: Draw a random EQUIPMENT card. This card gains +1 Attack for each friendly EQUIPMENT card EQUIPPED to this card."
})

var bendBladeRogue = Object.assign({}, card, {
    name: "Bend Blade Rogue",
    attack: 3,
    health: 3,
    img: "card-images/Bend_Blade_Rogue.png",
    rank: 1,
    trait: "TROOP",
    desc: "This card gains +1 Attack and +1 Health for each friendly EQUIPMENT card on the field. Whenever this card attacks: Draw a random EQUIPMENT card."
})

var noExcuses = Object.assign({}, card, {
    name: "No Excuses",
    img: "card-images/No_Excuses.png",
    rank: 0,
    desc: "If you control a troop: Search your deck for a EQUIPMENT card, and add it to your hand."
})
var alchemSoulBlade = Object.assign({}, card, {
    name: "Alchem SoulBlade",
    attack: 1,
    health: 4,
    img: "card-images/Alchem_SoulBlade.png",
    rank: 0,
    desc: "EQUIPMENT: Target a friendly troop, and EQUIP this card to it. Whenever the EQUIPPED troop is targeting an Enemy troop for an Attack: The EQUIPPED card gains +1 Attack for each Poison token on the Enemy Attack target, then when the Attack ends, place 2 Poison tokens on the Attacked target"
})

var alchemArtYinoa = Object.assign({}, card, {
    name: 'Alchem Art: Yinoa',
    attack: 6,
    health: 6,
    img: "card-images/Alchem_Art_Yinoa.png",
    rank: 2,
    trait: "TROOP",
    desc: "Once per turn: If this card has an EQUIPMENT card EQUIPPED to it, you may place a Poison token on every Enemy troop on the field. At the end of your turn, deal damage to the Enemy Player's health equal to the total number of Poison tokens on the field."
})

var kingWarriorLoadout = Object.assign({}, card, {
    name: "King Warrior Loadout",
    attack: 0,
    health: 5,
    img: "card-images/Kings_Warrior_Loadout.png",
    rank: 0,
    desc: "EQUIPMENT: Target a friendly troop, and EQUIP this card to it. Increase the EQUIPPED card's Health by 3. Whenever the EQUIPPED card is destroyed by an Attack: Draw 1 card."
})

var soulFromTheBeginningOfEvil = Object.assign({}, card, {
    name: "Soul From The Beginning of Evil",
    attack: 1,
    health: 1,
    img: "card-images/Soul_from_the_Beginning_of_Evil.png",
    rank: 0,
    trait: "TROOP",
    desc: "Gain +1 Attack and +1 Health for each Friendly troop in your Graveyard."
})

var rescueTeamFireLove = Object.assign({}, card, {
    name: 'Rescue Team: "FireLove"',
    img: "card-images/Rescue_Team_FireLove.png",
    rank: 0,
    desc: "HIDDEN: Remains face down on the field until activated. Whenever a friendly troop is Attacked by an Enemy troop: Return both troops to their owners hands."
})

var inkArtSoni = Object.assign({}, card, {
    name: 'Ink Art: Soni',
    attack: 3,
    health: 3,
    img: "card-images/Ink_Art_Soni.png",
    rank: 0,
    trait: "TROOP",
    desc: "If you control a HIDDEN card on your field: Increase this card's Attack and Health by 1."

})

var inkArtLyon = Object.assign({}, card, {
    name: 'Ink Art: Lyon',
    attack: 3,
    health: 3,
    img: "card-images/Ink_Art_Lyon.png",
    rank: 0,
    trait: "TROOP",
    desc: "On Summon: You may target a Enemy HIDDEN card: Destroy it, and if you do, draw 1 card."
})

var inkArtEsmee = Object.assign({}, card, {
    name: 'Ink Art: Esmee',
    attack: 6,
    health: 5,
    img: "card-images/Ink_Art_Esmee.png",
    rank: 2,
    trait: "TROOP",
    desc: "Negate all Enemy HIDDEN card effects."
})

var evilInkStyleMeteor = Object.assign({}, card, {
    name: 'Evil Ink Art: Meteor',
    attack: 4,
    health: 5,
    img: "card-images/Evil_Ink_Style_Meteor.png",
    rank: 1,
    desc: "On Summon: Draw a random EVIL HIDDEN card from your deck. When a friendly EVIL HIDDEN card is activated: Target an Enemy, and deal 3 damage to it. When this card is destroyed: Draw a random EVIL card from your deck."
})

var masterInkStyleMaySun = Object.assign({}, card, {
    name: 'Master Ink Art: MaySun',
    attack: 7,
    health: 7,
    img: "card-images/Master_Ink_Style_MaySun.png",
    rank: 2,
    trait: "TROOP",
    desc: "On Summon: Draw 2 random spells from your deck."
})

var eliteInkArtBaus = Object.assign({}, card, {
    name: 'Elite Ink Art: Baus',
    attack: 4,
    health: 4,
    img: "card-images/Elite_Ink_Art_Baus.png",
    rank: 1,
    trait: "TROOP",
    desc: "On Summon: Draw 2 random troops from your deck."

})

var inkArtSacredPreparation = Object.assign({}, card, {
    name: 'Ink Art: "Sacred Preparation"',
    img: "card-images/Ink_Art_Sacred_Preparation.png",
    rank: 0,
    desc: "Choose 2 different cards in your hand: Shuffle them into your deck, then draw 3 cards."
})

var gardenKnightSpirit = Object.assign({}, card, {
    name: 'Garden KnightSpirit',
    attack: 3,
    health: 5,
    img: "card-images/Garden_KnightSpirit.png",
    rank: 1,
    desc: "On Summon: Draw a random PLANT card. All Friendly PLANT cards on the field except this card gain +1 Attack and +1 Health.",
    trait: ["PLANT", "TROOP"]
})

var toughGardenSentinel = Object.assign({}, card, {
    name: 'Tough Garden Sentinel',
    attack: 4,
    health: 8,
    img: "card-images/Tough_Garden_Sentinel.png",
    rank: 2,
    desc: "When this card Attacks: Gain +1 Attack and +1 Health for each friendly PLANT card on the field for that Attack only. When this card destroys an Enemy troop by Attack: Draw a random PLANT card from your deck.",
    trait: ["PLANT", "TROOP"]
})

var gardenCharger = Object.assign({}, card, {
    name: 'Garden Charger',
    attack: 4,
    health: 1,
    img: "card-images/Garden_Charger.png",
    rank: 0,
    desc: "When this card destroys an Enemy troop: Draw a card.",
    trait: ["PLANT", "TROOP"]
})

var gladiatorWindChillWolf = Object.assign({}, card, {
    name: 'Gladiator: WindChill Wolf',
    attack: 4,
    health: 4,
    img: "card-images/WindChill_Wolf.png",
    rank: 1,
    trait: "TROOP",
    desc: "On Summon while you control a ANIMAL card on the field other than this card: Search your deck for a ANIMAL card, and add it to your hand. When this card targets an Enemy troop for an Attack while controlling a ANIMAL card on the field other than this card: Reduce the Attack of the Enemy target by 3."

})

var legacyWindChillWolf = Object.assign({}, card, {
    name: 'Legacy: WindChill Wolf',
    attack: 3,
    health: 3,
    img: "card-images/Legacy_WindChill_Wolf.png",
    rank: 0,
    trait: "TROOP",
    desc: "Once per turn, if a friendly ANIMAL troop is destroyed: Draw a card."
})

var harvesterWindChillWolf = Object.assign({}, card, {
    name: 'Harvester: WindChill Wolf',
    attack: 3,
    health: 3,
    img: "card-images/Harvester_WindChill_Wolf.png",
    rank: 0,
    trait: "TROOP",
    desc: "On Summon: Target a friendly ANIMAL troop, destroy it, then search your deck for a card, and add it to your hand."
})

var rogueWindChillWolf = Object.assign({}, card, {
    name: 'Rogue: WindChill Wolf',
    attack: 3,
    health: 3,
    img: "card-images/Rogue_WindChill_Wolf.png",
    rank: 0,
    trait: "TROOP",
    desc: "If this is the only troop on your field: Gain +2 Attack and +2 Health."
})

var animalCareFarm = Object.assign({}, card, {
    name: 'Animal CareFarm',
    attack: 0,
    health: 4,
    img: "card-images/Animal_CareFarm.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. At the end of the turn: Give all friendly ANIMAL troops on the field +1 Health. When this card is destroyed: Select 1 ANIMAL card from your graveyard, and add it to your hand."
})

var joyousRetreat = Object.assign({}, card, {
    name: 'Joyous Retreat',
    img: "card-images/Joyous_Retreat.png",
    rank: 0,
    desc: "HIDDEN: Remains face down on the field until activated. When an Enemy troop Attacks: Cancel the Attack, and end the Attack Phase."

})

var evilPrinceSeba = Object.assign({}, card, {
    name: 'EvilPrince: Seba',
    attack: 6,
    health: 6,
    img: "card-images/Evil_Prince_Seba.png",
    rank: 2,
    trait: "TROOP",
    desc: "On Summon: Choose an Enemy troop: Destroy it, and if you do, you may search your deck for an EVIL card, and add it to your hand."
    
})

var zealousSeba = Object.assign({}, card, {
    name: 'Zealous Seba',
    attack: 10,
    health: 10,
    img: "card-images/Zealous_Seba.png",
    rank: 5,
    trait: "TROOP",
    desc: 'You may also use "EvilPrince: Seba" as the sole Sacrifice for the Summoning of this card. After this card Attacks: Destroy this card. This card cannot be used as a Sacrifice for any Summoning.'
})

var battleHammerPrototype = Object.assign({}, card, {
    name: 'Battle Hammer Prototype',
    attack: 3,
    health: 3,
    img: "card-images/Battle_Hammer_Prototype.png",
    rank: 0,
    desc: "EQUIPMENT: Target a friendly Troop, and EQUIP this card to it. The EQUIPPED troop gains +4 Attack. After the EQUIPPED troop Attacks an Enemy troop: Destroy this card."
})

var justRight = Object.assign({}, card, {
    name: '"Just Right"',
    img: "card-images/Just_Right.png",
    rank: 0,
    desc: "Search your deck for a EQUIPMENT card, and add it to your hand."
})

var bowTraderStorage = Object.assign({}, card, {
    name: 'Bow Trader Storage',
    attack: 0,
    health: 4,
    img: "card-images/Bow_Trader_Storage.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. On Play: Select a card in your hand, and grant it +1 Attack and +1 Health. Once per turn: Select a card in your hand, and grant it +1 Attack and +1 Health."
})

var goblinMischiefGap = Object.assign({}, card, {
    name: 'Goblin Mischief Gap',
    img: "card-images/Goblin_Mischief_Gap.png",
    rank: 0,
    desc: "HIDDEN: Remains face down on the field until activated. When an Enemy RANK 1 or lower troop is Summoned: Destroy the Enemy card Summoned."
})

var didYouShowMercy = Object.assign({}, card, {
    name: '"Did You Show Mercy?"',
    img: "card-images/Did_You_Show_Mercy.png",
    rank: 0,
    desc: "HIDDEN: Remains face down on the field until activated. Whenever an Enemy troop Attacks a Friendly troop and destroys it: Destroy the Attacking Enemy troop."
})

var conquerTheLand = Object.assign({}, card, {
    name: 'Conquer The Land',
    attack: 0,
    health: 1,
    img: "card-images/Conquer_The_Land.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. This card cannot be Attacked. Negate all Enemy STRUCTURE card effects."
})

var evilMountainRogue = Object.assign({}, card, {
    name: 'Evil MountainRogue',
    attack: 4,
    health: 5,
    img: "card-images/Evil_MountainRogue.png",
    rank: 1,
    trait: "TROOP",
    desc: "Once per turn, When this card targets an Enemy troop for an Attack, and if the Enemy has a STRUCTURE card on their field: Double this card's stats until the end of the Attack."
})

var rescueTeamArrivalStun = Object.assign({}, card, {
    name: 'Rescue Team: "Arrival Stun"',
    img: "card-images/Rescue_Team_Arrival_Stun.png",
    rank: 0,
    desc: "Target an Enemy card: Negate its effects, and remove any stat modifiers it has."
})

var evilRampageBullKing = Object.assign({}, card, {
    name: 'Evil: Rampage BullKing',
    attack: 6,
    health: 3,
    img: "card-images/Evil_Rampage_BullKing.png",
    rank: 1,
    trait: "TROOP",
    desc: "If this card destroys an Enemy troop by Attack: Ignore any damage taken from the Attack, and restore this card to full Health."
})

var evilDrivenRage = Object.assign({}, card, {
    name: 'Evil: "Driven Rage"',
    img: "card-images/Evil_Driven_Rage.png",
    rank: 0,
    desc: "Target a friendly EVIL troop: Deal its Attack damage to ALL Enemy troops on the field, then reduce its stats by half."
})

var cyberMechSkyHunter = Object.assign({}, card, {
    name: 'Cyber Mech SkyHunter',
    attack: 4,
    health: 4,
    img: "card-images/CyberMech_SkyHunter.png",
    rank: 1,
    trait: "TROOP",
    desc: "When a Friendly troop is destroyed while this card is in your hand: Summon this card."


})

var aquaEndDragon = Object.assign({}, card, {
    name: 'Aqua End Dragon',
    attack: 6,
    health: 6,
    img: "card-images/Aqua_End_Dragon.png",
    rank: 2,
    trait: "TROOP",
    desc: "On Summon: Return all Enemy cards on the Enemy field to their owner's hand."
})

var naturalNutrients = Object.assign({}, card, {
    name: 'Natural Nutrients',
    img: "card-images/Natural_Nutrients.png",
    rank: 0,
    desc: "Grant all of your friendly Troops on the field +1 Attack and +1 Health."
})

var twinAquaDragon = Object.assign({}, card, {
    name: 'Twin Aqua Dragon',
    attack: 7,
    health: 4,
    img: "card-images/Twin_Aqua_Dragon.png",
    rank: 2,
    trait: "TROOP",
    desc: "This card can Attack twice per turn."
})

var tameTheBeast = Object.assign({}, card, {
    name: '"Tame The Beast"',
    img: "card-images/Tame_The_Beast.png",
    rank: 0,
    desc: "Target an Enemy troop: Set its Attack and Health to 1."
})

var rescueTeamSoulBind = Object.assign({}, card, {
    name: 'Rescue Team: "SoulBind"',
    img: "card-images/Rescue_Team_SoulBind.png",
    rank: 0,
    desc: "If you control at least 2 Friendly troops on your field: Deal 3 damage to ALL Enemy troops on the field."
})

var magicMistForest = Object.assign({}, card, {
    name: 'Magic Mist Forest',
    attack: 1,
    health: 5,
    img: "card-images/Magic_Mist_Forest.png",
    rank: 0,
    desc: "STRUCTURE: Remains on the field until destroyed. Your PLANT cards are unaffected by ALL Enemy spell effects.",
    trait: "PLANT"
})

var juniorRescueTeamClubFire = Object.assign({}, card, {
    name: 'Junior Rescue Team: "ClubFire"',
    attack: 3,
    health: 3,
    img: "card-images/Junior_Rescue_Team_ClubFire.png",
    rank: 1,
    trait: "TROOP",
    desc: "On Summon: Choose a Rank 0 troop in your hand, summon it."
})

var cosmicGuardianHelm = Object.assign({}, card, {
    name: 'Cosmic Guardian Helm',
    img: "card-images/Cosmic_Guardian_Helm.png",
    rank: 0,
    desc: "EQUIPMENT: Choose a friendly Troop on the field, and EQUIP this card to it. The EQUIPPED card gains the following effect: This card may Attack the Enemy Player's Health directly. Once per turn, you may choose a friendly Troop: EQUIP this card to it."
})

var inkArtMagicDefuse = Object.assign({}, card, {
    name: 'Ink Art: "Magic Defuse"',
    img: "card-images/Ink_Art_Magic_Defuse.png",
    rank: 0,
    desc: "HIDDEN: Remains face-down on the field until Activated. When an Enemy SPELL Effect is Activated: You may Cancel the Effect."
})

var twoAgainstOne = Object.assign({}, card, {
    name: '"Two Against One"',
    img: "card-images/Two_Against_One.png",
    rank: 0,
    desc: "Target an Enemy troop with 7 or more Attack: Destroy it."
})

var exhaustedGravekeeper = Object.assign({}, card, {
    name: '"Exhausted Gravekeeper"',
    img: "card-images/Exhausted_Gravekeeper.png",
    rank: 0,
    desc: "Choose a Friendly troop in your graveyard: Return it to your hand. You may pay half of your Player Health to Summon the troop instead."
})

var unimaginablePower = Object.assign({}, card, {
    name: '"Unimaginable Power"',
    img: "card-images/Unimaginable_Power.png",
    rank: 0,
    desc: "HIDDEN: Remains face-down on the field until Activated. This card cannot be Activated the turn it is placed on the field. If you control a Friendly troop with 9 or more Attack: Deal 7 damage to ALL Enemies."
})

var cometCounter = Object.assign({}, card, {
    name: '"Comet Counter"',
    img: "card-images/Comet_Counter.png",
    rank: 0,
    desc: "Target 1 Enemy HIDDEN card: Destroy it. No other card can be Activated in response to this card's Effect."
})

var pacificGetaway = Object.assign({}, card, {
    name: '"Pacific Getaway"',
    img: "card-images/Pacific_Getaway.png",
    rank: 0,
    desc: "Choose a Friendly RANK 1 Troop on your field: Destroy it, search your Graveyard for a RANK 0 Troop, Summon it, then draw 1 card."
})

var growth = Object.assign({}, card, {
    name: '"Growth"',
    img: "card-images/Growth.png",
    rank: 0,
    desc: "If you control at least 1 Friendly PLANT troop on the field: Search your deck for a PLANT card, add it to your hand, then shuffle your deck.",
    trait: "PLANT"
})

var evilAlchemAntiHero = Object.assign({}, card, {
    name: 'Evil Alchem AntiHero',
    attack: 3,
    health: 6,
    img: "card-images/Evil_Alchem_AntiHero.png",
    rank: 1,
    trait: "TROOP",
    desc: "Whenever you place a Poison token on an Enemy Troop: Add 1 Poison token to this card. Once per turn, when an Enemy card Ability is Activated: You may remove 3 Poison tokens from this card, and Cancel that Ability."
})

var theDarknessWithin = Object.assign({}, card, {
    name: '"The Darkness Within"',
    attack: 0,
    health: 4,
    img: "card-images/The_Darkness_Within.png",
    rank: 0,
    desc: "EQUIPMENT: Choose an ENEMY Troop on the field, and EQUIP this card to it (This card remains on your field.). The EQUIPPED card gains the following effect: When this card Attacks, deal 5 damage to the owner of the EQUIPPED card."
})

var evilBendBattleMaster = Object.assign({}, card, {
    name: 'Evil Bend BattleMaster',
    attack: 4,
    health: 4,
    img: "card-images/Evil_Bend_BattleMaster.png",
    rank: 1,
    trait: "TROOP",
    desc: "On Summon: Deal 2 damage to an Enemy. When this card is sent to the Graveyard: Draw a random EVIL card."
})

var midnightDragon = Object.assign({}, card, {
    name: 'Midnight Dragon',
    img: "card-images/Midnight_Dragon.png",
    attack: 2,
    health: 3,
    rank: 0,
    trait: "TROOP",
    desc: "This card gains +1 Attack and +2 Health during your Enemy's turn."
})

AddToAllCards(midnightDragon);
AddToAllCards(evilBendBattleMaster);
AddToAllCards(theDarknessWithin);
AddToAllCards(evilAlchemAntiHero);
AddToAllCards(growth);
AddToAllCards(unimaginablePower);
AddToAllCards(pacificGetaway);
AddToAllCards(cometCounter);
AddToAllCards(exhaustedGravekeeper);
AddToAllCards(twoAgainstOne);
AddToAllCards(inkArtMagicDefuse);
AddToAllCards(cosmicGuardianHelm);
AddToAllCards(juniorRescueTeamClubFire);
AddToAllCards(rescueTeamSoulBind);
AddToAllCards(tameTheBeast);
AddToAllCards(twinAquaDragon);
AddToAllCards(cyberMechSkyHunter);
AddToAllCards(evilRampageBullKing);
AddToAllCards(rescueTeamArrivalStun);
AddToAllCards(evilDrivenRage);
AddToAllCards(kenonoForceOfBear);
AddToAllCards(alchemApprentice);
AddToAllCards(gardenDweller);
AddToAllCards(oneWithNature);
AddToAllCards(deathIsNotTheEnd);
AddToAllCards(kanGrandWatcherOfPeace);
AddToAllCards(visitFromTheMajestic);
AddToAllCards(bejeweledCollectorsKunai);
AddToAllCards(tricksterNibbler);
AddToAllCards(antoniPrideFang);
AddToAllCards(renarkStrengthOfTheProtector);
AddToAllCards(wutonkCourageBorn);
AddToAllCards(pawnOfEvil);
AddToAllCards(evilDoesntSleep);
AddToAllCards(sirMoti);
AddToAllCards(companionOfEvil);
AddToAllCards(fauvGiyuo);
AddToAllCards(motherTelona);
AddToAllCards(cosmicFlock);
AddToAllCards(planetHunter);
AddToAllCards(rescueTeam26TheDirtRollers);
AddToAllCards(rescueTeam14TheLlamageddon);
AddToAllCards(Melani);
AddToAllCards(melanisPromise);
AddToAllCards(melanisStudent);
AddToAllCards(pyroJuggler);
AddToAllCards(pyroMagician);
AddToAllCards(pyroEvilWield);
AddToAllCards(alchemKidRogue);
AddToAllCards(alchemTrustTheToxin);
AddToAllCards(storedPower);
AddToAllCards(gemnaDragon);
AddToAllCards(drakingKnight);
AddToAllCards(venerableBeastMan);
AddToAllCards(rescueGeneralZeth);
AddToAllCards(gentleForestGrubber);
AddToAllCards(babyFurphant);
AddToAllCards(babySlime);
AddToAllCards(slimeGrubber);
AddToAllCards(slimeSynthesis);
AddToAllCards(slimeDungeonNightmare);
AddToAllCards(terrorMegaSlime);
AddToAllCards(heavySlimeGuardian);
AddToAllCards(maestroArenaChampion);
AddToAllCards(maestroProdigySword);
AddToAllCards(bendAlchemBlades);
AddToAllCards(alchemBrew);
AddToAllCards(pureAlchemBrew);
AddToAllCards(pyroSiege);
AddToAllCards(towerOfPyro);
AddToAllCards(pyroDefenseTower);
AddToAllCards(pyroKing);
AddToAllCards(dailyCombo);
AddToAllCards(soraBattleReady);
AddToAllCards(bendBladeRogue);
AddToAllCards(noExcuses);
AddToAllCards(alchemSoulBlade);
AddToAllCards(alchemArtYinoa);
AddToAllCards(kingWarriorLoadout);
AddToAllCards(soulFromTheBeginningOfEvil);
AddToAllCards(rescueTeamFireLove);
AddToAllCards(inkArtSoni);
AddToAllCards(inkArtLyon);
AddToAllCards(inkArtEsmee);
AddToAllCards(evilInkStyleMeteor);
AddToAllCards(masterInkStyleMaySun);
AddToAllCards(eliteInkArtBaus);
AddToAllCards(inkArtSacredPreparation);
AddToAllCards(gardenKnightSpirit);
AddToAllCards(toughGardenSentinel);
AddToAllCards(gardenCharger);
AddToAllCards(gladiatorWindChillWolf);
AddToAllCards(legacyWindChillWolf);
AddToAllCards(harvesterWindChillWolf);
AddToAllCards(rogueWindChillWolf);
AddToAllCards(animalCareFarm);
AddToAllCards(joyousRetreat);
AddToAllCards(evilPrinceSeba);
AddToAllCards(zealousSeba);
AddToAllCards(battleHammerPrototype);
AddToAllCards(justRight);
AddToAllCards(bowTraderStorage);
AddToAllCards(goblinMischiefGap);
AddToAllCards(didYouShowMercy);
AddToAllCards(conquerTheLand);
AddToAllCards(evilMountainRogue);
AddToAllCards(naturalNutrients);
AddToAllCards(magicMistForest);
AddToAllCards(aquaEndDragon);

var player1Deck = [];
console.log(player1Deck);

// CARD OPTION BUTTONS
const buttons = document.querySelectorAll('.btn');


function handleButtonClick(event) {
    const button = event.currentTarget;
    const randomCard = JSON.parse(button.getAttribute('data-random-card'));
    player1Deck.push(randomCard);

    updatePlayerDeck();
    updateDeckCount();
    resetButtonCards();

    // Remove the click event listener to prevent multiple selections
    button.removeEventListener('click', handleButtonClick);

    // Update the card-desc-text with the chosen card's desc
const cardIndex = parseInt(button.getAttribute('data-card-index'));
const cardDescText = document.getElementById(`card-desc-text${cardIndex + 1}`);

// Clear the previous description before updating
cardDescText.innerHTML = "";

// Create a new paragraph element for the card description
const descParagraph = document.createElement('p');
descParagraph.textContent = randomCard.desc;

// Append the description to the respective card's card-desc-text
cardDescText.appendChild(descParagraph);

// Display the card sprite in the card-information-onclick element
const cardInformationOnClick = document.getElementById('card-information-onclick');
cardInformationOnClick.innerHTML = ""; // Clear previous content

// Create an image element for the card sprite
const cardSpriteImage = document.createElement('img');
cardSpriteImage.src = randomCard.img;
cardSpriteImage.alt = randomCard.name; // Set alt text for accessibility

// Append the image element to the card-information-onclick element
cardInformationOnClick.appendChild(cardSpriteImage);

}




// Define a dictionary to keep track of card counts
const cardCounts = {};


function updatePlayerDeck() {
    const deckList = document.getElementById('player-deck');
    const cardCounts = {};
  
    // Clear the list and update the count for each card in the player's deck
    deckList.innerHTML = "";
    player1Deck.forEach((card) => {
      const cardKey = card.rank + " " + card.name;
  
      // Update the count or initialize it to 1
      cardCounts[cardKey] = (cardCounts[cardKey] || 0) + 1;
    });
  
    // Create list items for each unique card
    for (const cardKey in cardCounts) {
      const count = cardCounts[cardKey];
      const listItem = document.createElement('li');
      listItem.textContent = `${cardKey} x${count}`;
      deckList.appendChild(listItem);
    }
  }
  
  









socket.on("activateAcceptBtn", (data) => {

console.log("activateAcceptBtn works");
   document.getElementById('acceptLobby').style.display = 'block';
});

function handleChoosePlayerBtnClick(event) {
    if(event.currentTarget.id == "player1-btn") {
        player1.role = true;
        console.log("You are player 1", player1.role);
        console.log("player1 btn pressed");
        socket.emit("choosePlayer", { player: "player1" });
        socket.emit("updateLobby", { player: "player1" });
        
    } else if(event.currentTarget.id == "player2-btn") {
        player2.role = true;
        console.log("You are player 2", player2.role);
        console.log("player2 btn pressed");
        socket.emit("choosePlayer", { player: "player2" });
        socket.emit("updateLobby", { player: "player2" });
        
    }

    if(lobby.length === 1){
        document.getElementById('acceptLobby').style.display = 'block';
        socket.emit("activateAcceptBtn", {});
    }

    document.getElementById('player1-btn').style.display = 'none';
    document.getElementById('player2-btn').style.display = 'none';
    

}


// ...





buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

function AddToAllCards(card) {
    allCards.push(card);
}

// Assign random cards to buttons on startup
var assignedCards = [];

buttons.forEach((button, index) => {
    assignRandomCard(button, index);
    // Add event listener only once
    button.addEventListener('click', function() {
        handleClick(button);
    });
});
function assignRandomCard(button, index) {
    var randomCard = getRandomCardUnique();
    var cardIndex = index + 1;

    button.setAttribute("data-card-index", index);
    button.setAttribute("data-random-card", JSON.stringify(randomCard));

    // Update the card name elements with the chosen card's name
    var cardNameElement = document.getElementById(`card-name-${cardIndex}`);
    cardNameElement.textContent = randomCard.name;

    // Update the card text elements with the chosen card's attack and health values
    var cardTextElement = document.getElementById(`card-text-${cardIndex}`);
    cardTextElement.textContent = `RANK: ${randomCard.rank}, ATK: ${randomCard.attack}, HP: ${randomCard.health}`;

    // Update the card-desc-text with the chosen card's desc
    const cardDescText = document.getElementById(`card-desc-text${cardIndex}`);
    
    // Clear previous description
    cardDescText.innerHTML = "";

    // Create a new paragraph element for the card description
    const descParagraph = document.createElement('p');
    descParagraph.textContent = randomCard.desc;

    // Append the description to the respective card's card-desc-text
    cardDescText.appendChild(descParagraph);

    // Create an image element and set its source
    var cardImg = new Image();
    cardImg.src = randomCard.img;

    // Set the image width and height to 100%
    

    // Append the image element to the button
    button.innerHTML = "";
    button.appendChild(cardImg);

    // Store the assigned card in the assignedCards array
    assignedCards.push(randomCard);
}


function getRandomCard() {
    var randomIndex = Math.floor(Math.random() * allCards.length);
    return allCards[randomIndex];
}

function getRandomCardUnique() {
    if (assignedCards.length === buttons.length) {
        assignedCards = [];
    }

    var randomCard = getRandomCard();
    while (assignedCards.includes(randomCard)) {
        randomCard = getRandomCard();
    }

    assignedCards.push(randomCard);
    return randomCard;
}

function updateDeckCount() {
    const deckCountElement = document.getElementById('deck-text');
    deckCountElement.textContent = "Deck: " + player1Deck.length + " / 40";

    if (player1Deck.length === 40 && lobby.includes("player1") && lobby.includes("player2")) {
        // Show the game container with player spots
        const gameContainer = document.getElementById('game-container');
        gameContainer.style.display = 'flex';

        // Update the display property of card-information-onclick and card-desc-text-onclick
        const cardInformationOnClick = document.getElementById('card-information-onclick');
        cardInformationOnClick.style.display = 'block';

        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.style.display = 'block';
    }
}
// ...

// ...

// ...

function resetButtonCards() {
    assignedCards = [];

    // Check if the deck size reaches 20
    if (player1Deck.length >= 20 && lobby.length === 2) {
        // Hide the button container
        const buttonContainer = document.getElementById('button-container');
        buttonContainer.style.display = 'none';

        // Populate the main player hand with 7 randomly chosen cards
        populateMainPlayerHand();
    }

    // Reassign random cards to buttons after the deck is full
    buttons.forEach((button, index) => {
        assignRandomCard(button, index);
    });
}


function populateMainPlayerHand() {
    const mainPlayerHandSlots = document.querySelectorAll('.main-player-hand-slots');

    for (let i = 0; i < 5; i++) {
        if (player1Deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * player1Deck.length);
            const randomCard = player1Deck.splice(randomIndex, 1)[0];
            console.log(randomCard);
            const slot = mainPlayerHandSlots[i];

            // Update style to make the slot visible
            slot.style.display = 'block';

            // Clear previous content
            slot.innerHTML = '';

            // Create an image element for the card
            const cardImage = document.createElement('img');
            cardImage.src = randomCard.img;
            cardImage.alt = randomCard.name;

            // Add the image to the slot
            slot.appendChild(cardImage);

            // Create or find the existing cost box
            let costBox = slot.querySelector('.card-cost-box');

            // If cost box doesn't exist, create it
            if (!costBox) {
                costBox = document.createElement('div');
                costBox.className = 'card-cost-box'; // Change id to class
                costBox.style.position = 'absolute';
                costBox.style.top = '-5px';
                costBox.style.left = '-5px';
                costBox.style.width = '45px';
                costBox.style.height = '45px';
                costBox.style.background = 'url("/effects/costpenta.png") center/cover'; // Set the background
                costBox.style.color = 'white';
                costBox.style.display = 'flex';
                costBox.style.justifyContent = 'center';
                costBox.style.alignItems = 'center';
                costBox.style.zIndex = '1';
                costBox.style.fontSize = '20px';
                costBox.style.textShadow = '-1.5px -0.8px 0 rgba(0, 0, 0, 1), 0.8px -0.8px 0 rgba(0, 0, 0, 1), -2px 0.8px 0 rgba(0, 0, 0, 1), 0.8px 0.8px 0 rgba(0, 0, 0, 1)';
            
            
            
            



                // Add the cost box to the slot
                slot.appendChild(costBox);
            }

            // Update the content of the cost box
            costBox.innerText = randomCard.rank;

            // Set the data attribute for the card
            slot.setAttribute('data-random-card', JSON.stringify(randomCard));
        }
    }
    updateMainDeckSize();
}

  
function handleButtonClick(event) {
    const button = event.currentTarget;
    const randomCard = JSON.parse(button.getAttribute('data-random-card'));
    player1Deck.push(randomCard);

    updatePlayerDeck();
    updateDeckCount();
    resetButtonCards();
}

// Opponent hand slots functionality
const opponentHandSlots = document.querySelectorAll('.opponent-hand-slots');
opponentHandSlots.forEach((slot) => {
    slot.addEventListener('click', handleOpponentSlotClick);
})

function handleOpponentSlotClick(event) {

    const slot = event.currentTarget;

    console.log("opponent hand works");

}

// Add event listeners to main-player-hand-slots elements
const mainPlayerHandSlots = document.querySelectorAll('.main-player-hand-slots');
mainPlayerHandSlots.forEach((slot) => {
    slot.addEventListener('click', handleSlotClick);
});




let summonButton = null;
let selectedCard = null;
let waitingForSummon = false;

let activateAbilityButton = null;

let mainboard1Occupied = false;
let mainboard2Occupied = false;
let mainboard3Occupied = false;
let mainboard4Occupied = false;
let mainboard5Occupied = false;
let mainboard6Occupied = false;
let mainboard7Occupied = false;
let mainboard8Occupied = false;
let mainboard9Occupied = false;
let mainboard10Occupied = false;

let slotIDForRemoval = null;

let slot = null;

function handleSlotClick(event) {
    
    slot = event.currentTarget;

    if (!waitingForSummon && selectingReplacingCards == false && selectSpotForSpellActivation == false) {
        
        id = slot.id;
        slotIDForRemoval = id;
        selectedCard = JSON.parse(slot.getAttribute('data-random-card'));
        console.log("Selected card: ", selectedCard);
        

        // Display the card sprite in the card-information-onclick element
        const cardInformationOnClick = document.getElementById('card-information-onclick');
        cardInformationOnClick.innerHTML = "";
        
        const cardSpriteImage = document.createElement('img');
        cardSpriteImage.src = selectedCard.img;
        cardSpriteImage.alt = selectedCard.name;

        cardSpriteImage.style.maxWidth = '100%'; // Set the maximum width to 100% of the container
        cardSpriteImage.style.maxHeight = '100%'; // Set the maximum height to 100% of the container
        cardInformationOnClick.appendChild(cardSpriteImage);

        const cardDescName = document.getElementById('card-desc-name');
        cardDescName.textContent = "";
        cardDesc = document.createElement('p');
        cardDesc.textContent = selectedCard.name;
        cardDescName.appendChild(cardDesc);
        

        // Update the card-desc-text-onclick with the chosen card's desc
        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.innerHTML = "";

        const descParagraph = document.createElement('p');
        descParagraph.textContent = "RANK: " + selectedCard.rank + " ATK: " + selectedCard.attack + " HP: " + selectedCard.health + " " + selectedCard.desc;
        cardDescTextOnClick.appendChild(descParagraph);

        console.log(selectedCard.trait);
        console.log(summonButton, )

        // Create the SUMMON button
        if (!summonButton && !isEnemyTurn && !selectedCard.trait.includes("SPELL")) {
            summonButton = document.createElement('button');
            summonButton.textContent = "SUMMON";
            summonButton.addEventListener('click', () => handleSummonButtonClick(slot));
            document.body.appendChild(summonButton);
        
            // Set the button's position to the mouse cursor position
        }
        

        if (!activateAbilityButton && !isEnemyTurn && selectedCard.trait.includes("SPELL")) {
            activateAbilityButton = document.createElement('button');
            activateAbilityButton.textContent = "ACTIVATE";
            activateAbilityButton.addEventListener('click', () => handleActivateAbilityButtonClick(slot));
            document.body.appendChild(activateAbilityButton);
        }
        

        
        if(summonButton && !selectedCard.trait.includes("SPELL")) {
            summonButton.style.position = "fixed";
            summonButton.style.left = event.clientX + "px";
            summonButton.style.top = event.clientY + "px";
        }

        // Set the button's position to the mouse cursor position
        if (activateAbilityButton && selectedCard.trait.includes("SPELL")) {
            activateAbilityButton.style.position = "fixed";
            activateAbilityButton.style.left = event.clientX + "px";
            activateAbilityButton.style.top = event.clientY + "px";
        }
    }

    if (selectingReplacingCards == true) {
        
        const willReplaceValue = slot.getAttribute('willReplace') === 'true' ? 'false' : 'true';
        console.log(willReplaceValue);
        
        selectedCard = JSON.parse(slot.getAttribute('data-random-card'));

        if(willReplaceValue == 'true'){
        selectedCardsToReplace.push(JSON.parse(slot.getAttribute('data-random-card')));
        selectedSlotsToReplace.push(slot);
        console.log("Selected cards to replace: ", selectedCardsToReplace);
        console.log("Selected slots to replace: ", selectedSlotsToReplace);
        }

        // Update the card-desc-text-onclick with the chosen card's desc
        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        cardDescTextOnClick.innerHTML = "";

        const descParagraph = document.createElement('p');
        console.log("Selected card: ", selectedCard);
        descParagraph.textContent = "RANK: " + selectedCard.rank + " ATK: " + selectedCard.attack + " HP: " + selectedCard.health + " " + selectedCard.desc;
        cardDescTextOnClick.appendChild(descParagraph);

        // Add highlight effect to the selected slot
        slot.classList.add('selected-card-highlight');

        
        slot.setAttribute('willReplace', willReplaceValue);

        // Remove 'selected-card-highlight' class if willReplace is true
        if (willReplaceValue === 'false') {
            slot.classList.remove('selected-card-highlight');
            selectedCardsToReplace.pop(JSON.parse(slot.getAttribute('data-random-card')));
            selectedSlotsToReplace.pop(slot);
            console.log("SELECTED CARDS AFTER REMOVAL", selectedCardsToReplace);
            console.log("SELECTED SLOTS AFTER REMOVAL", selectedSlotsToReplace);
        }

        console.log(willReplaceValue);
    }
}

let selectSpotForSpellActivation = false;
let spell = null;

function handleActivateAbilityButtonClick(slot) {
    console.log("Activate ability button clicked", slot);
    
    const card = JSON.parse(slot.getAttribute('data-random-card'));
    console.log(card);

    switch(card.name){
        case "One With Nature":
            console.log("One With Nature detected, checking to make sure it's playable");
            

            returnAllCardsOnField();
            console.log("mainPlayerField: ", mainPlayerField);

            for(let i = 0; i < mainPlayerField.length; i++){
                console.log("mainPlayerField[i]: ", mainPlayerField[i]);
                cardData = JSON.parse(mainPlayerField[i]);
                console.log("cardData: ", cardData);

                trait = cardData.trait;
                console.log("trait: ", trait);

                if(trait == "TROOP"){
                    console.log("One with Nature is playable");
                    selectSpotForSpellActivation = true;
                    
                }else{
                    console.log("One with Nature is not playable");
                    updateCenterText("Card cannot be played here");
                }
            }
            break; // Added missing break statement

        // Add additional cases for other card names if needed

        default:
            console.log("Unknown card detected");
            break; // Optional, depending on your logic
    }

    console.log("selectSpotForSpellActivation: ", selectSpotForSpellActivation);

    spell = card;
    console.log("spell: ", spell);

    updateCenterText("SELECT SPOT TO PLAY CARD");
    var turnSystemElement = document.getElementById("turn-system");
    turnSystemElement.style.display = "block";

    // Check if activateAbilityButton exists before attempting to remove it
    var activateAbilityButton = document.getElementById("activate-ability-button");
    if (activateAbilityButton) {
        activateAbilityButton.parentNode.removeChild(activateAbilityButton);
    }
}


let cardInPlay = null;

let playPhase = false;

let postPhase = false;

let yesEnterPostPhase = document.getElementById('yesConfirmPostPhase');
let noEnterPostPhase = document.getElementById('noConfirmPostPhase');

yesEnterPostPhase.addEventListener('click', () => {
    
    phase = document.getElementById('mainPhase');
    midText = document.getElementById('turn-system');
    console.log("yes clicked");

    postPhase = true;
    attackPhase = false;
    attackTargeting = false;

    console.log("postPhase: ", postPhase, "playPhase: ", playPhase, "attackPhase: ", attackPhase, "attackTargeting: ", attackTargeting);

    menu = document.getElementById('confirmAttackMenu');
    menu.style.display = 'none';
    yesEnterPostPhase.style.display = 'none';
    noEnterPostPhase.style.display = 'none';

    
    phase.textContent = "POST PHASE";
    phase.style.backgroundColor = 'grey';

    midText.style.display = 'none';

})
noEnterPostPhase.addEventListener('click', () => {
    console.log("no clicked");
})

let usedFirst0Summon = false;

function handleSummonButtonClick(slot) {

    if(attackPhase == true){
        menu = document.getElementById('confirmAttackMenu');
        yes = document.getElementById('yesConfirmPostPhase');
        no = document.getElementById('noConfirmPostPhase');

        menu.textContent = "COMMIT TO POST PHASE? (You won't be able to attack.)";
        menu.style.display = 'block';
        yes.style.display = 'block';
        no.style.display = 'block';
    }

    

    if (totalCardsInPlay >= selectedCard.rank) {
        console.log(selectedCard, totalCardsInPlay);
        
        if (selectedCard.rank === 0) {
            if (usedFirst0Summon === false) {
                console.log("Good to summon 0 cost");
    
                console.log(totalCardsInPlay, selectedCard.rank);
    
                choosingSpot = true;
    
                console.log("choosingSpot: " + choosingSpot);
                console.log(selectedCard);
    
                if (selectedCard && slot) {
                    // Add logic to handle the summon button click
                    console.log('SUMMON button clicked for card:', selectedCard);
    
                    // Assign the entire selectedCard object to the data-card-inplay attribute
                    cardInPlay = JSON.stringify(selectedCard);
                    console.log("cardInPlay: " + cardInPlay);
    
                    // Remove the SUMMON button
                    if (summonButton) {
                        document.body.removeChild(summonButton);
                        summonButton = null;
                    }
                }
            } else {
                console.log("Already used 0 cost summon this turn.");

                midText = document.getElementById('turn-system');

                
                midText.textContent = "ALREADY USED 0 COST SUMMON";
                midText.style.opacity = '1';
                midText.style.display = 'block';

                // Start the fade-out effect after 3 seconds
                setTimeout(function () {
            
                // Use a transition for a smooth fade-out effect
                midText.style.transition = 'opacity 2s'; // Adjust the duration as needed

                // Set the opacity to 0 to trigger the fade-out
                midText.style.opacity = '0';
}, 3000); // Wait for 3 seconds before starting the fade-out effect



                if (summonButton) {
                    document.body.removeChild(summonButton);
                    summonButton = null;
                }
            }
        } else if (selectedCard.rank >= 1) {
            paySummonCost(selectedCard);

            if (summonButton) {
                document.body.removeChild(summonButton);
                summonButton = null;
            }
        }
    } else {
        console.log("not enough cards in play");
    
        // Assuming you have a reference to the element already
        var turnSystemElement = document.getElementById('turn-system');
    
        turnSystemElement.style.display = 'block';
    
        // Change the text content of the <p> element
        turnSystemElement.textContent = "NOT ENOUGH CARDS IN PLAY";
    
        // Start the fade-out effect by setting opacity to 0
        turnSystemElement.style.opacity = '0';
    
        // Use setTimeout to wait for the fade-out effect to finish
        setTimeout(function () {
            // Now that the element is invisible, set display to 'none'
            turnSystemElement.style.display = 'none';
        }, 5000); // The duration here should match the CSS transition duration
    }
}
    

            



const choosePlayerBtns = document.querySelectorAll('.choosePlayerBtn');

choosePlayerBtns.forEach((btn) => {
    btn.addEventListener('click', handleChoosePlayerBtnClick);
})

let lobby = [];



// Client-side logic
socket.on('playerAssigned', ({ player }) => {
    console.log(`You are assigned as ${player}`);
});

socket.on('playersUpdated', ({ player }) => {

    console.log('Players updated:', { player });

    // Update your UI to reflect the current player choices
});

socket.on('updateLobby', ({ player }) => {
    lobby.push(player);
    console.log("Lobby: " + lobby);
});

socket.on('summonCharacter', ({ card }) => {
    console.log('Character summoned:', { card });
    // Add logic to handle the character being summoned
})

socket.on('cardPlayMain1', ({ select, chosenCard }) => {
    console.log('Main player played on slot 1 of their POV = Enemy slot 10 for YOUR POV:', { select, chosenCard });
    // Add logic to handle the card being played
})

socket.on('enemySummonCharacter', ({ sender, select, chosenCard }) => {
    if (select == "mainboard-1") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy10");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-10");
                

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }


            }
            
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy10");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-10");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
        
    }
    if(select == "mainboard-2") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy9");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-9");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy9");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-9");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-3") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy8");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-8");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy8");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-8");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-4") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy7");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-7");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy7");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-7");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-5") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy6");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-6");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy6");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-6");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-6") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy5");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-5");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy5");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-5");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-7") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy4");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-4");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy4");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-4");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-8") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy3");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-3");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy3");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-3");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-9") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy2");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-2");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy2");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-2");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
    if(select == "mainboard-10") {
        console.log("select ok", select, sender);
        if(sender.name == "player1") {
            console.log("Sender ok", sender);
            if(player2.role == true) {
                console.log("Enemy summoned on enemy1");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-1");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
        }
        if(sender.name == "player2") {
            console.log("Sender ok", sender);
            if(player1.role == true) {
                console.log("Enemy summoned on enemy1");
                console.log("chosenCard: ", chosenCard);

                // Find the opponent's board spot by ID
                const opponentBoardSpot = document.getElementById("enemyboard-1");

                opponentBoardSpot.setAttribute("data-card-inplay", JSON.stringify(chosenCard));

                // Clear the opponent's board spot before appending the new card image
                

                // Create an image element for the chosen card
                const cardImage = document.createElement('img');
                cardImage.src = chosenCard.img;
                cardImage.alt = chosenCard.name;

                cardImage.style.width = '100%';
                cardImage.style.height = '100%';
                cardImage.style.objectFit = 'cover';

                // Append the card image to the opponent's board spot
                opponentBoardSpot.appendChild(cardImage);

                console.log(opponentBoardSpot);
                
                const cardHealthBox = opponentBoardSpot.querySelector("#card-health-box");
                const cardAttackBox = opponentBoardSpot.querySelector("#card-attack-box");
                console.log(cardHealthBox);
                console.log(cardAttackBox);

                if (cardHealthBox && cardAttackBox) {
                cardHealthBox.style.display = "block"; 
                cardAttackBox.style.display = "block";
                cardHealthBox.textContent = chosenCard.health;
                cardAttackBox.textContent = chosenCard.attack;
                }
            }
            
        }
    }
});


let playerSelected = false;
let btnPressed = false;

// ...

let selectedPlayers = new Set();

// Add a listener to update btnPressed for all users
socket.on("btnStateChanged", function(data) {
    btnPressed = data.btnPressed;
    if (btnPressed == true) {
        document.getElementById('acceptLobby').style.display = 'block';
    }
});



// Declare board spots globally
const boardSpots = document.querySelectorAll('.board-spot');

const acceptBtn = document.getElementById('acceptLobby');

// Accept lobby button
acceptBtn.addEventListener('click', handleAcceptLobbyBtnClick);
    


// Add click event listeners to board spots
boardSpots.forEach((spot) => {
    spot.addEventListener('click', handleBoardSpotClick);
});

function handleAcceptLobbyBtnClick(event) {
    document.getElementById('button-container').style.display = 'none';
    // Show the game container with player spots
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'flex';

    // Update the display property of card-information-onclick and card-desc-text-onclick
    const cardInformationOnClick = document.getElementById('card-information-onclick');
    cardInformationOnClick.style.display = 'block';

    const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
    cardDescTextOnClick.style.display = 'block';

    const cardDescName = document.getElementById('card-desc-name');
    cardDescName.style.display = 'block';
    
    const result = coinFlipFirstAction();
    let firstPlayer;
    if (result === 'Heads') {
        firstPlayer = 'Player1';
        console.log("Player 1 goes first!")

        updateCenterText("Player 1 goes first!")


    } else {
        firstPlayer = 'Player2';
        console.log("Player 2 goes first!")

        updateCenterText("Player 2 goes first!")
    }

    populateMainPlayerHand();
    replaceStarterHand();


    
    console.log("Accept works");
}

function coinFlipFirstAction() {
    
    const randomResult = Math.floor(Math.random() * 2);

    // Return 'Heads' for 0 and 'Tails' for 1
    return (randomResult === 0) ? 'Heads' : 'Tails';
}

let attackTargeting = false;
let attackPhase = false;

let atkMenu = document.getElementById("confirmAttackMenu");
let atkMenuYes = document.getElementById("yesConfirmAttack");
let atkMenuNo = document.getElementById("noConfirmAttack");
let phase = document.getElementById("mainPhase");

atkMenuYes.addEventListener('click', function() {
    console.log("Yes pressed");

    playPhase = false;
    attackPhase = true;
    console.log("attackPhase: ", attackPhase, "playPhase: ", playPhase);

    atkMenu.style.display = "none";
    atkMenuYes.style.display = "none";
    atkMenuNo.style.display = "none";
    phase.textContent = "ATTACK PHASE";
    phase.style.backgroundColor = "red";

    attackTargeting = true;

    centerText = document.getElementById("turn-system");
    centerText.style.display = "block";
    centerText.textContent = "SELECT ATTACK TARGET";

        console.log("Attack button works AFTER MENU CONFIRMATION", "ATTACK TARGET MODE : ", attackTargeting);

        if (attackButton) {
        document.body.removeChild(attackButton);
        attackButton = null;
        }


});

atkMenuNo.addEventListener('click', function() {
    console.log("No pressed");

    atkMenu.style.display = "none";
    atkMenuYes.style.display = "none";
    atkMenuNo.style.display = "none";
})

// Attack button
function handleAttackButtonClick(slot) {
    if(playPhase == true) {

        atkMenu.style.display = "block";
        atkMenuYes.style.display = "block";
        atkMenuNo.style.display = "block";

        document.body.removeChild(attackButton);
        
    }else{

        attackTargeting = true;

        console.log("Attack button works", "ATTACK TARGET MODE : ", attackTargeting);

        if (attackButton) {
        document.body.removeChild(attackButton);
        attackButton = null;
        }
    }
    console.log("ATTACK TARGET MODE : ", attackTargeting);
    
}
function handleConfirmAttackButtonClick(event) {
    console.log("Confirm attack button works");

    console.log("data-card-inplay attribute:", enemyTargetCard);

    enemyCard = JSON.parse(enemyTargetCard);

    console.log("enemyCard: ", enemyCard);

    console.log(chosenCard);
    console.log(enemyCard.chealth, chosenCard.attack);

    hPUpdate = battleCalculation(enemyCard.currentHealth, chosenCard.attack);
    console.log("hPUpdate: ", hPUpdate);

    console.log("enemyCard health1: ", enemyCard.health);
    console.log("enemyCard currentHP: ", enemyCard.currentHealth);
    enemyCard.currentHealth = hPUpdate;
    console.log("enemyCard health2: ", enemyCard.currentHealth);

    updateHPATKUI(enemyCard, enemyTarget);

    enemyTargetCard = JSON.stringify(enemyCard); // Update enemyTargetCard after modifying enemyCard
    console.log("enemyTargetCard after update: ", enemyTargetCard);

    enemyTarget.setAttribute("data-card-inplay", enemyTargetCard);

    if(hPUpdate <= 0) {
        // Assuming cardImage is the img element
        const cardImage = enemyTarget.querySelector('img');
        const cardHealthBox = enemyTarget.querySelector('#card-health-box');
        const cardAttackBox = enemyTarget.querySelector('#card-attack-box');
        if (cardImage && cardHealthBox && cardAttackBox) {
            cardImage.parentNode.removeChild(cardImage);
            cardHealthBox.style.display = 'none';
            cardAttackBox.style.display = 'none';
        }
        cardSendGraveyard(enemyCard);
    }

    if (confirmAttackButton) {
        document.body.removeChild(confirmAttackButton);
        confirmAttackButton = null;
    }
    document.body.removeChild(confirmAttackButton);
}




let attackButton = null;
let confirmAttackButton = null;

let abilityButton = null;

// attack targeting logic
let mainPlayerCard = null;
let enemyTargetCard = null;
let enemyTarget = null;

let clickedSlot = null;

let atkBtnRemove = false;
let abilityBtnRemove = false;

let totalCardsInPlay = 0;
let cardButtonContainer = null;

let cardInSlot = null;

let selectedBoardSpot = null;


// Function to handle the click on the board spot
function handleBoardSpotClick(event) {

    cardInSlot = event.currentTarget.getAttribute('data-card-inplay');
    cardInSlot2 = event.currentTarget.getAttribute('data-random-card');
    console.log("cardInSlot: " + cardInSlot);
    console.log(choosingSpot, event.currentTarget, choosingSummonCost, chooseSlot, cardInSlot);

    if (choosingSpot == false && event.currentTarget != null && attackTargeting == false && chooseSlot == false && choosingSummonCost == false && selectSpotForSpellActivation == false) {
        console.log(choosingSpot, event.currentTarget, choosingSummonCost, chooseSlot, cardInSlot);
        
        const slot = event.currentTarget;
        clickedSlot = slot;
        console.log("clickedSlot: ", clickedSlot);
        selectedBoardSpot = slot;
        id = slot.id;
        console.log("Selected slot: ", slot);
        console.log("Selected slot id: ", id);
        console.log(slot.getAttribute('data-card-inplay'));
        selectedCard = JSON.parse(slot.getAttribute('data-card-inplay'));
        
        console.log("Selected card: ", selectedCard);
    
        // Display the card sprite in the card-information-onclick element
        const cardInformationOnClick = document.getElementById('card-information-onclick');
        cardInformationOnClick.innerHTML = "";

        
    
        if (selectedCard != null) {
            const cardSpriteImage = document.createElement('img');
            cardSpriteImage.src = selectedCard.img;
            cardSpriteImage.alt = selectedCard.name;
    
            // Apply CSS styles to the image for fitting inside the container
            cardSpriteImage.style.maxWidth = '100%'; // Set the maximum width to 100% of the container
            cardSpriteImage.style.maxHeight = '100%'; // Set the maximum height to 100% of the container
    
            cardInformationOnClick.appendChild(cardSpriteImage);
        }
    
        // Update the card-desc-text-onclick with the chosen card's desc
        const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
        const cardDescName = document.getElementById('card-desc-name');
        cardDescTextOnClick.innerHTML = "";
        cardDescName.innerHTML = "";
    
        if (selectedCard != null) {
            const descParagraph = document.createElement('p');
            const descName = document.createElement('p');
            descName.textContent = selectedCard.name;
            descParagraph.textContent = "RANK: " + selectedCard.rank + " ATK: " + selectedCard.attack + " HP: " + selectedCard.health + " " + selectedCard.desc;
            cardDescTextOnClick.appendChild(descParagraph);
            cardDescName.appendChild(descName);
        }
    
        if (selectedCard != null && chooseSlot == false && choosingSummonCost == false && targetCard == false) {
            console.log(event.currentTarget.getAttribute('data-card-inplay'));
        
            // Create container for buttons
            if (!cardButtonContainer) {
                cardButtonContainer = document.createElement('div');
                cardButtonContainer.style.position = "absolute";
                cardButtonContainer.style.display = "flex"; // Ensures buttons stack vertically
                cardButtonContainer.style.flexDirection = "column"; // Stack buttons vertically
                document.body.appendChild(cardButtonContainer);
            }
        
            // Create attack button if not already created
            if (!attackButton) {
                attackButton = document.createElement('button');
                attackButton.textContent = "ATTACK";
                attackButton.addEventListener('click', () => handleAttackButtonClick(slot));
                cardButtonContainer.appendChild(attackButton);
            }
        
            // Create ability button if not already created
            if (!abilityButton) {
                abilityButton = document.createElement('button');
                abilityButton.textContent = "ABILITY";
                abilityButton.addEventListener('click', () => handleAbilityButtonClick(slot));
                cardButtonContainer.appendChild(abilityButton);
            }
        
            // Position button container
            cardButtonContainer.style.left = event.clientX + "px";
            cardButtonContainer.style.top = event.clientY + "px";
        
            
            
        }
        if (selectedCard == null) {
            console.log("removing buttons");
            if (abilityBtnRemove == true) {
                cardButtonContainer.removeChild(abilityButton);
                abilityButton = null; // Reset the button variable
            }
            if (atkBtnRemove == true) {
                cardButtonContainer.removeChild(attackButton);
                attackButton = null; // Reset the button variable
            }
        }
        if (targetCard == true){
            console.log("targetCard: ", selectedCard);
            console.log("target card slot id is ", id)
            if(selectedCard != null){
                console.log("target card: ", selectedCard);
                switch (cardEffect) {
                    case "One With Nature":
                        console.log("One With Nature effect works on target card: ", selectedCard);
                        selectedCard.currentHealth = selectedCard.health;
                        selectedCard.currentHealth++;
                        selectedCard.currentHealth++;
                        console.log(selectedCard.currentHealth);
                        selectedCard.currentAttack = selectedCard.attack;
                        console.log(selectedCard.currentAttack);
                        updateHPATKUI(selectedCard, clickedSlot);

                        targetCard = false;
                        console.log("Effect end, sending spell to graveyard");
                        console.log("slot id is ", slotIDForRemoval, slotId);

                        document.getElementById(slotIDForRemoval).remove();
                        board = document.getElementById(slotId);
                        board.style.backgroundImage = '';

                        

                        cardSendGraveyard(oneWithNature);

                        break;
                    
                }
            }
        }
        
    
        atkBtnRemove = true;
        abilityBtnRemove = true;
    }
    
    //regular summoning
    if (choosingSpot && event.currentTarget && !choosingSummonCost && !chooseSlot && (cardInSlot === "null" || cardInSlot === null)) {
        const assignCard = JSON.parse(cardInPlay);
        console.log("assignCard: ", assignCard);
    
        event.currentTarget.setAttribute("data-card-inplay", JSON.stringify(assignCard));
    
        const clickedBoardSpot = event.currentTarget;
        console.log("Clicked Board Spot:", clickedBoardSpot.id);
        chosenBoardSpot = clickedBoardSpot;

        chosenBoardSpot.style.backgroundImage = '';
    
        // Set the background image and styles for stretching
        chosenBoardSpot.style.backgroundImage = `url(${assignCard.img})`;
        chosenBoardSpot.style.backgroundSize = 'cover';
        chosenBoardSpot.style.backgroundPosition = 'center';
        chosenBoardSpot.style.backgroundRepeat = 'no-repeat';
    
        
    
    
    
    
    
    


        const parentElement = document.querySelector(".main-player-hand");
        parentID = parentElement.id;

        console.log(slotIDForRemoval);

        // Assuming slotIDForRemoval is the ID of the element you want to remove
        const elementToRemove = document.getElementById(slotIDForRemoval);

        // Check if the element to be removed exists before attempting to remove it
        if (elementToRemove && parentElement) {
        // Remove the element
            parentElement.removeChild(elementToRemove);
        }



        choosingSpot = false;
        if(assignCard.rank == 0){
            //usedFirst0Summon = true;
            console.log("usedFirst0Summon set to false: " + usedFirst0Summon);
        }
        totalCardsInPlay++;
        console.log("totalCardsInPlay: " + totalCardsInPlay);
        console.log("choosingSpot: " + choosingSpot);

    // Update card-health-box and card-attack-box with the summoned card's values
        const cardHealthBox = clickedBoardSpot.querySelector("#card-health-box");
        const cardAttackBox = clickedBoardSpot.querySelector("#card-attack-box");
        console.log(cardHealthBox);
        console.log(cardAttackBox);

        if (cardHealthBox && cardAttackBox) {
            cardHealthBox.style.display = "block";
            cardAttackBox.style.display = "block";
            cardHealthBox.textContent = assignCard.health;
            cardAttackBox.textContent = assignCard.attack;
        }

        checkForOngoingEffects();
        selectedBoardSpot = chosenBoardSpot;

        socket.emit("playerMove", chosenBoardSpot.id);

        socket.emit('summonCharacter', { card: selectedCard });

        if(chosenBoardSpot.id == ("mainboard-1")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain1", { select, chosenCard })
            mainboard1Occupied = true;
            console.log("mainboard1Occupied: " + mainboard1Occupied);
            
            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
            
        }
        if(chosenBoardSpot.id == ("mainboard-2")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain2", { select, chosenCard })
            mainboard2Occupied = true;
            console.log("mainboard2Occupied: " + mainboard2Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
            
        }
        if(chosenBoardSpot.id == ("mainboard-3")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain3", { select, chosenCard })
            mainboard3Occupied = true;
            console.log("mainboard3Occupied: " + mainboard3Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-4")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain4", { select, chosenCard })
            mainboard4Occupied = true;
            console.log("mainboard4Occupied: " + mainboard4Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-5")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain5", { select, chosenCard })
            mainboard5Occupied = true;
            console.log("mainboard5Occupied: " + mainboard5Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-6")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain6", { select, chosenCard })
            mainboard6Occupied = true;
            console.log("mainboard6Occupied: " + mainboard6Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-7")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain7", { select, chosenCard })
            mainboard7Occupied = true;
            console.log("mainboard7Occupied: " + mainboard7Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-8")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain8", { select, chosenCard })
            mainboard8Occupied = true;
            console.log("mainboard8Occupied: " + mainboard8Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-9")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain9", { select, chosenCard })
            mainboard9Occupied = true;
            console.log("mainboard9Occupied: " + mainboard9Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
        if(chosenBoardSpot.id == ("mainboard-10")){
            chosenCard = assignCard;
            console.log("chosenCard: ", chosenCard);
            select = chosenBoardSpot.id;
            socket.emit("cardPlayMain10", { select, chosenCard })
            mainboard7Occupied = true;
            console.log("mainboard10Occupied: " + mainboard10Occupied);

            console.log(player1);
            if(player1.role == true){
                sender = player1;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player1 action read");
            }
            else if(player2.role == true){
                sender = player2;
                socket.emit("enemySummonCharacter", { sender, select, chosenCard });
                console.log("player2 action read");
            }
        }
    }

    //summoning a card that required a sacrifice targetting
    if (chooseSlot == true && event.currentTarget != null && choosingSummonCost == false) {
        console.log(slotIDForRemoval);
        slotRemove = document.getElementById(slotIDForRemoval);
        parent = document.querySelector(".main-player-hand");

        parent.removeChild(slotRemove);


        taken = event.currentTarget.getAttribute('data-card-inplay');
        
        if(taken == null || taken == "null"){
            // Set the data-card-inplay attribute to the selected card
        
            
            console.log("Card about to be summoned: ", assignCard);
        
            // Assuming selectedCard is an object with properties like img, name, etc.
            const selectedCardData = JSON.stringify(assignCard);
        
            // Assign selectedCard to the data-card-inplay attribute
            event.currentTarget.setAttribute("data-card-inplay", selectedCardData);
        
            // Create an image element for the selected card
            const clickedBoardSpot = event.currentTarget;
            console.log("Clicked Board Spot:", clickedBoardSpot.id);
            chosenBoardSpot = clickedBoardSpot;

            chosenBoardSpot.style.backgroundImage = '';

            // Set the background image and styles for stretching
            chosenBoardSpot.style.backgroundImage = `url(${assignCard.img})`;
            chosenBoardSpot.style.backgroundSize = 'cover';
            chosenBoardSpot.style.backgroundPosition = 'center';
            chosenBoardSpot.style.backgroundRepeat = 'no-repeat';

            

            const cardHealthBox = chosenBoardSpot.querySelector('#card-health-box');
            const cardAttackBox = chosenBoardSpot.querySelector('#card-attack-box');
            console.log(cardHealthBox, cardAttackBox);

            cardHealthBox.style.display = "block";
            cardAttackBox.style.display = "block";
            console.log(cardHealthBox, cardAttackBox);

            cardHealthBox.textContent = assignCard.health;
            cardAttackBox.textContent = assignCard.attack;

            chooseSlot = false;
            totalCardsInPlay++;
            console.log("totalCardsInPlay: " + totalCardsInPlay);
            console.log(slot);

            checkForOngoingEffects();
            selectedBoardSpot = chosenBoardSpot;


            //activating on summon effects when card is summoned
            switch(assignCard.name){
                case "Garden Dweller":
                    console.log("Garden Dweller summoned, ongoing effect activating now");
                    
                    activateEffect(gardenDweller);
                
            }

            


        }else{
            console.log("Slot taken");
        }
            
    
    }

    // attack targeting
    if(attackTargeting == true && chosenBoardSpot != null){

        enemyTarget = event.currentTarget;

        enemyTargetCard = enemyTarget.getAttribute("data-card-inplay");

        let mainPlayerCard = chosenCard;

        console.log("mainPlayerCard: ", mainPlayerCard);
        console.log("boardspot: ", enemyTarget);
        console.log("data-card-inplay attribute:", enemyTargetCard);

        attackTargeting = false;

        console.log("attackTargeting: " + attackTargeting);

        if (!confirmAttackButton) {
            confirmAttackButton = document.createElement('button');
            confirmAttackButton.textContent = 'Confirm Attack';
            confirmAttackButton.addEventListener('click', handleConfirmAttackButtonClick);
            document.body.appendChild(confirmAttackButton);  

            confirmAttackButton.style.position = "fixed";
            confirmAttackButton.style.left = event.clientX + "px";
            confirmAttackButton.style.top = event.clientY + "px";
        }
        
    }

    // choosing summon cost after summon button click if card requires sacrifice(s)
    if (choosingSummonCost == true && event.currentTarget != null) {
        console.log("COST THAT MUST BE PAID IS :", price);

        target = event.currentTarget.getAttribute("data-card-inplay");

        console.log("card target", target);

        
        if (target != null) {
            targetCard = JSON.parse(target);
            console.log("targetCard: ", targetCard);
        
            console.log(target);
        
            // Remove the data-card-inplay attribute from the current target
            event.currentTarget.removeAttribute("data-card-inplay");
        
            // Get the updated value of the target attribute after removal
            target = event.currentTarget.getAttribute("data-card-inplay");
            console.log("AFTER REMOVAL: ", target);
        
            // Now, target will be null or undefined, representing an empty board slot
            cardSendGraveyard(targetCard);
            paid++;
            console.log("paid: ", paid);
            updateSelectCardToPaySummonCost();
            
            
            
        
            
            const cardHealthBox = event.currentTarget.querySelector('#card-health-box');
            const cardAttackBox = event.currentTarget.querySelector('#card-attack-box');

            if (cardHealthBox && cardAttackBox) {
                
                cardHealthBox.style.display = "none";
                cardAttackBox.style.display = "none";
            }

            event.currentTarget.style.backgroundImage = '';
            //check if payment is complete, if it is will activate click to summon
            paymentComplete();
            

            
        }
        
    }

    //select spot to play spell card on
    if (selectSpotForSpellActivation == true && event.currentTarget != null) {
        slotId = event.currentTarget.id;
        console.log("slotId: ", slotId);
        console.log(event.currentTarget, spell);

        if(slotId == "mainboard-6" || slotId == "mainboard-7" || slotId == "mainboard-8" || slotId == "mainboard-9" || slotId == "mainboard-10"){
            event.currentTarget.setAttribute("data-card-inplay", JSON.stringify(spell));

            cardInSpot = event.currentTarget.getAttribute("data-card-inplay");
        
            console.log("SPOT: ", cardInSpot);
        

            event.currentTarget.style.backgroundImage = '';
    
            // Set the background image and styles for stretching
            event.currentTarget.style.backgroundImage = `url(${spell.img})`;
            event.currentTarget.style.backgroundSize = 'cover';
            event.currentTarget.style.backgroundPosition = 'center';
            event.currentTarget.style.backgroundRepeat = 'no-repeat';
    
            selectSpotForSpellActivation = false;

            updateCenterText("Spell Activated!");

            activateEffect(spell, slotId);
        }
        else{
            console.log("Spells can only be played on the backrow board spots.");
        }




    }
    

        
}

function checkForOngoingEffects() {
    console.log("checking for ongoing effects...");

    returnAllCardsOnField();

    for(let i = 0; i < mainPlayerField.length; i++){
        let a = mainPlayerField[i];
        console.log("a before parse: ", a);
        let parsed = JSON.parse(a);
        
        let spotId = mainPlayerFieldId[i];

        console.log("parsed: ", parsed);
        console.log("spotId: ", spotId);

        if(parsed.name == "Garden Dweller"){
            console.log("found garden dweller for ongoing effect check on summon");

            let found = document.getElementById(spotId).getAttribute("data-card-inplay"); // Retrieve the HTML element by ID and then get its data-card-inplay attribute
            console.log("found: ", found, spotId);
            activateEffect(found, spotId);
        }
    }
}



function handleAbilityButtonClick(slot) {
    usedCard = selectedCard;
    console.log("Ability button clicked, card is: ", usedCard);

    activateEffect(usedCard);
}

let chooseSlot = false;
function paymentComplete(){
    if(paid >= price){
        chooseSlot = true;
        console.log("payment complete, choosing spot to summon now: " + chooseSlot);
        choosingSummonCost = false;
        totalCardsInPlay = totalCardsInPlay - paid;
        console.log("total cards in play: " + totalCardsInPlay);
        price = 0;
        paid = 0;

        var turnSystemElement = document.getElementById("turn-system");

        // Change the text content of the <p> element
        turnSystemElement.textContent = "SELECT BOARD SPOT TO SUMMON CARD";

    }
}








function updateMainDeckSize() {
    const mainDeckElement = document.getElementById('main-player-deck');
    const deckSize = player1Deck.length;
    const maxDeckSize = 40; // Assuming a maximum deck size of 40

    // Update the text content with the current and maximum deck size
    mainDeckElement.textContent = `MAIN DECK ${deckSize}/${maxDeckSize}`;
    console.log(`Main deck size: ${deckSize}/${maxDeckSize}`);
}

function battleCalculation(targetHP, damage) {
    finalHP = targetHP - damage;

    console.log("finalHP: " + finalHP);
    return finalHP;
}

function updateHPATKUI(card, boardSpot) {

    console.log(card);
    console.log(boardSpot);
    
    const healthUI = boardSpot.querySelector('#card-health-box');
    console.log(healthUI);

    const attackUI = boardSpot.querySelector('#card-attack-box');
    console.log(attackUI);

    
    console.log("card health: ", card.currentHealth);
    console.log("card attack: ", card.currentAttack);
    atk = card.currentAttack;
    hp = card.currentHealth;
    healthUI.textContent = hp;
    healthUI.style.display = 'block';

    attackUI.textContent = atk;
    attackUI.style.display = 'block';

    

}

let mainPlayerGraveyard = [];

function cardSendGraveyard(card){

    mainPlayerGraveyard.push(card);
    console.log("mainPlayerGraveyard: ", mainPlayerGraveyard);
    updateMainPlayerGraveyardNumber();
    openSlot = findAvailableGraveyardSlot();
    console.log("openSlot: ", openSlot);
    assignGraveyardSlot(card, openSlot);
    
}

let graveyardDiv = document.getElementById('main-player-graveyard');

function updateMainPlayerGraveyardNumber(){
    if (graveyardDiv) {
        graveyardDiv.textContent = `graveyard (${mainPlayerGraveyard.length})`;
    }
}

graveyardDiv.addEventListener('click', function(){
    toggleGraveyardMenu();
})
function findAvailableGraveyardSlot(){
    for (let i = 1; i <= 40; i++) {
        if ($('#graveyard-ui-menu-card-' + i).attr('data-card') === '') {
            return i;
        }
    }
    return null;
}
function assignGraveyardSlot(card, slot) {
    let selectSlot = $('#graveyard-ui-menu-card-' + slot);
    
    // Convert the card object to a JSON-formatted string
    let cardString = JSON.stringify(card);

    // Assign the JSON-formatted string to the data-card attribute
    selectSlot.attr('data-card', cardString);

    let img = card.img;

    // Append an image element with the card image and add styling
    selectSlot.html('<img src="' + img + '" alt="Card image" style="max-width: 100%; max-height: 100%;">');
}

function toggleGraveyardMenu(){
    const graveyardMenu = document.getElementById('graveyard-ui-menu');
    if (graveyardMenu.style.display === 'none') {
        graveyardMenu.style.display = 'block';
    }
    var exitButton = document.getElementById('graveyard-ui-menu-close');

    if (exitButton) {
        exitButton.addEventListener('click', function () {
            // Add your exit button click logic here
            console.log('EXIT button clicked!');
            graveyardMenu.style.display = 'none';


        });
    }
}
var listItems = document.querySelectorAll('.graveyard-ui-menu-card');

// Iterate over each list item and attach an event listener
listItems.forEach(function (item) {
    item.addEventListener('click', function () {
                // Do something when the list item is clicked
                console.log('List item clicked:', item.id);
                testCard = JSON.parse(item.getAttribute('data-card'));
                console.log(testCard);

                const cardInformationOnClick = document.getElementById('card-information-onclick');
                cardInformationOnClick.innerHTML = "";
        
                const cardSpriteImage = document.createElement('img');
                cardSpriteImage.src = testCard.img;
                cardSpriteImage.alt = testCard.name;
                cardInformationOnClick.appendChild(cardSpriteImage);

                // Update the card-desc-text-onclick with the chosen card's desc
                const cardDescTextOnClick = document.getElementById('card-desc-text-onclick');
                cardDescTextOnClick.innerHTML = "";

                const descParagraph = document.createElement('p');
                descParagraph.textContent = "RANK: " + testCard.rank + " ATK: " + testCard.attack + " HP: " + testCard.health + " " + testCard.desc;
                cardDescTextOnClick.appendChild(descParagraph);

    });
});

let choosingSummonCost = false;
let price = 0;
let pricePaid = false;
let paid = 0;

function paySummonCost(card){
    console.log("paySummonCost works");
    console.log(card);

    choosingSpot = false;

    price = card.rank;
    
    console.log("price: ", price);

    // Access the <p> element by its id
    var turnSystemElement = document.getElementById("turn-system");

    // Change the text content of the <p> element
    turnSystemElement.textContent = "SELECT CARDS TO PAY SUMMON COST: " + paid + "/" + price; 
    
    choosingSummonCost = true;
    assignCard = card;
    console.log("assignCard: ", assignCard);
}
function updateSelectCardToPaySummonCost(){
    var turnSystemElement = document.getElementById("turn-system");

    // Change the text content of the <p> element
    turnSystemElement.textContent = "SELECT CARDS TO PAY SUMMON COST: " + paid + "/" + price;
}

let mainHand = [];

// Assuming you have a loop where you generate the slots
for (let i = 1; i <= 7; i++) {
    const slotId = `player-hand-${i}`;
    const slotElement = document.getElementById(slotId);

    if (slotElement) {
        mainHand.push(slotElement);
    }
}
console.log("mainHand: ", mainHand);


function drawCard() {
    // Check if there are cards left in the deck
    if (player1Deck.length === 0) {
        console.log("No cards left in the deck.");
        return null; // or handle accordingly based on your use case
    }

    // Get a random index to select a card from the deck
    const randomIndex = Math.floor(Math.random() * player1Deck.length);

    console.log("Deck BEFORE card removed", player1Deck);

    // Remove the selected card from the deck
    const drawnCard = player1Deck.splice(randomIndex, 1)[0];

    console.log("Drew a card:", drawnCard);
    console.log("Deck: ", player1Deck);
    console.log("mainHand: ", mainHand);

    const emptySlot = findFirstEmptySlot();

    if (emptySlot) {
        emptySlot.setAttribute("data-random-card", JSON.stringify(drawnCard));
        console.log("emptySlot: ", emptySlot);
        emptySlot.style.display = "block";
        emptySlot.innerHTML = "";

        const cardImage = document.createElement('img');
        cardImage.src = drawnCard.img;
        cardImage.alt = drawnCard.name;

        cardImage.style.width = '100%';
        cardImage.style.height = '100%';
        cardImage.style.objectFit = 'cover';

        // Append the card image to the emptySlot
        emptySlot.appendChild(cardImage);

        let costBox = emptySlot.querySelector('#card-cost-box');

            // If cost box doesn't exist, create it
            if (!costBox) {
                costBox = document.createElement('div');
                costBox.className = 'card-cost-box'; // Change id to class
                costBox.style.position = 'absolute';
                costBox.style.top = '5px';
                costBox.style.left = '5px';
                costBox.style.width = '20px';
                costBox.style.height = '20px';
                costBox.style.backgroundColor = 'rgb(42, 204, 245)';
                costBox.style.color = 'black';
                costBox.style.display = 'flex';
                costBox.style.justifyContent = 'center';
                costBox.style.alignItems = 'center';
                costBox.style.zIndex = '1';

                // Add the cost box to the slot
                emptySlot.appendChild(costBox);
            }

            // Update the content of the cost box
            costBox.innerText = drawnCard.rank;

            
    }
    updateMainDeckSize();
    return drawnCard;
}


function updateCenterText(string){
    // Access the <p> element by its id
    var turnSystemElement = document.getElementById("turn-system");

    // Change the text content of the <p> element
    turnSystemElement.textContent = string; 
}

let starterHand = [];
let starterSlots = [];
let selectedCardsToReplace = [];
let selectedSlotsToReplace = [];

let selectingReplacingCards = false;

function replaceStarterHand() {
    console.log("replaceStarterHand works");
    console.log(mainPlayerHandSlots);

    for (let i = 0; i < mainPlayerHandSlots.length; i++) {
        const currentSlot = mainPlayerHandSlots[i];
        console.log(currentSlot);

        const dataCard = JSON.parse(currentSlot.getAttribute('data-random-card'));
        const parent = currentSlot.id;
        console.log(parent);
        console.log(dataCard);

        if (dataCard) {
            console.log("has card");
            starterHand.push(dataCard);
            starterSlots.push(parent);

            
            
            console.log(parent);
        } else {
            console.log("no card");
        }
    }

    console.log("starterHand: ", starterHand);
    console.log("starterSlots: ", starterSlots);

    selectingReplacingCards = true;
}
//DONE button for reshuffle starter hand cards
document.getElementById('replace-hand-done').addEventListener('click', function () {
    console.log("DONE button clicked");
    selectingReplacingCards = false;
    console.log("selectingReplacingCards: ", selectingReplacingCards);
    addReplacementToDeck();
  
    console.log(selectedSlotsToReplace);
    
  
    // Iterate through the array and remove the "selected-card-highlight" div from each hand slot
    selectedSlotsToReplace.forEach(slot => {
      slot.classList.remove('selected-card-highlight');
    });

    drawCard();

    playPhase = true;
    console.log("playPhase: ", playPhase);

    play = document.getElementById('mainPhase');
    play.style.display = 'block';

    turn = document.getElementById('turn-system');
    turn.style.display = 'none';

    endTurn = document.getElementById('endTurn');
    endTurn.style.display = 'block';


});

let endTurnButton = document.getElementById('endTurn');
let isEnemyTurn = false;

//END TURN button
endTurnButton.addEventListener('click', function () {
    console.log("END TURN button clicked");

    isEnemyTurn = true;

    endTurnButton.textContent = '';
    endTurnButton.style.backgroundColor = 'rgb(43, 36, 36)';
    endTurnButton.style.opacity = 0;

    // Set new background properties with a slower animation duration (e.g., 10s)
    endTurnButton.style.background = "rgba(0, 0, 0, 0.1) url('effects/magic-stars.gif') center center no-repeat";
    endTurnButton.style.backgroundSize = "cover";
    endTurnButton.style.animation = "slowBackground 10s infinite linear"; // Adjust the duration as needed

    // Trigger reflow before transitioning to ensure the fade-in effect
    endTurnButton.offsetWidth;

    // Fade in the button by setting opacity to 1 with a longer duration (e.g., 1.5s)
    endTurnButton.style.transition = "opacity 1.5s";
    endTurnButton.style.opacity = 1;

    changePhase = document.getElementById('mainPhase');

    changePhase.textContent = 'ENEMY TURN';
    changePhase.style.backgroundColor = '#662c2c';
    changePhase.style.border = '1px solid #000';
    changePhase.style.borderStyle = 'solid';
    

});

function addReplacementToDeck() {
    console.log("addReplacementToDeck works");
    console.log(selectedCardsToReplace);

    for (let i = 0; i < selectedCardsToReplace.length; i++) {
        const card = selectedCardsToReplace[i];
        console.log(card);
        player1Deck.push(card);
    }

    console.log(player1Deck);
    updateMainDeckSize();

    for (let i = 0; i < selectedSlotsToReplace.length; i++) {
        const slotId = selectedSlotsToReplace[i];
        console.log(slotId);

        // Assuming each image is directly a child of the slot
        const slot = document.getElementById(slotId);
        console.log(slot);

        if (slot) {
            // Remove all child elements (including the image)
            while (slot.firstChild) {
                slot.removeChild(slot.firstChild);
            }

            // Remove the card-cost-box element
            const cardCostBox = slot.querySelector(".card-cost-box");
            if (cardCostBox) {
                slot.removeChild(cardCostBox);
            }

            console.log(`Cleared content for slot ${slotId}`);
        } else {
            console.log(`No slot found for id ${slotId}`);
        }
    }
    drawReplacementHand();
}
function drawReplacementHand() {
    console.log("drawReplacementHand works");
    console.log(player1Deck);
    console.log(selectedSlotsToReplace);

    for (let i = 0; i < selectedSlotsToReplace.length; i++) {
        console.log(selectedSlotsToReplace[i]);

        const slot = selectedSlotsToReplace[i];

        // Check if the slot exists and there are cards in the deck
        if (slot && player1Deck.length > 0) {
            // Pop a random card from the deck
            const randomIndex = Math.floor(Math.random() * player1Deck.length);
            const rCard = player1Deck.splice(randomIndex, 1)[0];
            console.log(player1Deck);
            updateMainDeckSize();

            // Do something with the random card, e.g., update the slot content
            if (rCard) {
                // Clear previous content
                slot.innerHTML = '';

                // Create an image element for the card
                const cardImage = document.createElement('img');
                cardImage.src = rCard.img;
                cardImage.alt = rCard.name;

                // Add the image to the slot
                slot.appendChild(cardImage);

                // Create or find the existing cost box
                let costBox = slot.querySelector('.card-cost-box');

                // If cost box doesn't exist, create it
                if (!costBox) {
                    costBox = document.createElement('div');
                    costBox.className = 'card-cost-box'; // Change id to class
                    costBox.style.position = 'absolute';
                    costBox.style.top = '5px';
                    costBox.style.left = '5px';
                    costBox.style.width = '20px';
                    costBox.style.height = '20px';
                    costBox.style.backgroundColor = 'rgb(42, 204, 245)';
                    costBox.style.color = 'black';
                    costBox.style.display = 'flex';
                    costBox.style.justifyContent = 'center';
                    costBox.style.alignItems = 'center';
                    costBox.style.zIndex = '1';

                    // Add the cost box to the slot
                    slot.appendChild(costBox);
                }

                // Update the content of the cost box
                costBox.innerText = rCard.rank;

                // Set the data attribute for the card
                slot.setAttribute('data-random-card', JSON.stringify(rCard));
            }
        }
    }
    
    t = document.querySelector('.starter-hand-text');
    b = document.querySelector('#replace-hand-done');
    t.style.display = 'none';
    b.style.display = 'none';
}
function findFirstEmptySlot() {
    for (let i = 0; i < mainHand.length; i++) {
        const slot = mainHand[i];
        const cardInPlayElement = slot.getAttribute('data-random-card');
        

        if (!cardInPlayElement) {
            // If the slot doesn't have a data-card-inplay element, return the slot
            return slot;
        }
    }

    // If all slots have a data-card-inplay element, return null or handle accordingly
    return null;
}

collectionBtn = document.querySelector('#collection');
collectionMenu = document.querySelector('#collection-list');

//main menu open all cards button
collectionBtn.addEventListener('click', () => {
    console.log("collectionBtn works");
    buttonContainer = document.querySelector('#button-container');
    deckContainer = document.querySelector('#deck-container');

    deckContainer.style.display = 'none';
    buttonContainer.style.display = 'none';
    document.body.classList.toggle("no-background");
    collectionMenu.style.display = 'block';

    for(let i = 1; i <= allCards.length; i++) {
        slot = findOpenCollectionSlot();
        console.log(slot);
        openSlotID = "#collection-card-" + slot;

        assignCollectionSlot(allCards[i-1], slot);
    }

    
    

    
})


collectionHoverCardText = document.querySelector('#collection-card-info');

function findOpenCollectionSlot() {
    for (let i = 1; i <= allCards.length; i++) {
        if ($('#collection-card-' + i).attr('data-card') === '') {
            return i;
        }
    }
    return null;
}
function assignCollectionSlot(card, slot) {
    let selectSlot = $('#collection-card-' + slot);
    
    // Convert the card object to a JSON-formatted string
    let cardString = JSON.stringify(card);

    // Assign the JSON-formatted string to the data-card attribute
    selectSlot.attr('data-card', cardString);

    // Parse the JSON-formatted string back to an object
    let parsedCard = JSON.parse(cardString);

    // Access the img property from the parsed card object
    let img = parsedCard.img;

    // Append an image element with the card image and add styling, along with the card name and description
    selectSlot.html('<img src="' + img + '" alt="Card image" style="max-width: 100%; max-height: 100%;"> <p>' + parsedCard.name + '</p><p id="collection-card-info" class="collection-card-info">' + parsedCard.desc + '</p>/<div id="collection-card-healthbox" class="collection-card-healthbox">' + parsedCard.health + '</div><div id="collection-card-attackbox" class="collection-card-attackbox">' + parsedCard.attack + '</div><div id="collection-card-costbox" class="collection-card-costbox">' + parsedCard.rank + '</div>');

    


}


collectionExitBtn = document.querySelector('#collection-exit');

// Function to execute when mouse enters .collection-card
function handleCollectionCardMouseEnter(event) {
    // Add your code here
    console.log('Mouse entered .collection-card', event.target);

    let cardInfo = event.target.querySelector('.collection-card-info');
    console.log(cardInfo);

    cardInfo.style.display = 'block';
}

// Function to execute when mouse leaves .collection-card
function handleCollectionCardMouseLeave(event) {
    // Add your code here
    console.log('Mouse left .collection-card');

    let cardInfo = event.target.querySelector('.collection-card-info');
    console.log(cardInfo);

    cardInfo.style.display = 'none';
}

// Select all elements with the class .collection-card
let collectionCards = document.querySelectorAll('.collection-card');

// Add event listeners to each .collection-card element
collectionCards.forEach(function(card) {
    card.addEventListener('mouseenter', handleCollectionCardMouseEnter);
    card.addEventListener('mouseleave', handleCollectionCardMouseLeave);
});

let targetCard = false;
let cardEffect = null;

function activateEffect(card, id) {
    console.log("Activate effect works, activating ability for ", card, id);
    
    console.log(card.name);
    
    if (card.name) {
        switch (card.name) {
            case "Garden Dweller":
                console.log("Garden Dweller works");
                let atkGain = 0;
                let healthGain = 0;
                
                returnAllCardsOnField();
                
                for (let i = 0; i < mainPlayerField.length; i++) {
                    let a = mainPlayerField[i];
                    console.log(a, i);
                    let parsed = JSON.parse(a);
                    if (parsed.trait == "PLANT") {
                        console.log("Found a plant", i);
                        atkGain++;
                        healthGain++;
                    }
                }
                
                console.log(atkGain, healthGain);
                
                console.log("original card ability used slot:", selectedBoardSpot, id);
                
                origCardID = document.getElementById(id);
                
                let origCardHP = origCardID.querySelector("#card-health-box");
                let origCardATK = origCardID.querySelector("#card-attack-box");
                
                if (origCardHP && origCardATK) {
                    origCardHP.innerHTML = gardenDweller.defaultHP + healthGain;
                    origCardATK.innerHTML = gardenDweller.defaultATK + atkGain;
                }
                
                break;
            case "One With Nature":
                console.log("One with Nature works");
                
                returnAllCardsOnField();
                
                for (let i = 0; i < mainPlayerField.length; i++) {
                    let a = mainPlayerField[i];
                    let id = mainPlayerFieldId[i];
                    parse = JSON.parse(a);
                    
                    console.log(a, i, id, parse);
                    
                    if (parse.trait == "TROOP") {
                        console.log("Found a Troop", parse);
                        targetCard = true;
                        cardEffect = "One With Nature";
                        console.log("looking for target on", targetCard, cardEffect);

                        updateCenterText("Select friendly Troop to target");
                    }
                }
                
                break;
        }
    } else {
        console.log("No card found");
        parse = JSON.parse(card);
        console.log(parse);
        
        switch (parse.name) {
            case "Garden Dweller":
                console.log("Garden Dweller works");
                let atkGain = 0;
                let healthGain = 0;
                
                returnAllCardsOnField();
                
                for (let i = 0; i < mainPlayerField.length; i++) {
                    let a = mainPlayerField[i];
                    console.log(a, i);
                    let parsed = JSON.parse(a);
                    if (parsed.trait == "PLANT") {
                        console.log("Found a plant", i);
                        atkGain++;
                        healthGain++;
                    }
                }
                
                console.log(atkGain, healthGain);
                
                console.log("original card ability used slot:", id);
                
                origCardID = document.getElementById(id);
                
                let origCardHP = origCardID.querySelector("#card-health-box");
                let origCardATK = origCardID.querySelector("#card-attack-box");
                
                if (origCardHP && origCardATK) {
                    origCardHP.innerHTML = gardenDweller.defaultHP + healthGain;
                    origCardATK.innerHTML = gardenDweller.defaultATK + atkGain;
                }
                
                break;
            case "One With Nature":
                console.log("One with Nature works");
                break;
        }
    }
}






let enemyField = [];
let enemyFieldId = [];
let mainPlayerField = [];
let mainPlayerFieldId = [];

// Function to return the number of all cards in play on the board
function returnAllCardsOnField() {
    var enemyBoardSpots = document.querySelectorAll('#player2-board .board-spot');

    enemyField.length = 0;
    enemyFieldId.length = 0;
    mainPlayerField.length = 0;
    mainPlayerFieldId.length = 0;

    enemyBoardSpots.forEach(function(boardSpot) {
        var cardInPlay = boardSpot.getAttribute('data-card-inplay');
        console.log('Data-card-inplay for ' + boardSpot.id + ': ' + cardInPlay);
        if(cardInPlay != null && cardInPlay != 'null'){
            enemyField.push(cardInPlay);
            enemyFieldId.push(boardSpot.id);
            console.log(enemyField, enemyFieldId);
        }
    });

    var playerBoardSpots = document.querySelectorAll('#player1-board .board-spot');

    playerBoardSpots.forEach(function(boardSpot) {
        var cardInPlay = boardSpot.getAttribute('data-card-inplay');
        console.log('Data-card-inplay for ' + boardSpot.id + ': ' + cardInPlay);
        if(cardInPlay != null && cardInPlay != 'null'){
            mainPlayerField.push(cardInPlay);
            mainPlayerFieldId.push(boardSpot.id);
            console.log(mainPlayerField, mainPlayerFieldId);
        }
            
    });
}

//test return all cards on board *working fine*
document.getElementById('testAllCardsOnBoard').addEventListener('click', function() {
    console.log("testAllCardsOnBoard works");
    returnAllCardsOnField();
    
})

//add specific card to player deck for testing purpose
document.getElementById('testBTN').addEventListener('click', function() {
    console.log("testBTN works");
    addCardToDeck(oneWithNature);
    
})

collectionExitBtn.addEventListener('click', function() {
    console.log("exit collection menu button works");

    collectionMenu.style.display = 'none';

    returnToArenaCardPick();

})

//return to main pick a card menu screen
function returnToArenaCardPick() {
    console.log("returnToArenaCardPick works");

    // Assuming these are global variables
    var buttonContainer = document.querySelector('#button-container');
    var deckContainer = document.querySelector('#deck-container');

    // Toggle background class on body
    document.body.classList.toggle("no-background");

    // Set display styles for buttonContainer and deckContainer
    buttonContainer.style.display = 'flex'; // Use flexbox to make the elements responsive
    deckContainer.style.display = 'flex'; // Use flexbox to make the elements responsive

    // Additional styles for responsiveness
    
    buttonContainer.style.justifyContent = 'center'; // Center items vertically
    deckContainer.style.justifyContent = 'center'; // Center items vertically
    
}

function addCardToDeck(card) {
    console.log("addCardToDeck works");

    player1Deck.push(card);
    updatePlayerDeck();
}

