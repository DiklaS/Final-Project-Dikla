const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const usersValidationService = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareUser = require("../../middleware/permissionsMiddlewareUser");
const _ = require("lodash");

//1. REGISTER USER
router.post("/", async (req, res) => {
  try {
    await usersValidationService.registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    const newUser = await usersServiceModel.registerUser(req.body);
    res.send(_.pick(newUser, ["_id", "name", "phone", "email", "image", "address", "isBusiness"]));
    //res.json(newUser)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    await usersValidationService.loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("Invalid email and/or password.");

    const currentTime = Date.now();
    const blockDuration = 24 * 60 * 60 * 1000; 

    if (userData.loginAttempts >= 3 && userData.blockExpiresAt > currentTime) {
      throw new CustomError(
        `Account blocked for 24 hours. Please try again later.`
      );
    }

    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password  
    );
    if (!isPasswordMatch) {
      userData.loginAttempts = (userData.loginAttempts || 0) + 1;
      
      if (userData.loginAttempts >= 3) {
        userData.blockExpiresAt = currentTime + blockDuration;
      } 

    await usersServiceModel.updateUser(userData._id, userData);
      throw new CustomError("Invalid email and/or password.");
    }

    // Reset login attempts upon successful login
    userData.loginAttempts = 0;
    userData.blockExpiresAt = null;
    await usersServiceModel.updateUser(userData._id, userData);

    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

//3. GET ALL USERS
router.get("/", authmw,
permissionsMiddlewareUser(true, false),
async (req, res) => {
  try {
    const allUsers = await usersServiceModel.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

//4. GET USER
router.get("/:id", authmw,
permissionsMiddlewareUser(true, true),
async (req, res) => {
  try {
    await usersValidationService.userIdValidation(req.params.id);
    const userFromDB = await usersServiceModel.getUserById(req.params.id);
    if (!userFromDB) {
      res.status(404).json("User not found");
    } else {
      res.json(userFromDB);
    }  
  } catch (err) {
    res.status(400).json(err);
  }
});

//5. EDIT USER
router.put("/:id", authmw,
permissionsMiddlewareUser(false, true),
async (req, res) => {
  try {
    let normalUser = await normalizeUser(req.body);
    await usersValidationService.userIdValidation(req.params.id);
    await usersValidationService.editUserValidation(normalUser);
    const userFromDB = await usersServiceModel.updateUser(
      req.params.id,
      req.body
    );
    res.json(userFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

//6. CHANGE ISBUSINESS STATUS
router.patch("/:id", authmw, 
permissionsMiddlewareUser(true, true),
async (req, res) => {
  try {
    await usersValidationService.userIdValidation(req.params.id);
    const loggedInUserId = req.userData._id; 
    if (req.params.id !== loggedInUserId) {
      return res.status(403).send("Unauthorized");
    } 
    let user = await usersServiceModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.isBusiness = !user.isBusiness;
    user = await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


//7. DELETE USER
router.delete(
  "/:id", authmw,
  permissionsMiddlewareUser(true, true),
  async (req, res) => {
    try {
      await usersValidationService.userIdValidation(req.params.id);
      const userFromDB = await usersServiceModel.deleteUser(req.params.id);
      if (userFromDB) {
        res.json({ msg: "user was deleted" });
      } else {
        res.status(404).json({ msg: "could not find the user" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  } 
);



module.exports = router;
