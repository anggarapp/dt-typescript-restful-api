import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const primsaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});

primsaClient.$on("error", (e) => {
    logger.error(e);
})

primsaClient.$on("warn", (e) => {
    logger.warn(e);
})

primsaClient.$on("info", (e) => {
    logger.info(e);
})

primsaClient.$on("query", (e) => {
    logger.info(e);
})
