"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const path_1 = require("path");
const fs_1 = require("fs");
const googleapis_1 = require("googleapis");
let AppController = class AppController {
    constructor(appService, crudService, crudServiceV2) {
        this.appService = appService;
        this.crudService = crudService;
        this.crudServiceV2 = crudServiceV2;
    }
    healthCheck() {
        return 'Is Health Check';
    }
    crud() {
        this.crudService.findOne();
        this.crudServiceV2.findOne();
        return 'Is Health Check';
    }
    nonBlocking() {
        this.appService.sendNotification('OK');
    }
    blocking() {
        let count = 0;
        for (let i = 0; i < 20000000000; i++) {
            count++;
        }
    }
    sse(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        const notifications$ = this.appService.getNotificationStream();
        notifications$.subscribe(notification => {
            console.log('Notification', notification);
            res.write(`data: ${JSON.stringify(notification)}\n\n`);
        });
    }
    index(response) {
        response
            .type('text/html')
            .send((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'index.html')).toString());
    }
    async googleAuth(req) {
        console.log(req);
        return true;
    }
    async test() {
        const clientId = '384932600632-m3497o4cmj8i840s9hqko4tek21vlb9r.apps.googleusercontent.com';
        const clientSecret = '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';
        const redirectUri = 'http://localhost:3000';
        const scope = 'https://www.googleapis.com/auth/forms';
        const authUrl = `https://accounts.google.com/o/oauth2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}`;
        const serviceAccountInfo = {
            type: 'service_account',
            project_id: 'sunny-cider-400601',
            private_key_id: 'b36383414a827f2ff56b03326a4042f4669c3c80',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC24b0Lsh6o3eqe\nx51EBctudFhrVQkO0hXFZJZ66ipau6r575gjhC5ZofH6aWnwTiLp/UWvyBcVRxMs\n/FUd38xE81saMZ+mdZg0eiixhjnRyY4CNIKjkfDSq4b3Yi/5nLkG+vf3v/PeBW34\nl4TRqgmqJmEevPIukI706BvTofJkMfgcVs1U9paz5vauORS9560sNKtk5JfEQG1e\nQ5cfHXXrPu3bIId1MLfctBeXhjTybil2lw6+WRJZjTAfYiBwfsHkrvfW/ho1/xW5\n8T5ZjhqBBHruQjyIFBPu2T+E4t6b/0QuNxCTouFlDTXK4FpgbmYpKSKjzHR9PUDT\nOo1e2RdTAgMBAAECggEAGpXQPH4FNPklnTVZaEULYKArJlczPONPZOWNdorJ42y6\nmyC4Vhll/4OqQIPIcbV6H9fApKAKsv4lDHoWCYS6Fh/mU3V5RuJ7YM2NUtk3WIbb\nTPjDMPILNyTWNuogHUIqJ5ieKXbPBax2Yxfrp+r3ArQXlDdVYW2ESpffS7GUIfpe\nBMPVlo5AhvsK1t2XLolTDYLHlq0jHy66v2rxoLX+2DoDrclWTNgc2YPWjL4hVMIu\nRZ66ObX0aPtfTT6xPbHySg3lcvsXObDCgDPQcY0Nx9QjhI6Zun5Tz1kaj9i6A/0g\nFu7OWElJ2L9VUvU4Py6oSZjqeu6/AL27UNvWq7q5MQKBgQD64SY6TtdnceuFC1gU\nWWMiK8pSzjSG6baRqwqrzSwDItkUIzgq2bxIGoLBbLbn7k1jOswTs1pZoWAGNRkD\nMkzC7bKSSceyH2HDHhbB9yiKqoOFGVINuo00/08Tb5VZfgpSO5YCmM4tJlU5yNAa\ntm6FPQtxR5bgQotaiQQ0Xx+cuwKBgQC6nUy5wuv3XBzEzfEK0K/Q+mabuhxxJpZh\nyEwoWnis2FYNh/FH1MJzh894fiU0l+eecWaKftS+7afSfLuSVhr+q0/s0tIeVVT0\nNkXKkbQEKmWtScwIndsvEuCeXe1n+Dnk3Cry+NNNn6oXFhFYS0FFHhBPGNZuOHjF\nMiG5LozSSQKBgGj4HYOWC2CX9MBVD8Rr5iOdCOl+p9GvJhlq5GsfzIN/aC6Z0d1z\n/uh4Vy9RKnJ+bdjP+CViDLKl58SRIOcKe72vsOCuiCSKJuB5zXHY1Ri34ZGmF4Px\nAzYigNaUAHxSVUU08z4g61tOx6gG0rPqkvGiqg/6sTEiBqaZ361+A38TAoGBAImk\nD71LyeNuq0F1bH4/og4PQrNFuEi032JL6/AvmqZSAlaEmDAU+z9fQmVrFWIPUKUK\nm0k3dw9EFu4nVen/XHXOQWs5rAT3h2uAxEU+5nnUE56Wucj5NXso/0ePm9V9vqXQ\nxlTjtmagh0Hz4uMuznt+SyUr+qzdNiasbTc64F8RAoGAEHTQQs0Ttx8RToo2e+NY\nfGvsMUxXSl/cC6ryCdRNKvMCKFz78XAvXB2frV5U1cXrTVvdvsR9obdJlzF9R24T\npGLaU4MfihAcPuACaM8kG0twtIIcvsZMVMeznbBPz4diRfPlweqdBIRby2Z7O/tO\n1npQ1V5tyBoVif54C7vNZqg=\n-----END PRIVATE KEY-----\n',
            client_email: 'google-forms-1@sunny-cider-400601.iam.gserviceaccount.com',
            client_id: '113238113566883286505',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/google-forms-1%40sunny-cider-400601.iam.gserviceaccount.com',
            universe_domain: 'googleapis.com',
        };
        const oauth2Client = new googleapis_1.google.auth.JWT(serviceAccountInfo.client_email, null, serviceAccountInfo.private_key.replace(/\\n/g, '\n'), [scope]);
        const token = await oauth2Client.authorize();
        console.log(token);
        oauth2Client.setCredentials(token);
        const drive = googleapis_1.google.forms({
            version: 'v1',
            auth: oauth2Client,
        });
        const form = await drive.forms.create({
            requestBody: { info: { title: 'my form' } },
        });
        console.log(form);
    }
};
__decorate([
    (0, common_1.Get)('health-check'),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('crud'),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "crud", null);
__decorate([
    (0, common_1.Get)('non-blocking'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "nonBlocking", null);
__decorate([
    (0, common_1.Get)('blocking'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "blocking", null);
__decorate([
    (0, common_1.Get)('sse'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "sse", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('oauth2callback'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('form'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "test", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('CRUD_IML')),
    __param(2, (0, common_1.Inject)('CRUD_IMLV2')),
    __metadata("design:paramtypes", [app_service_1.AppService, Object, Object])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map