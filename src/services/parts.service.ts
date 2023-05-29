import { InitialPart } from "../models/initialParts.model";
import { Part } from "../models/parts.model";
import { Model } from "../models/models.model";
import * as partsRepository from "../repositories/parts.repository";
import * as modelsRepository from "../repositories/models.repository";
import * as modelPartsRepository from "../repositories/modelParts.repository";
import * as companyPartsRepository from "../repositories/companyParts.repository";
import NotFoundError from "../errors/notFound.error";

export const initializeParts = async (parts: InitialPart[]): Promise<void> => {
  const models: Model[] = await modelsRepository.getAll();
  for (let part of parts) {
    await initializePart(part, models);
  }
};

const initializePart = async (initialPart: InitialPart, models: Model[]): Promise<void> => {
  const part: Part = mapToPart(initialPart);
  try {
    const existingPart: Part = await partsRepository.getByReference(part.reference);
    await partsRepository.update(existingPart.partId as string, part);
    await updateModels(initialPart.models, existingPart.partId as string, models);
  } catch (err) {
    if (err instanceof NotFoundError) {
      const createdPart: Part = await partsRepository.create(part);
      await createModels(initialPart.models, createdPart.partId as string, models);
    } else {
      throw err;
    }
  }
};

const mapToPart = (initialPart: InitialPart): Part => {
  return {
    reference: initialPart.partNo,
    name: initialPart.name,
    description: initialPart.description,
    defaultPrice: initialPart.price,
  };
};

const createModels = async (initialModels: string, partId: string, models: Model[]): Promise<void> => {
  const modelsArray = initialModels.split(",");
  for (let model of modelsArray) {
    let modelId = models.find((m) => m.name === model)?.modelId;
    if (!modelId) modelId = models.find((m) => m.name === "UNKNOWN")?.modelId;
    await modelPartsRepository.create(modelId as string, partId);
  }
};

const updateModels = async (initialModels: string, partId: string, models: Model[]): Promise<void> => {
  const modelsArray = initialModels.split(",");
  for (let model of modelsArray) {
    let modelId = models.find((m) => m.name === model)?.modelId;
    if (!modelId) modelId = models.find((m) => m.name === "UNKNOWN")?.modelId;
    try {
      await modelPartsRepository.getByModelIdAndPartId(modelId as string, partId);
    } catch (err) {
      if (err instanceof NotFoundError) {
        await modelPartsRepository.create(modelId as string, partId);
      } else {
        throw err;
      }
    }
  }
};

export const initializePartsForCompany = async (companyId: string): Promise<void> => {
  const parts: Part[] = await partsRepository.getAll();
  for (let part of parts) {
    const partForCompany = {
      partId: part.partId,
      companyId: companyId,
      price: part.defaultPrice,
      stock: 0,
      location: "DEFAULT",
    };
    await companyPartsRepository.create(partForCompany);
  }
};
