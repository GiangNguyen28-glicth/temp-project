import { AppService } from './app.service';
import { Response } from 'express';
import { ICRUD } from 'common/interfaces/crud';
export declare class AppController {
    private readonly appService;
    private crudService;
    private crudServiceV2;
    constructor(appService: AppService, crudService: ICRUD, crudServiceV2: ICRUD);
    healthCheck(): string;
    crud(): string;
    nonBlocking(): void;
    blocking(): void;
    sse(res: Response): any;
    index(response: Response): void;
    googleAuth(req: any): Promise<boolean>;
    test(): Promise<void>;
}
