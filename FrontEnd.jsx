import React, { useState, useEffect } from "react";
import axios from "axios";
// You will need to install this package for the location dropdowns
// npm install react-country-state-city
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

// This component assumes your backend is running on http://localhost:3000

// --- Helper component for displaying messages ---
const Alert = ({ message, type, onClose }) => {
  if (!message) return null;
  const baseClasses =
    "p-4 mb-4 text-sm rounded-lg flex justify-between items-center";
  const typeClasses = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">
        X
      </button>
    </div>
  );
};

// --- Main Component for Managing Jobs ---
const ManageJobs = () => {
  // State for location dropdowns
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    city: "",
    businessLine: "", // Changed from dropdown to text
    careerArea: "", // Changed from dropdown to text
    description: "",
    qualifications: "", // Will be a comma-separated string from a textarea
    workLocation: "On-site",
  });

  // State for jobs list, loading, and error handling
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // API base URL - adjust if your port is different
  const API_BASE_URL = "http://localhost:3000/api/v1";

  // --- Fetch all jobs from the server ---
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get-jobs`, {
        withCredentials: true,
      });
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      console.error("Fetch Jobs Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // --- Handle form input changes for standard text inputs ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Handle form submission to create a new job ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Convert comma-separated qualifications string to an array
    const qualificationsArray = formData.qualifications
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q);

    if (qualificationsArray.length === 0) {
      setError("Please provide at least one qualification.");
      setIsLoading(false);
      return;
    }

    const jobData = { ...formData, qualifications: qualificationsArray };

    // IMPORTANT: Make sure your backend Job model has removed the 'enum'
    // constraint from 'businessLine' and 'careerArea' to avoid validation errors.

    try {
      await axios.post(`${API_BASE_URL}/create-job`, jobData, {
        withCredentials: true,
      });
      setSuccessMessage("Job created successfully!");
      fetchJobs(); // Refresh the list of jobs
      // Reset form and location dropdowns
      setFormData({
        title: "",
        country: "",
        state: "",
        city: "",
        businessLine: "",
        careerArea: "",
        description: "",
        qualifications: "",
        workLocation: "On-site",
      });
      setCountryId(0);
      setStateId(0);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Create Job Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle job deletion ---
  const handleDelete = async (jobId) => {
    // A simple confirm dialog. For a better UX, consider a custom modal component.
    if (!window.confirm("Are you sure you want to delete this job post?")) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.delete(`${API_BASE_URL}/delete-job/${jobId}`, {
        withCredentials: true,
      });
      setSuccessMessage("Job deleted successfully!");
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete job.";
      setError(errorMessage);
      console.error("Delete Job Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Admin Job Management
      </h1>

      {/* --- Job Creation Form --- */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Create New Job Post
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Job Title */}
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Location Dropdowns */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Country
            </label>
            <CountrySelect
              onChange={(e) => {
                setCountryId(e.id);
                setFormData({
                  ...formData,
                  country: e.name,
                  state: "",
                  city: "",
                });
              }}
              placeHolder="Select Country"
              containerClassName="w-full"
              inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              State
            </label>
            <StateSelect
              countryid={countryId}
              onChange={(e) => {
                setStateId(e.id);
                setFormData({ ...formData, state: e.name, city: "" });
              }}
              placeHolder="Select State"
              containerClassName="w-full"
              inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!countryId}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City
            </label>
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e) => {
                setFormData({ ...formData, city: e.name });
              }}
              placeHolder="Select City"
              containerClassName="w-full"
              inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!stateId}
            />
          </div>

          {/* Work Location */}
          <div>
            <label
              htmlFor="workLocation"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Work Location
            </label>
            <select
              name="workLocation"
              id="workLocation"
              value={formData.workLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </div>

          {/* Business Line (Text Input) */}
          <div className="md:col-span-2">
            <label
              htmlFor="businessLine"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Business Line
            </label>
            <input
              type="text"
              name="businessLine"
              id="businessLine"
              value={formData.businessLine}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Career Area (Text Input) */}
          <div className="md:col-span-2">
            <label
              htmlFor="careerArea"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Career Area
            </label>
            <input
              type="text"
              name="careerArea"
              id="careerArea"
              value={formData.careerArea}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Qualifications */}
          <div className="md:col-span-2">
            <label
              htmlFor="qualifications"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Qualifications
            </label>
            <textarea
              name="qualifications"
              id="qualifications"
              rows="3"
              value={formData.qualifications}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter qualifications, separated by commas"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isLoading ? "Submitting..." : "Create Job"}
            </button>
          </div>
        </form>

        {/* --- Display Messages --- */}
        <div className="mt-4">
          <Alert
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage(null)}
          />
          <Alert message={error} type="error" onClose={() => setError(null)} />
        </div>
      </div>

      {/* --- Display Posted Jobs --- */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Current Job Postings
        </h2>
        {isLoading && jobs.length === 0 ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-sm">
            No jobs have been posted yet.
          </p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-grow mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {job.city}, {job.state}, {job.country} | {job.workLocation}
                  </p>
                  <p className="text-md text-gray-600 mt-1">
                    Career Area: {job.careerArea}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDelete(job._id)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
