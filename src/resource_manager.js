/**
 * ResourceManager - Manages a collection of library resources
 * Issue #4: FIX: Logic Error in Resource List Pagination
 * Issue #5: FIX: Null Pointer Exception in Search Query Handler
 * Issue #6: FEAT: Implement Nuer Language Localization Support
 */

class ResourceManager {
  constructor() {
    // Initialize with 10 mock library resources
    this.resources = [
      { id: 1, title: 'Introduction to Open Source', category: 'Education' },
      { id: 2, title: 'Public Sector Transparency Guide', category: 'Government' },
      { id: 3, title: 'Community Building Handbook', category: 'Community' },
      { id: 4, title: 'Digital Accessibility Standards', category: 'Technology' },
      { id: 5, title: 'Open Data Best Practices', category: 'Data' },
      { id: 6, title: 'Collaborative Development Methods', category: 'Development' },
      { id: 7, title: 'Legal Frameworks for OSS', category: 'Legal' },
      { id: 8, title: 'Documentation Guidelines', category: 'Documentation' },
      { id: 9, title: 'Version Control Fundamentals', category: 'Technology' },
      { id: 10, title: 'Inclusive Design Principles', category: 'Design' }
    ];
  }

  /**
   * BUGGY VERSION - Intentionally returns first page regardless of page parameter
   * This demonstrates the logic error in pagination
   */
  getPaginatedResourcesBuggy(page, pageSize) {
    // BUG: Always starts from index 0, ignoring the page parameter
    const startIndex = 0;
    const endIndex = pageSize;

    return {
      data: this.resources.slice(startIndex, endIndex),
      currentPage: page,
      totalPages: Math.ceil(this.resources.length / pageSize),
      totalItems: this.resources.length
    };
  }

  /**
   * FIXED VERSION - Correctly calculates start and end index based on page number
   *
   * UX FIX EXPLANATION:
   * The bug caused users to see the same first page of results no matter which
   * page number they requested. This creates a broken user experience because:
   *
   * 1. Navigation Confusion: Users clicking "Next" or page "2, 3, 4..." would
   *    always see the same 10 resources, making them think the pagination is broken.
   *
   * 2. Lost Content: With 10 items total and pageSize of 3, users would never
   *    see items 4-10 because the function always returned items 1-3.
   *
   * 3. Trust Erosion: When UI shows "Page 5 of 4" but displays page 1 content,
   *    users lose trust in the application's reliability.
   *
   * The fix correctly calculates startIndex as (page - 1) * pageSize, ensuring
   * each page request returns the appropriate slice of the resources array.
   */
  getPaginatedResources(page, pageSize) {
    // Validate inputs
    if (page < 1 || pageSize < 1) {
      throw new Error('Page and pageSize must be positive integers');
    }

    // FIX: Correctly calculate the starting index based on the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Calculate total pages for metadata
    const totalPages = Math.ceil(this.resources.length / pageSize);

    // Return paginated data with metadata
    return {
      data: this.resources.slice(startIndex, endIndex),
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
      totalItems: this.resources.length,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  }

  /**
   * BUGGY VERSION - Issue #5: Null Pointer Exception in Search Query Handler
   * This version crashes when query is null, undefined, or empty string
   * by calling .toLowerCase() on a potentially null value.
   */
  searchResourcesBuggy(query) {
    // BUG: No validation - calling .toLowerCase() on null/undefined will throw TypeError
    const searchTerm = query.toLowerCase();

    return this.resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * FIXED VERSION - Issue #5: Null Pointer Exception in Search Query Handler
   *
   * DEVICE COMPATIBILITY FIX:
   * This guard clause prevents crashes on low-resource devices like the Infinix Smart 9 HD
   * when users interact with the search bar. Entry-level smartphones often have limited
   * memory and slower processors; an unhandled exception in the search handler can
   * freeze the UI or crash the entire application, creating a poor user experience
   * for users who may not have access to higher-end devices.
   *
   * By returning an empty array for invalid queries, we ensure the search function
   * degrades gracefully rather than throwing an error that the device's limited
   * resources may struggle to recover from.
   */
  searchResources(query) {
    // FIX: Guard clause - handle null, undefined, or empty string queries gracefully
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    return this.resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm)
    );
  }
}

// Example usage demonstrating the bug and the fix
if (require.main === module) {
  const manager = new ResourceManager();

  console.log('=== BUGGY VERSION (Always returns first page) ===');
  console.log('Requesting page 1:', manager.getPaginatedResourcesBuggy(1, 3));
  console.log('Requesting page 2:', manager.getPaginatedResourcesBuggy(2, 3));
  console.log('Requesting page 3:', manager.getPaginatedResourcesBuggy(3, 3));

  console.log('\n=== FIXED VERSION (Correct pagination) ===');
  console.log('Requesting page 1:', manager.getPaginatedResources(1, 3));
  console.log('Requesting page 2:', manager.getPaginatedResources(2, 3));
  console.log('Requesting page 3:', manager.getPaginatedResources(3, 3));
  console.log('Requesting page 4:', manager.getPaginatedResources(4, 3));
}

/**
 * LocalizationManager - Issue #6: FEAT: Implement Nuer Language Localization Support
 *
 * MISSION ALIGNMENT:
 * This localization system directly supports the BOSC Community Library's mission of
 * inclusive access to information for regional users. By providing native support
 * for the Nuer language (Thok Naath), we ensure that community members in South Sudan
 * and Ethiopia can access library resources in their mother tongue, removing language
 * barriers that often exclude underrepresented populations from digital knowledge
 * platforms. This feature embodies our commitment to equity, accessibility, and
 * serving diverse communities with culturally appropriate technology.
 */
class LocalizationManager {
  constructor() {
    // Load available locales
    this.locales = {
      en: {
        language: 'English',
        languageCode: 'en',
        ui: {
          search: 'Search',
          next: 'Next',
          previous: 'Previous',
          libraryResources: 'Library Resources',
          noResults: 'No results found',
          loading: 'Loading...',
          error: 'An error occurred',
          submit: 'Submit',
          cancel: 'Cancel',
          home: 'Home',
          about: 'About',
          contact: 'Contact',
          welcome: 'Welcome',
          browseCatalog: 'Browse Catalog',
          viewDetails: 'View Details',
          download: 'Download',
          share: 'Share',
          filterBy: 'Filter by',
          sortBy: 'Sort by',
          page: 'Page',
          of: 'of',
          results: 'results',
          categories: 'Categories',
          all: 'All'
        },
        messages: {
          welcomeMessage: 'Welcome to the BOSC Community Library',
          searchPlaceholder: 'Search for resources...',
          emptySearch: 'Please enter a search term',
          resourceNotFound: 'Resource not found'
        }
      },
      nus: {
        language: 'Thok Naath',
        languageCode: 'nus',
        ui: {
          search: 'Guɔ̲ɔ̲p',
          next: 'Raar',
          previous: 'Yɛn',
          libraryResources: 'Kuɔny Thölibuk',
          noResults: 'Ŋuɔ̲tä̲ ca̲a̲ kɛ kuay',
          loading: 'Kuay ɛ rɛɛr...',
          error: 'Gua̱a̲th mi̱th ɛ cuŋɛ',
          submit: 'Gɔaa',
          cancel: 'Raal',
          home: 'Wa̱a̲',
          about: 'Kuany',
          contact: 'La̱t',
          welcome: 'Yin wa̱a̲',
          browseCatalog: 'Ji̱i̱k Käŋ',
          viewDetails: 'Nɛn Käŋ',
          download: 'Ɛɛl',
          share: 'Pa̱a̲',
          filterBy: 'Ta̱a̲ ka̱n',
          sortBy: 'Thooi̱ ka̱n',
          page: 'Wɛt',
          of: 'kɛ',
          results: 'Ŋuɔ̲tä̲',
          categories: 'Thoŋ',
          all: 'Kuay'
        },
        messages: {
          welcomeMessage: 'Yin wa̱a̲ Kuɔny Thölibuk BOSC',
          searchPlaceholder: 'Guɔ̲ɔ̲p kuɔny...',
          emptySearch: 'Ci̱th mä̲ kuay kuɔ̲ɔ̲p',
          resourceNotFound: 'Kuɔny ca̲a̲ kɛ kɔc'
        }
      }
    };

    // Default to English
    this.currentLocale = 'en';
  }

  /**
   * Set the current locale/language
   * @param {string} localeCode - Language code ('en' for English, 'nus' for Nuer)
   */
  setLocale(localeCode) {
    if (this.locales[localeCode]) {
      this.currentLocale = localeCode;
      return true;
    }
    return false;
  }

  /**
   * Get the current locale code
   * @returns {string} Current locale code
   */
  getCurrentLocale() {
    return this.currentLocale;
  }

  /**
   * Get available locales
   * @returns {Array} List of available locale codes and names
   */
  getAvailableLocales() {
    return Object.keys(this.locales).map(code => ({
      code: code,
      name: this.locales[code].language
    }));
  }

  /**
   * Get a UI label by key in the current locale
   * @param {string} key - UI label key
   * @returns {string} Localized UI label
   */
  getUI(key) {
    const locale = this.locales[this.currentLocale];
    return locale.ui[key] || locale.ui[key] || key;
  }

  /**
   * Get a message by key in the current locale
   * @param {string} key - Message key
   * @returns {string} Localized message
   */
  getMessage(key) {
    const locale = this.locales[this.currentLocale];
    return locale.messages[key] || locale.messages[key] || key;
  }

  /**
   * Get all UI labels for the current locale
   * @returns {Object} All UI labels
   */
  getAllUI() {
    return this.locales[this.currentLocale].ui;
  }

  /**
   * Get all messages for the current locale
   * @returns {Object} All messages
   */
  getAllMessages() {
    return this.locales[this.currentLocale].messages;
  }
}

module.exports = { ResourceManager, LocalizationManager };
