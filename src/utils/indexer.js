/**
 * Resource Indexer Utility - Issue #8: REFACTOR: Optimize Directory Structure
 *
 * MODULAR ARCHITECTURE RATIONALE:
 * This utility resides in src/utils/ to provide shared indexing functionality
 * that can be consumed by multiple parts of the application (core logic, API
 * endpoints, reporting tools) without duplicating code. In a community project
 * like BOSC, utilities represent cross-cutting concerns that multiple
 * contributors might need. Centralizing indexing logic here ensures consistency
 * in how resources are summarized and cataloged across the entire system,
 * regardless of which team is building the feature that consumes the index.
 */

/**
 * Creates an indexed summary of the resource collection for efficient lookup
 * and analytics. This index maps resources by various dimensions to enable
 * fast filtering and reporting without scanning the entire dataset.
 *
 * @param {Array} resources - Array of resource objects
 * @returns {Object} Indexed summary containing:
 *   - totalCount: Total number of resources
 *   - byDepartment: Object mapping department names to resource counts
 *   - byYear: Object mapping years to resource counts
 *   - byCategory: Object mapping categories to resource counts
 *   - byAuthor: Object mapping authors to their resource counts
 *   - recentResources: Array of 5 most recent resources (by year)
 */
function indexResources(resources) {
  if (!Array.isArray(resources)) {
    throw new Error('Resources must be an array');
  }

  const index = {
    totalCount: resources.length,
    byDepartment: {},
    byYear: {},
    byCategory: {},
    byAuthor: {},
    recentResources: []
  };

  // Build frequency maps
  resources.forEach(resource => {
    // Count by department
    index.byDepartment[resource.department] =
      (index.byDepartment[resource.department] || 0) + 1;

    // Count by year
    index.byYear[resource.year] =
      (index.byYear[resource.year] || 0) + 1;

    // Count by category
    index.byCategory[resource.category] =
      (index.byCategory[resource.category] || 0) + 1;

    // Count by author
    index.byAuthor[resource.author] =
      (index.byAuthor[resource.author] || 0) + 1;
  });

  // Sort resources by year descending and take top 5
  index.recentResources = [...resources]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  return index;
}

/**
 * Generates a quick lookup index by resource ID for O(1) access
 * @param {Array} resources - Array of resource objects
 * @returns {Object} Map of resource ID to resource object
 */
function createIdIndex(resources) {
  const idIndex = {};
  resources.forEach(resource => {
    idIndex[resource.id] = resource;
  });
  return idIndex;
}

/**
 * Generates a full-text search index mapping search terms to resource IDs
 * @param {Array} resources - Array of resource objects
 * @returns {Object} Inverted index mapping keywords to arrays of resource IDs
 */
function createSearchIndex(resources) {
  const searchIndex = {};

  resources.forEach(resource => {
    // Extract keywords from title, category, author, and department
    const text = `${resource.title} ${resource.category} ${resource.author} ${resource.department}`;
    const keywords = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);

    // Map each keyword to this resource ID
    keywords.forEach(keyword => {
      if (!searchIndex[keyword]) {
        searchIndex[keyword] = new Set();
      }
      searchIndex[keyword].add(resource.id);
    });
  });

  // Convert Sets to Arrays for JSON serialization
  const serializedIndex = {};
  for (const [keyword, idSet] of Object.entries(searchIndex)) {
    serializedIndex[keyword] = Array.from(idSet);
  }

  return serializedIndex;
}

module.exports = {
  indexResources,
  createIdIndex,
  createSearchIndex
};
