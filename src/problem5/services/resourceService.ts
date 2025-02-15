import { IResource } from "../types/data";
const { Resource } = require("../models/resource");
const createResource = async (data: IResource): Promise<IResource> => {
  const result = await Resource.create(data);
  return result;
};
const listResources = async (
  filters: Partial<IResource>
): Promise<IResource[]> => {
  const results = await Resource.findAll({
    where: filters,
  });
  return results;
};
const getResourceById = async (id: string): Promise<IResource | null> => {
  const result = await Resource.findByPk(id);
  return result;
};
const updateResource = async (
  id: string,
  data: Partial<IResource>
): Promise<[number]> => {
  const result = await Resource.update(data, {
    where: { id },
  });
  return result;
};
const deleteResource = async (id: string): Promise<number> => {
  const result = await Resource.destroy({
    where: { id },
  });
  return result;
};

module.exports = {
  createResource,
  listResources,
  getResourceById,
  updateResource,
  deleteResource,
};
