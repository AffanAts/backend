const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

//product
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });
  if (!product) {
    return res.status(400).send("product not found");
  }

  res.send(product);
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image1: newProductData.image1,
      image2: newProductData.image2,
    },
  });

  res.send({
    data: product,
    message: "create product successfully",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send("Product deleted successfully");
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.description &&
      productData.image1 &&
      productData.image2
    )
  ) {
    return res.status(400).send("some field are missing");
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },

    data: {
      description: productData.description,
      name: productData.name,
      image1: productData.image1,
      image2: productData.image2,
    },
  });

  res.send({
    data: product,
    message: "edit product successfully",
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },

    data: {
      description: productData.description,
      name: productData.name,
      image1: productData.image1,
      image2: productData.image2,
    },
  });

  res.send({
    data: product,
    message: "edit product successfully",
  });
});

//blog
app.get("/blogs", async (req, res) => {
  const blogs = await prisma.blog.findMany();

  res.send(blogs);
});

app.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await prisma.blog.findUnique({
    where: {
      id: parseInt(blogId),
    },
  });
  if (!blog) {
    return res.status(400).send("blog not found");
  }

  res.send(blog);
});

app.post("/blogs", async (req, res) => {
  const newBlogData = req.body;
  const blog = await prisma.blog.create({
    data: {
      name: newBlogData.name,
      description: newBlogData.description,
      image: newBlogData.image,
    },
  });

  res.send({
    data: blog,
    message: "create new blog successfully",
  });
});

app.delete("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;

  await prisma.blog.delete({
    where: {
      id: parseInt(blogId),
    },
  });

  res.send("blog deleted successfully");
});

app.put("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  if (!(blogData.name && blogData.description && blogData.image)) {
    return res.status(400).send("some field are missing");
  }
  const blog = await prisma.blog.update({
    where: {
      id: parseInt(blogId),
    },

    data: {
      name: blogData.name,
      description: blogData.description,
      image: blogData.image,
    },
  });

  res.send({
    data: blog,
    message: "edit data successfully",
  });
});

app.patch("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  const blog = await prisma.blog.update({
    where: {
      id: parseInt(blogId),
    },

    data: {
      name: blogData.name,
      description: blogData.description,
      image: blogData.image,
    },
  });

  res.send({
    data: blog,
    message: "edit data successfully",
  });
});

//user
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });
  if (!user) {
    return res.status(400).send("user not found");
  }

  res.send(user);
});

app.post("/users", async (req, res) => {
  const newUserData = req.body;
  const user = await prisma.user.create({
    data: {
      name: newUserData.name,
      password: newUserData.password,
    },
  });

  res.send({
    data: user,
    message: "User created successfully",
  });
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  await prisma.user.delete({
    where: {
      id: parseInt(userId),
    },
  });

  res.send("user deleted successfully");
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  if (!(userData.name && userData.password)) {
    return res.status(400).send("some field are missing");
  }
  const user = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },

    data: {
      name: userData.name,
      password: userData.password,
    },
  });

  res.send({
    data: user,
    message: "edit user successfully",
  });
});

app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  const user = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },

    data: {
      name: userData.name,
      password: userData.password,
    },
  });

  res.send({
    data: user,
    message: "edit user successfully",
  });
});

app.listen(PORT, () => {
  console.log("Express API runing in port:" + PORT);
});
