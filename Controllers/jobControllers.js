import Job from "../models/Job.js";
// import WorkLocation from "../models/WorkLocation.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      location,
      businessLine,
      careerArea,
      description,
      qualifications,
      workLocation, // Expecting the ID of the work location
      //   status,
    } = req.body;
    console.log(
      title,
      location,
      businessLine,
      careerArea,
      description,
      qualifications,
      workLocation
    );
    // --- Validation ---
    if (
      !title ||
      !location ||
      !businessLine ||
      !careerArea ||
      !description ||
      !qualifications ||
      !workLocation
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the provided workLocationId is valid
    // const workLocationExists = await WorkLocation.findById(workLocation);
    // if (!workLocationExists) {
    //   return res.status(404).json({ message: "Work Location not found." });
    // }

    // --- Create New Job ---
    const newJob = new Job({
      title,
      location,
      businessLine,
      careerArea,
      description,
      qualifications,
      workLocation,
      //   status,
    });

    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error in createJob:", error);
    res.status(500).json({
      message: "Server error while creating job.",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("title", "name")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs." });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params; // The MongoDB _id from the URL parameter
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    res.status(500).json({ message: "Server error while deleting job." });
  }
};
