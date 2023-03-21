import { Request, Response, Router } from "express";
import { devicesService } from "../_legacy_/service/devices-service";
import { devicesQueryRepository } from "../repositories/query-repos/mongodb-devices-query-repository";

export const securityRouter = Router({});

securityRouter.get(
    "/devices",
    async (req: Request, res: Response) => {
        const foundDevices = await devicesQueryRepository.findDevices();
        res.json(foundDevices);
    }
);

securityRouter.delete("/devices", async (req: Request, res: Response) => {
    const isDeleted = await devicesService.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});