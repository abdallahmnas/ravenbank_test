import Config from "../utils/config";
import HttpGateway from "./HttpGateway";

export class RavenService {
  baseUrl = Config.raven.baseUrl;
  head: any = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  async createAccount(data: {
    first_name: string;
    last_name?: string;
    phone: string;
    amount: number;
    email: string;
  }) {
    try {
      const info: any = await HttpGateway.post({
        baseUrl: `${this.baseUrl}pwbt/generate_account`,
        body: data,
        headers: {
          ...this.head,
          Authorization: `Bearer ${Config.raven.secretKey}`,
        },
      });
      return {
        success: true,
        message: info?.data?.message ?? "Success Query",
        data: info?.data?.data,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data?.message ?? "Could not Create",
        data: e?.response?.data?.data ?? {},
      };
    }
  }

  async transfer(data: {
    amount: string;
    bank_code: string; //"044";
    bank: string; //"Access bank";
    account_number: string; //"0690000031";
    account_name: string; // "Pastor Bright";
    narration: string;
    reference: string;
    currency?: "NGN";
  }) {
    try {
      const info: any = await HttpGateway.post({
        baseUrl: `${this.baseUrl}transfers/create`,
        body: { ...data, currency: data?.currency ?? "NGN" },
        headers: {
          ...this.head,
          Authorization: `Bearer ${Config.raven.secretKey}`,
        },
      });
      return {
        success: true,
        message: info?.data?.message ?? "Success Query",
        data: info?.data?.data,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data?.message ?? "Could not Create",
        data: e?.response?.data?.data ?? {},
      };
    }
  }

  async accountInfo(data: {
    bank: string; //"code";
    account_number: string; //"0690000031";
  }) {
    try {
      const info: any = await HttpGateway.post({
        baseUrl: `${this.baseUrl}account_number_lookup`,
        body: data,
        headers: {
          ...this.head,
          Authorization: `Bearer ${Config.raven.secretKey}`,
        },
      });
      return {
        success: true,
        message: info?.data?.message ?? "Success Query",
        data: info?.data?.data,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data?.message ?? "Could not Create",
        data: e?.response?.data?.data ?? {},
      };
    }
  }
  async bankList() {
    try {
      const info: any = await HttpGateway.get({
        baseUrl: `${this.baseUrl}banks`,
        headers: {
          ...this.head,
          Authorization: `Bearer ${Config.raven.secretKey}`,
        },
      });
      return {
        success: true,
        message: info?.data?.message ?? "Success Query",
        data: info?.data?.data,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data?.message ?? "Could not Create",
        data: e?.response?.data?.data ?? {},
      };
    }
  }
}
