var express = require("express");
var router = express.Router();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { bookController } = require("../controllers");
const { userController } = require("../controllers");
const authentication = require("../middlewares/auth.middleware");
const authorization = require("../middlewares/authorization.middleware");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library management system",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSDoc(options);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 *  components:
 *      schemas:
 *          Borrowed:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                      batch:
 *                          type: string
 *                      enrollment_no:
 *                          type: string
 */

/**
 *  @swagger
 *  /signup:
 *          post:
 *              summary: this is used to register the user
 *              description: this is used to register the user
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: 'components/schemas/user'
 *              responses:
 *                  200:
 *                      description: Added successfully
 */
router.post("/signup", userController.signup);

/**
 *  @swagger
 *  /login:
 *          get:
 *              summary: this is used to login the user
 *              description: this is used to login the user
 *              responses:
 *                  200:
 *                      description: to test login method
 */
router.get("/login", userController.login);

/**
 * @swagger
 *  components:
 *      schemas:
 *          Borrowed:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      email:
 *                          type: string
 *                      userId:
 *                          type: string
 *                      bookId:
 *                          type: string
 */

/**
 *  @swagger
 *  /profile:
 *          get:
 *              summary: this is used to get all borrowed books
 *              description: this is used to get all borrowed books
 *              responses:
 *                  200:
 *                      description: to get all borrowed books
 *                      content:
 *                          application/json:
 *                               schema:
 *                                   type: array
 *                                   items:
 *                                       $ref: '#components/schemas/Borrowed'
 */

router.get("/profile", userController.getProfile);
router.put("/update", userController.update);
router.delete("/delete", userController.delete);

router.post("/add-book",authorization.isAdmin, bookController.addBook);
router.post("/borrow", authorization.isAdmin, bookController.borrowBook);

/**
 *  @swagger
 *  /return:
 *          get:
 *              summary: this is used to return the books
 *              description: this is used to return the books
 *              responses:
 *                  200:
 *                      description: this is used to return the books
 */
router.get("/return",authorization.isAdmin, bookController.returnBook);

/**
 * @swagger
 *  components:
 *      schemas:
 *          Book:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      book_name:
 *                          type: string
 *                      author_name:
 *                          type: string
 *                      genres:
 *                          type: string
 *                      publisher:
 *                          type: string
 */

/**
 *  @swagger
 *  /profile:
 *          get:
 *              summary: this is used to get all borrowed books
 *              description: this is used to get all borrowed books
 *              responses:
 *                  200:
 *                      description: to get all borrowed books
 *                      content:
 *                          application/json:
 *                               schema:
 *                                   type: array
 *                                   items:
 *                                       $ref: '#components/schemas/Borrowed'
 */
router.get(
  "/displayAll",
  authentication.authentication,
  bookController.displayBooks
);
router.get("/daysleft",authorization.isAdmin, bookController.daysleft);
router.get("/single", authorization.isAdmin, bookController.singleBook);
router.get(
  "/allBorrowed",
  authentication.authentication,
  bookController.allBooks
);

module.exports = router;
