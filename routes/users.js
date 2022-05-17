var express = require('express');
var router = express.Router();
var { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()



router.route("/")
  .get(async (req, res) => {
    try {
      const users = await prisma.user.findMany({

      })
      res.json(users);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.send(e.meta);
      }
    }
  })


  .post(async (req, res) => {
    try {
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        },
      })

      res.json(user)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.send(e.meta);
      }
    }
  })

router.route("/:id")
  .get(async (req, res) => {
    const {
      id
    } = req.params
    try {
      const users = await prisma.user.findMany({
        where: {
          id,
        },
      });
      res.json(users);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.send(e.meta);
      }
    }
  })

  .put(async (req, res) => {
    const {
      id
    } = req.params
    try {
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          name: req.body.name,
          email: req.body.email,
        },
      })
      res.json(user)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.send(e.meta);
      }
    }
  })

  .delete(async (req, res) => {
    const {
      id
    } = req.params
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      })
      res.send("user " + user.name + " Removed")
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.send(e.meta);
      }
    }

  })





module.exports = router;