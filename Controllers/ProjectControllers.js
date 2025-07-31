import Project from '../models/Projects.js';

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const {
      title,
      heading,
      description,
      imageUrl,
      market,
      country,
      state,
      city,
      services
    } = req.body;

    const project = new Project({
      title,
      heading,
      description,
      imageUrl,
      market,
      country,
      state,
      city,
      services
    });

    const savedProject = await project.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
};

// GET /api/projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('market')
      .populate('services')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error('❌ Error fetching projects:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};


// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting project:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
};
