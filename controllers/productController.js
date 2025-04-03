const getAllProducts = async (req, res) => {
    try {
        // Static products data
        const products = [
            {
                id: 1,
                name: "Classic White T-Shirt",
                price: 599,
                description: "Premium cotton casual wear",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
                stock: 15,
                isNew: true,
                category: "Men's Wear"
            },
            {
                id: 2,
                name: "Denim Jeans",
                price: 1499,
                description: "Comfortable slim fit jeans",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
                stock: 8,
                isNew: false,
                category: "Men's Wear"
            },
            {
                id: 3,
                name: "Floral Summer Dress",
                price: 1299,
                description: "Light and breezy summer wear",
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
                stock: 12,
                isNew: true,
                category: "Women's Wear"
            },
            {
                id: 4,
                name: "Leather Handbag",
                price: 2499,
                description: "Elegant genuine leather bag",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
                stock: 5,
                isNew: false,
                category: "Accessories"
            },
            {
                id: 5,
                name: "Running Shoes",
                price: 3999,
                description: "High-performance sports shoes",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                stock: 20,
                isNew: true,
                category: "Accessories"
            },
            {
                id: 6,
                name: "Designer Watch",
                price: 4999,
                description: "Premium stainless steel watch",
                image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
                stock: 0,
                isNew: false,
                category: "Accessories"
            },
            {
                id: 7,
                name: "Formal Blazer",
                price: 3499,
                description: "Classic fit business wear",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
                stock: 10,
                isNew: true,
                category: "Men's Wear"
            },
            {
                id: 8,
                name: "Evening Gown",
                price: 4599,
                description: "Elegant party wear dress",
                image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
                stock: 3,
                isNew: true,
                category: "Women's Wear"
            }
        ];

        // Filter products based on query parameters if needed
        let filteredProducts = [...products];
        
        const category = req.query.category;
        if (category && category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        // Only show in-stock items if specified
        if (req.query.inStock === 'true') {
            filteredProducts = filteredProducts.filter(p => p.stock > 0);
        }

        // Sort products if needed
        const sortBy = req.query.sort;
        if (sortBy) {
            switch(sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    filteredProducts.sort((a, b) => b.isNew - a.isNew);
                    break;
            }
        }

        res.render('products', {
            title: 'Our Products | Fashion Store',
            products: filteredProducts,
            category: category || 'all'
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).render('error', { 
            message: 'Error loading products'
        });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        // Reuse getAllProducts with category filter
        req.query.category = category;
        return getAllProducts(req, res);
    } catch (error) {
        console.error('Error in getProductsByCategory:', error);
        res.status(500).render('error', { 
            message: 'Error loading category products'
        });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        // Find product from static data
        const product = products.find(p => p.id === parseInt(id));
        
        if (!product) {
            return res.status(404).render('404');
        }

        res.render('product-detail', {
            title: `${product.name} | Fashion Store`,
            product
        });
    } catch (error) {
        console.error('Error in getProductDetail:', error);
        res.status(500).render('error', { 
            message: 'Error loading product details'
        });
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductDetail
}; 