const path = require("path")
const fs = require("fs");
const { v4: uuid4 } = require("uuid")
const ProductAdd = require("../Model/productAddForm");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "/public/assets");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuid4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
})

exports.productAddForm = upload.single('image', { limits: { fileSize: 5 * 1024 * 1024 } });

exports.createProduct = async (req, res) => {
    try {

        const { name, brand, category, hostleName, roomNumber, dayScholarContectNumber, prevAmount, newAmount, description } = req.body;
        const image = req.file ? `/assets/${req.file.filename}` : null;

        const createProduct = await ProductAdd.create({
            name,
            brand,
            category,
            hostleName,
            roomNumber,
            dayScholarContectNumber,
            image,
            description,
            prevAmount,
            newAmount
        })

        return res.status(201).json({ message: "Product created successful!", product: createProduct });

    } catch (error) {
        return res.status(400).json({ message: "Error during product created" });
    }
}

exports.allProduct = async (req, res) => {
    try {
        const productAll = await ProductAdd.find({});
        if (!productAll) {
            return res.status(404).json({ messgae: "Products not founds" });
        }
        return res.status(200).json({ message: "All product fetch", item: productAll });
    } catch (error) {
        return res.status(400).json({ message: "Error during product fetch" });
    }
}