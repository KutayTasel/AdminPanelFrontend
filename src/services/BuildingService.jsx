import { ApiRequests } from "../api/Api";
import { toast } from "react-toastify";

const BuildingsService = {
  async GetAllBuildingsAsync() {
    try {
      console.log("Fetching all buildings...");
      const response = await ApiRequests.handleRequestGetAsync(
        "Buildings/getbuilding"
      );

      if (response.status === 200) {
        console.log("Buildings fetched:", response.data);
        return response.data.buildings || [];
      } else {
        toast.error(response.data?.message || "Failed to fetch buildings.");
        return [];
      }
    } catch (error) {
      console.error("Error in GetAllBuildingsAsync:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching buildings."
      );
      return [];
    }
  },

  async AddBuildingAsync(buildingData) {
    const validationErrors = [
      ...BuildingsService.validateBuildingTypeId(buildingData.buildingTypeId),
      ...BuildingsService.validateBuildingCost(buildingData.buildingCost),
      ...BuildingsService.validateConstructionTime(
        buildingData.constructionTime
      ),
    ];

    if (validationErrors.length > 0) {
      return { isSuccess: false, message: validationErrors.join(", ") };
    }

    try {
      console.log("Sending building data:", buildingData);
      const response = await ApiRequests.handleRequestPostAsync(
        "Buildings/addbuilding",
        buildingData
      );

      if (response.status === 201) {
        toast.success(response.data.message || "Building added successfully!");
        return { isSuccess: true, message: response.data.message };
      } else {
        toast.error(response.data.message || "Failed to add building.");
        return { isSuccess: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Error in AddBuildingAsync:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding the building."
      );
      return { isSuccess: false, message: "Failed to add building." };
    }
  },

  async GetAllBuildingTypesAsync() {
    try {
      console.log("Fetching building types...");
      const response = await ApiRequests.handleRequestGetAsync(
        "Buildings/getall"
      );

      if (response.status === 200) {
        console.log("Building types fetched:", response.data);
        return response.data;
      } else {
        toast.error(
          response.data?.message || "Failed to fetch building types."
        );
        return null;
      }
    } catch (error) {
      console.error("Error in GetAllBuildingTypesAsync:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching building types."
      );
      return null;
    }
  },

  async FetchNewBuildingData() {
    try {
      console.log("Fetching new building data...");
      const response = await ApiRequests.fetchNewBuildingDataAsync(
        "Buildings/getbuilding"
      );

      if (response.status === 200) {
        console.log("New building data fetched:", response.data);
        return response.data;
      } else {
        toast.error(
          response.data?.message || "Failed to fetch new building data."
        );
        return null;
      }
    } catch (error) {
      console.error("Error in FetchNewBuildingData:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching new building data."
      );
      return null;
    }
  },

  async CreateNewBuilding(buildingData) {
    try {
      console.log("Creating new building:", buildingData);
      const response = await ApiRequests.createNewBuildingAsync(
        "Buildings/addbuilding",
        buildingData
      );

      if (response.status === 201) {
        toast.success(
          response.data.message || "New building created successfully!"
        );
        return { isSuccess: true, message: response.data.message };
      } else {
        toast.error(response.data.message || "Failed to create building.");
        return { isSuccess: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Error in CreateNewBuilding:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the building."
      );
      return { isSuccess: false, message: "Failed to create building." };
    }
  },
};

export default BuildingsService;
