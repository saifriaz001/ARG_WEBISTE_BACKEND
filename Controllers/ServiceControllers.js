import Service from '../Models/Service.js';

export const createService = async (req, res) => {
  try {
    const { title, heading, description, imageUrl } = req.body;

    const service = new Service({
      title,
      heading,
      description,
      imageUrl,
    });

    const saved = await service.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('❌ Error creating service:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
};

// GET /api/services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error('❌ Error fetching services:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
};


// DELETE /api/services/:id
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting service:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
};