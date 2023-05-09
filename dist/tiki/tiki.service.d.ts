import { Logger } from '@nestjs/common';
export declare class TikiService {
    private logger;
    constructor(logger: Logger);
    handleCron(): void;
}
