const express = require('express');
const { getAllBlogsController, createBlogsController, updateBlogsController, getBlogByIdController, deleteBlogsController, userBlogControlller } = require('../controllers/blogController');
const app = express();

const router = express.Router();

router.get('/all-blog', getAllBlogsController)
app.use(router);

// POST || create blog
router.post('/create-blog', createBlogsController)

// PUT || update blog
router.put('/update-blog/:id', updateBlogsController)

// GET || single blog details
router.get('/get-blog/:id', getBlogByIdController)

// DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogsController)

// GET USER BLOG
router.get('/user-blog/:id', userBlogControlller)

module.exports = router;
