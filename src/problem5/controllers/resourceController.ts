import { Request, Response } from "express";
import { IResource } from "../types/data";
const service = require("../services/resourceService");

const handleCreate = async (
  req: Request<{}, {}, IResource>,
  res: Response
): Promise<Response> => {
  try {
    const data = await service.createResource(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};
const handleList = async (
  req: Request<{}, {}, {}, Partial<IResource>>,
  res: Response
): Promise<Response> => {
  try {
    const filters = req.query;
    const data = await service.listResources(filters);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};
const handleGetDetail = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = await service.getResourceById(id);
    if (!data) {
      return res.status(404).json({
        status: 0,
        message: "Resource not found!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};
const handleUpdate = async (
  req: Request<{ id: string }, {}, Partial<IResource>>,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedCount = await service.updateResource(id, req.body);
    if (updatedCount[0] === 0) {
      return res.status(404).json({
        status: 0,
        message: "Resource not found or no changes made!",
      });
    }
    return res.status(200).json({
      status: 1,
      message: "Resource updated successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};
const handleDelete = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedCount = await service.deleteResource(id);
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 0,
        message: "Resource not found!",
      });
    }
    return res.status(200).json({
      status: 1,
      message: "Resource deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: -1,
      message: "Error from server!",
    });
  }
};

module.exports = {
  handleCreate,
  handleList,
  handleGetDetail,
  handleUpdate,
  handleDelete,
};
