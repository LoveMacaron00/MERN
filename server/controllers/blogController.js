//ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require('uuid');

//บันทึกข้อมูล
exports.create = async (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if(!slug)slug = uuidv4();

  //validate / ตรวจสอบความถูกต้องของข้อมูล
  switch (true) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" });
  }
  try {
    // บันทึกข้อมูล
    const blog = await Blogs.create({ title, content, author, slug });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: "มีชื่อบทความซ้ำกัน" });
  }
};

//ดึงข้อมูลบทความ
exports.getAllblogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ" });
  }
};

//ดึงบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blogs.findOne({ slug }).exec();
    if (!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ" });
  }
};

//ลบข้อมูลบทความตาม slug
exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blogs.findOneAndDelete({ slug });
    if (!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" });
    }
    res.json({
      message: "ลบข้อมูลเรียบร้อยแล้ว"
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "เกิดข้อผิดพลาดในการลบข้อมูล" });
  }
};

exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    // ส่งข้อมูล => title , content, author
    const { title, content, author } = req.body;
    const blog = await Blogs.findOneAndUpdate({ slug },{title,content,author},{new:true}).exec();
    if (!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "เกิดข้อผิดพลาดในการอัพเดตข้อมูลบทความ" });
  }
}

//localhost:8080/install-postman
