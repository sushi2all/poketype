/**
 * Pokémon Type Effectiveness Chart
 * 
 * This Map represents the type matchup chart for Pokémon battles.
 * Structure: Map<AttackingType, Map<DefendingType, Multiplier>>
 * 
 * Only non-neutral effectiveness values are stored (≠ 1x).
 * If a matchup is not present, it defaults to 1x (normal effectiveness).
 * 
 * Multipliers:
 * - 2x = Super effective
 * - 0.5x = Not very effective  
 * - 0x = No effect (immune)
 */

export const typeChart = new Map([
  ['normal', new Map([
    ['rock', 0.5],
    ['ghost', 0],
    ['steel', 0.5]
  ])],
  
  ['fire', new Map([
    ['fire', 0.5],
    ['water', 0.5],
    ['grass', 2],
    ['ice', 2],
    ['bug', 2],
    ['rock', 0.5],
    ['dragon', 0.5],
    ['steel', 2]
  ])],
  
  ['water', new Map([
    ['fire', 2],
    ['water', 0.5],
    ['grass', 0.5],
    ['ground', 2],
    ['rock', 2],
    ['dragon', 0.5]
  ])],
  
  ['electric', new Map([
    ['water', 2],
    ['electric', 0.5],
    ['grass', 0.5],
    ['ground', 0],
    ['flying', 2],
    ['dragon', 0.5]
  ])],
  
  ['grass', new Map([
    ['fire', 0.5],
    ['water', 2],
    ['grass', 0.5],
    ['poison', 0.5],
    ['ground', 2],
    ['flying', 0.5],
    ['bug', 0.5],
    ['rock', 2],
    ['dragon', 0.5],
    ['steel', 0.5]
  ])],
  
  ['ice', new Map([
    ['fire', 0.5],
    ['water', 0.5],
    ['grass', 2],
    ['ice', 0.5],
    ['ground', 2],
    ['flying', 2],
    ['dragon', 2],
    ['steel', 0.5]
  ])],
  
  ['fighting', new Map([
    ['normal', 2],
    ['ice', 2],
    ['poison', 0.5],
    ['flying', 0.5],
    ['psychic', 0.5],
    ['bug', 0.5],
    ['rock', 2],
    ['ghost', 0],
    ['dark', 2],
    ['steel', 2],
    ['fairy', 0.5]
  ])],
  
  ['poison', new Map([
    ['grass', 2],
    ['poison', 0.5],
    ['ground', 0.5],
    ['rock', 0.5],
    ['ghost', 0.5],
    ['steel', 0],
    ['fairy', 2]
  ])],
  
  ['ground', new Map([
    ['fire', 2],
    ['electric', 2],
    ['grass', 0.5],
    ['poison', 2],
    ['flying', 0],
    ['bug', 0.5],
    ['rock', 2],
    ['steel', 2]
  ])],
  
  ['flying', new Map([
    ['electric', 0.5],
    ['grass', 2],
    ['fighting', 2],
    ['bug', 2],
    ['rock', 0.5],
    ['steel', 0.5]
  ])],
  
  ['psychic', new Map([
    ['fighting', 2],
    ['poison', 2],
    ['psychic', 0.5],
    ['dark', 0],
    ['steel', 0.5]
  ])],
  
  ['bug', new Map([
    ['fire', 0.5],
    ['grass', 2],
    ['fighting', 0.5],
    ['poison', 0.5],
    ['flying', 0.5],
    ['psychic', 2],
    ['ghost', 0.5],
    ['dark', 2],
    ['steel', 0.5],
    ['fairy', 0.5]
  ])],
  
  ['rock', new Map([
    ['fire', 2],
    ['ice', 2],
    ['fighting', 0.5],
    ['ground', 0.5],
    ['flying', 2],
    ['bug', 2],
    ['steel', 0.5]
  ])],
  
  ['ghost', new Map([
    ['normal', 0],
    ['psychic', 2],
    ['ghost', 2],
    ['dark', 0.5]
  ])],
  
  ['dragon', new Map([
    ['dragon', 2],
    ['steel', 0.5],
    ['fairy', 0]
  ])],
  
  ['dark', new Map([
    ['fighting', 0.5],
    ['psychic', 2],
    ['ghost', 2],
    ['dark', 0.5],
    ['fairy', 0.5]
  ])],
  
  ['steel', new Map([
    ['fire', 0.5],
    ['water', 0.5],
    ['electric', 0.5],
    ['ice', 2],
    ['rock', 2],
    ['steel', 0.5],
    ['fairy', 2]
  ])],
  
  ['fairy', new Map([
    ['fire', 0.5],
    ['fighting', 2],
    ['poison', 0.5],
    ['dragon', 2],
    ['dark', 2],
    ['steel', 0.5]
  ])]
]);

/**
 * All Pokémon types in the game
 */
export const allTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

/**
 * Get the effectiveness of an attacking type against a defending type
 * @param {string} attackType - The type of the attacking move
 * @param {string} defenseType - The type of the defending Pokémon
 * @returns {number} Multiplier (0, 0.5, 1, or 2)
 */
export function getAttackEffectiveness(attackType, defenseType) {
  return typeChart.get(attackType)?.get(defenseType) ?? 1;
}

/**
 * Get combined effectiveness for dual-type Pokémon
 * @param {string} attackType - The type of the attacking move
 * @param {string[]} defenseTypes - Array of defending Pokémon types (1 or 2)
 * @returns {number} Combined multiplier
 */
export function getCombinedEffectiveness(attackType, defenseTypes) {
  let multiplier = 1;
  for (const defType of defenseTypes) {
    multiplier *= getAttackEffectiveness(attackType, defType);
  }
  return multiplier;
}

/**
 * Get all move types that are super effective against the opponent
 * @param {string[]} opponentTypes - Array of opponent's types (1 or 2)
 * @returns {Array<{type: string, multiplier: number}>}
 */
export function getSuperEffectiveMoves(opponentTypes) {
  const result = [];
  
  for (const attackType of allTypes) {
    const effectiveness = getCombinedEffectiveness(attackType, opponentTypes);
    if (effectiveness > 1) {
      result.push({ type: attackType, multiplier: effectiveness });
    }
  }
  
  return result.sort((a, b) => b.multiplier - a.multiplier);
}

/**
 * Get all move types that are not very effective against the opponent
 * @param {string[]} opponentTypes - Array of opponent's types (1 or 2)
 * @returns {Array<{type: string, multiplier: number}>}
 */
export function getNotVeryEffectiveMoves(opponentTypes) {
  const result = [];
  
  for (const attackType of allTypes) {
    const effectiveness = getCombinedEffectiveness(attackType, opponentTypes);
    if (effectiveness < 1) {
      result.push({ type: attackType, multiplier: effectiveness });
    }
  }
  
  return result.sort((a, b) => a.multiplier - b.multiplier);
}

/**
 * Get Pokémon types that resist the opponent's moves (defensive advantage)
 * Assumes opponent uses moves of their own type(s)
 * @param {string[]} opponentTypes - Array of opponent's types (1 or 2)
 * @returns {Array<{type: string, resistances: Array<{moveType: string, multiplier: number}>}>}
 */
export function getResistantPokemonTypes(opponentTypes) {
  const result = [];
  
  for (const defenseType of allTypes) {
    const resistances = [];
    let isResistant = false;
    
    for (const opponentType of opponentTypes) {
      const effectiveness = getAttackEffectiveness(opponentType, defenseType);
      resistances.push({ moveType: opponentType, multiplier: effectiveness });
      
      if (effectiveness <= 0.5) {
        isResistant = true;
      }
    }
    
    if (isResistant) {
      result.push({ type: defenseType, resistances });
    }
  }
  
  return result;
}

/**
 * Get Pokémon types that are weak to the opponent's moves (should avoid)
 * @param {string[]} opponentTypes - Array of opponent's types (1 or 2)
 * @returns {Array<{type: string, weaknesses: Array<{moveType: string, multiplier: number}>}>}
 */
export function getWeakPokemonTypes(opponentTypes) {
  const result = [];
  
  for (const defenseType of allTypes) {
    const weaknesses = [];
    let isWeak = false;
    
    for (const opponentType of opponentTypes) {
      const effectiveness = getAttackEffectiveness(opponentType, defenseType);
      weaknesses.push({ moveType: opponentType, multiplier: effectiveness });
      
      if (effectiveness >= 2) {
        isWeak = true;
      }
    }
    
    if (isWeak) {
      result.push({ type: defenseType, weaknesses });
    }
  }
  
  return result;
}

