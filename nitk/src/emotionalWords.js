const emotionalWords = {
    harasser: new Set([
      "come", "resist", "shut", "scream", "run", "hurt", "help", "live", "fault", 
      "believe", "alone", "save", "crying", "quiet", "closer", "beautiful", "disappear", 
      "grateful", "escape", "fight", "worse"
    ]),
  
    victim: new Set([
      "help", "stop", "please", "begging", "let", "touch", "scream", "away", "home", 
      "family", "trouble", "die", "hurt", "wrong", "breathe", "police", "promise", "not safe"
    ]),
  
    manipulation: new Set([
      "cares", "worthless", "believe", "regret", "deal", "yourself", "favor", 
      "baby", "overreacting", "game", "nice", "lucky", "worse", "lesson"
    ]),
  
    defense: new Set([
      "police", "help", "weapon", "defense", "afraid", "fight", "watching", 
      "illegal", "face", "regret", "friends", "photo", "jail", "filming", "alone"
    ]),
  
    fear: new Set([
      "panic", "terror", "paralyzed", "trembling", "heart", "frozen", "sweating", 
      "breathing", "paranoia", "cornered", "trapped", "isolated", "helpless", 
      "nauseous", "crying", "shaking", "hiding", "vulnerable", "alone", 
      "disoriented", "intimidated", "claustrophobic", "shivering"
    ]),
  
    anger: new Set([
      "lost", "dare", "away", "touch", "disgusting", "scared", "coward", "control", 
      "pay", "wrong", "scare", "regret", "property", "victim", "sick", "hands", "angry"
    ]),
  
    legal: new Set([
      "police", "lawyer", "restraining", "lawsuit", "jail", "assault", "battery", 
      "evidence", "record", "witness", "charge", "arrest", "criminal", "crime", 
      "statement", "investigation", "emergency", "surveillance", "security", "court", 
      "protection", "rights", "self-defense"
    ]),
  
    abuse: new Set([
      "slut", "whore", "bitch", "worthless", "trash", "nobody", "dumb", "ugly", 
      "fat", "idiot", "easy", "stupid", "good", "spoiled", "cheap", "prey"
    ])
  };
  
  export default emotionalWords;
  