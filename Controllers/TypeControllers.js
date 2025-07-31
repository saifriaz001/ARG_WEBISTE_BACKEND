import Type from '../Models/Type.js';

// ✅ Create a new type
export const createType = async (req, res) => {
  try {
    const { type } = req.body; // ✅ lowercase 'type' to match schema
    if (!type) {
      return res.status(400).json({ success: false, message: 'Type field is required' });
    }
    const newType = new Type({ type });
    const savedType = await newType.save();

    res.status(201).json({ success: true, data: savedType });
  } catch (error) {
     console.error('❌ Error creating type:', error.message);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Type already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create type' });
  }
};

// ✅ Get all types
export const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find().sort({ Type: 1 }); // Optional sorting
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    console.error('❌ Error fetching types:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch types' });
  }
};

// ✅ Delete a type by ID
export const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedType = await Type.findByIdAndDelete(id);
    if (!deletedType) {
      return res.status(404).json({ success: false, message: 'Type not found' });
    }

    res.status(200).json({ success: true, message: 'Type deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting type:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete type' });
  }
};
