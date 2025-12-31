module.exports = function fixScalarNavbar(context) {
  return {
    name: 'fix-scalar-navbar',
    async contentLoaded({ actions, allContent }) {
      // The @scalar/docusaurus plugin adds its own navbar item
      // We need to remove it since we're manually managing the navbar
      const originalItems = context.siteConfig.themeConfig.navbar.items;
      
      // Remove any item that points to the Scalar route
      const filteredItems = originalItems.filter(item => {
        if (item.to === '/api-reference') {
          return false;
        }
        return true;
      });
      
      // Update the theme config with filtered items
      context.siteConfig.themeConfig.navbar.items = filteredItems;
    },
  };
};
