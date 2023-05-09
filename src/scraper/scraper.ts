import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Scraper {
  headers = {};

  async requestWithGetMethod(url_request: string) {
    const response = axios.get(url_request, {
      headers: this.headers,
    });
    return (await response).data;
  }

  setHeaders(key: string, value: string) {
    this.headers[key] = value;
  }
}
