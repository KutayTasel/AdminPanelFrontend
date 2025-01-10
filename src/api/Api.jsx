import axios from "axios";
import ToastService from "../services/ToastService";

const api = axios.create({
  baseURL: "https://localhost:7123/api/",
});

const addTokenHeader = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const ApiRequests = {
  async handleRequestGetAsync(requestUrl, setLoading = null) {
    try {
      if (setLoading) setLoading(true);
      addTokenHeader();
      const res = await api.get(requestUrl);

      if (res.data?.message) {
        ToastService.toastSuccess(res.data.message);
      }
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },

  async handleRequestPostAsync(
    requestUrl,
    requestData,
    setLoading = null,
    hasToken = true
  ) {
    try {
      if (setLoading) setLoading(true);
      if (hasToken) addTokenHeader();
      const res = await api.post(requestUrl, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.message) {
        ToastService.toastSuccess(res.data.message);
      }
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },

  async handleRequestPutAsync(requestUrl, requestData, setLoading = null) {
    try {
      if (setLoading) setLoading(true);
      addTokenHeader();
      const res = await api.put(requestUrl, requestData);

      if (res.data?.message) {
        ToastService.toastSuccess(res.data.message);
      }
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },

  async handleRequestDeleteAsync(requestUrl, setLoading = null) {
    try {
      if (setLoading) setLoading(true);
      addTokenHeader();
      const res = await api.delete(requestUrl);

      if (res.data?.message) {
        ToastService.toastSuccess(res.data.message);
      }
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },

  async handleRequestPatchAsync(requestUrl, requestData, setLoading = null) {
    try {
      if (setLoading) setLoading(true);
      addTokenHeader();
      const res = await api.patch(requestUrl, requestData);

      if (res.data?.message) {
        ToastService.toastSuccess(res.data.message);
      }
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },
  async fetchNewBuildingDataAsync(requestUrl, setLoading = null) {
    try {
      if (setLoading) setLoading(true);
      addTokenHeader();
      const res = await api.get(requestUrl);
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },
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
  async createNewBuildingAsync(requestUrl, requestData, setLoading = null) {
    try {
      if (setLoading) setLoading(true);
      addTokenHeader();
      const res = await api.post(requestUrl, requestData, {
        headers: { "Content-Type": "application/json-patch+json" },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      handleError(error);
      return {
        data: null,
        status: error.response?.status || 500,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  },
};
function handleError(error) {
  let errorMessage = "An unexpected error occurred.";

  if (error.response?.data?.errors) {
    errorMessage = error.response.data.errors
      .map((err) => err.errorMessage)
      .join(" ");
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  }

  ToastService.toastError(errorMessage);
  console.error("Error details:", error.response || error);
}
