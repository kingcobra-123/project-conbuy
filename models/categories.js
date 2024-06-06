import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
    typeName : {
        type: String,
        required: true,
    },

    typeImage: {
        type: String,
        required: true,
    },
});

const MainCategorySchema = new mongoose.Schema({
    name : {
        type: String,
    },
    types: [TypeSchema],
});


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryImage: {
        type: String,
        required: true,
    },
    mainCategories: [MainCategorySchema],
    
});

const Category = mongoose.model('Category', categorySchema);

export default Category;