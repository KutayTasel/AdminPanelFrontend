import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputNumber, Select, Table, message } from "antd";
import BuildingsService from "../../services/BuildingService";
import "../../assets/css/Configuration.scss";

const BuildingConfiguration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buildingData, setBuildingData] = useState([]);
  const [form] = Form.useForm();
  const [availableBuildingTypes, setAvailableBuildingTypes] = useState([]);
  const [filteredBuildingTypes, setFilteredBuildingTypes] = useState([]);
  const [usedBuildingTypes, setUsedBuildingTypes] = useState([]);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const buildingTypesResponse =
          await BuildingsService.GetAllBuildingTypesAsync();
        const buildingTypes = buildingTypesResponse?.buildingTypes || [];
        setAvailableBuildingTypes(buildingTypes);

        const existingBuildings = await BuildingsService.GetAllBuildingsAsync();
        console.log("API response:", existingBuildings);

        if (!existingBuildings || existingBuildings.length === 0) {
          message.warning("No buildings found.");
        }
        setBuildingData(
          (existingBuildings || []).map((building) => ({
            key: building.id,
            buildingTypeId: building.buildingTypeId,
            buildingTypeName: buildingTypes.find(
              (type) => type.id === building.buildingTypeId
            )?.name,
            buildingCost: building.buildingCost,
            constructionTime: building.constructionTime,
          }))
        );
        const usedTypes = existingBuildings.map(
          (building) => building.buildingTypeId
        );
        setUsedBuildingTypes(usedTypes);

        const filteredTypes = buildingTypes.filter(
          (type) => !usedTypes.includes(type.id)
        );
        setFilteredBuildingTypes(filteredTypes);
      } catch (error) {
        message.error("Failed to fetch building data.");
        console.error("Error fetching building data:", error);
      }
    };

    fetchBuildingData();
  }, []);

  const columns = [
    {
      title: "Building Type",
      dataIndex: "buildingTypeName",
      key: "buildingType",
    },
    {
      title: "Building Cost",
      dataIndex: "buildingCost",
      key: "buildingCost",
    },
    {
      title: "Construction Time",
      dataIndex: "constructionTime",
      key: "constructionTime",
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddBuilding = async (values) => {
    const buildingData = {
      buildingTypeId: values.buildingType,
      buildingCost: parseFloat(values.buildingCost),
      constructionTime: parseInt(values.constructionTime, 10),
    };

    try {
      const response = await BuildingsService.CreateNewBuilding(buildingData);

      if (response.isSuccess) {
        message.success(response.message || "Building added successfully.");

        setUsedBuildingTypes((prevUsed) => [...prevUsed, values.buildingType]);

        const updatedFilteredTypes = availableBuildingTypes.filter(
          (type) =>
            ![...usedBuildingTypes, values.buildingType].includes(type.id)
        );
        setFilteredBuildingTypes(updatedFilteredTypes);

        setBuildingData((prevData) => [
          ...prevData,
          {
            key: Date.now(),
            buildingTypeId: values.buildingType,
            buildingTypeName: availableBuildingTypes.find(
              (type) => type.id === values.buildingType
            )?.name,
            buildingCost: buildingData.buildingCost,
            constructionTime: buildingData.constructionTime,
          },
        ]);

        closeModal();
      } else {
        message.error(response.message || "Failed to add building.");
      }
    } catch (error) {
      console.error("Error in handleAddBuilding:", error);
      message.error("An error occurred while adding the building.");
    }
  };

  return (
    <div className="building-configuration-container">
      <div className="header">
        <h1>Building Configuration Page</h1>
        <Button type="primary" onClick={openModal}>
          Add Building
        </Button>
      </div>

      <Table
        dataSource={buildingData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title="Add New Building"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="custom-modal"
      >
        <Form
          form={form}
          layout="vertical"
          id="addBuildingForm"
          onFinish={handleAddBuilding}
        >
          <Form.Item
            name="buildingType"
            label="Building Type"
            rules={[
              { required: true, message: "Please select a building type." },
            ]}
          >
            <Select placeholder="Select Building Type">
              {(filteredBuildingTypes || []).map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="buildingCost"
            label="Building Cost"
            rules={[
              { required: true, message: "Please enter the building cost." },
              {
                type: "number",
                min: 1,
                message: "Building cost must be greater than zero.",
              },
            ]}
          >
            <InputNumber
              placeholder="Building Cost"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="constructionTime"
            label="Construction Time (Seconds)"
            rules={[
              {
                required: true,
                message: "Please enter the construction time.",
              },
              {
                type: "number",
                min: 30,
                max: 1800,
                message:
                  "Construction time must be between 30 and 1800 seconds.",
              },
            ]}
          >
            <InputNumber
              placeholder="Construction Time"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
        <div className="footer-center">
          <Button key="cancel" type="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="addBuildingForm"
          >
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default BuildingConfiguration;
