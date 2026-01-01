/**
 * Pokémon type colors - matching the provided icon set
 */
export const typeColors = {
  bug: '#A2A21D',
  dark: '#4E4446',
  dragon: '#6658A5',
  electric: '#E2BD22',
  fairy: '#E28EE3',
  fighting: '#E7921C',
  fire: '#E65F3A',
  flying: '#74ADD3',
  ghost: '#70426F',
  grass: '#419B35',
  ground: '#A6763A',
  ice: '#4ECCCC',
  normal: '#858585',
  poison: '#9953C6',
  psychic: '#E86D8F',
  rock: '#ACA77E',
  steel: '#6CADC8',
  water: '#2F9BE5',
};

/**
 * Get contrasting text color for a given type
 * @param {string} type - The Pokémon type
 * @returns {string} Hex color for text
 */
export function getTextColor(type) {
  const lightTextTypes = ['dragon', 'ghost', 'dark', 'fighting', 'poison', 'psychic'];
  return lightTextTypes.includes(type) ? '#ffffff' : '#1a1a2e';
}

/**
 * Format type name for display (capitalize first letter)
 * @param {string} type - The Pokémon type
 * @returns {string} Formatted type name
 */
export function formatTypeName(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
