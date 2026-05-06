/**
 * ResourceManager - Manages a collection of library resources
 * Issue #4: FIX: Logic Error in Resource List Pagination
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

module.exports = ResourceManager;
