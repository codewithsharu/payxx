const getHomePage = async (req, res) => {
    try {
        res.render('index', {
            title: 'Fashion Store | Home'
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
};

const getAboutPage = async (req, res) => {
    try {
        res.render('about', {
            title: 'About Us | Fashion Store'
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
};

const getContactPage = async (req, res) => {
    try {
        res.render('contact', {
            title: 'Contact Us | Fashion Store'
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
};

const getProductsPage = async (req, res) => {
    try {
        // Sample products data - replace with actual database query
        const products = [
            {
                name: "Classic White T-Shirt",
                description: "Premium cotton crew neck t-shirt",
                price: 599,
                image: "/images/products/tshirt.jpg",
                stock: 15,
                isNew: true
            },
            {
                name: "Denim Jeans",
                description: "Slim fit stretch denim jeans",
                price: 1999,
                image: "/images/products/jeans.jpg",
                stock: 8,
                isNew: false
            }
            // Add more sample products as needed
        ];

        res.render('products', {
            title: 'Products | Fashion Store',
            products: products,
            category: req.query.category || 'all'
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
};

module.exports = {
    getHomePage,
    getAboutPage,
    getContactPage,
    getProductsPage
}; 