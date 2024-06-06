export const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        console.log(page, limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {};
        results.info = {}
    
        if (endIndex < await model.countDocuments().exec()) {
        results.info.nextPage = {
          page: `http://localhost:3001/posts?page=${page+1}&limit=6`
        };
        }
    
        if (startIndex > 0) {
        results.info.previousPage = {
            page: page - 1,
            limit: limit,
        };
        }
    
        try {
        results.results = await model.find().limit(limit).skip(startIndex).exec();
        results.results = results.results.map((post) => ({
            _id: post._id,
            userId: post.userId,
            description: post.description,
            content: post.content,
            picturePath: post.picturePath,
            videoPath: post.videoPath,
            category: post.category,
            subCategory: post.subCategory,
            purchaseLink: post.purchaseLink,
            purchaseDate: post.purchaseDate,
            buyOrNotBuy: post.buyOrNotBuy,
            likes: post.likes,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            imageHeight: Math.floor(Math.random() * 200 + 150),
        }));
        res.paginatedResults = results;
        next();
        } catch (e) {
        res.status(500).json({ message: e.message });
        }
    };
    };

