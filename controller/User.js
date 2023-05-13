import { User } from "../model/user.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middleware/sendMail.js";
import cloudinary from "cloudinary";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User or Password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
        token: token,
      });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: true, message: "Loggedout in successfully" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
    res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;
    await sendMail(userMessage);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, password, skills, about } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (skills) {
      if (skills.image1) {
        await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
          folder: "portfolio",
        });
        user.skills.image1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image2) {
        await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
          folder: "portfolio",
        });
        user.skills.image2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image3) {
        await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
          folder: "portfolio",
        });
        user.skills.image3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image4) {
        await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
          folder: "portfolio",
        });
        user.skills.image4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image5) {
        await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
          folder: "portfolio",
        });
        user.skills.image5 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image6) {
        await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
          folder: "portfolio",
        });
        user.skills.image6 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    if (about) {
      if (about?.name) {
        user.about.name = about.name;
      }
      if (about?.title) {
        user.about.title = about.title;
      }
      if (about?.subtitle) {
        user.about.subtitle = about.subtitle;
      }
      if (about?.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }
      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "portfolio",
        });
        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User Update Successfully" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const user = await User.findById(req.user._id);
    user.timeline.unshift({ title, description, date });
    await user.save();

    res.status(200).json({ success: true, message: "Added to timeline" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { url, title, image, description, techStack } = req.body;
    const user = await User.findById(req.user._id);
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });

    user.projects.unshift({
      url,
      title,
      description,
      techStack,
      image: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    await user.save();

    res.status(200).json({ success: true, message: "Added to Projects" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    user.timeline = user.timeline.filter((item) => item._id != id);
    await user.save();

    res.status(200).json({ success: true, message: "Deleted from Timeline" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const project = user.projects.filter((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project[0].image.public_id);
    user.projects = user.projects.filter((item) => item._id !=  id);
    await user.save();

    res.status(200).json({ success: true, message: "Deleted from Projects" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
