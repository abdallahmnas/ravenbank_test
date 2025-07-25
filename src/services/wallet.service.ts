import { WalletInterface } from "../interface/wallet.interface";
import { UserInterface } from "../interface/user.interface";
import walletRepository from "../repositories/wallet.repository";
import { RavenService } from "../service-gateway/RavenGateway";
import Config from "../utils/config";
const bcrypt = require("bcrypt");

class WalletService {
  async creditUserWallet(userId: number, data: { amount: number }) {
    const wallet: any = await walletRepository.getWalletByKey("userId", userId);
    if (!wallet) return { success: false, message: "Wallet Not Found" };
    // TODO Creat wallet here
    const currentBalance: number = parseFloat(wallet.balance);
    const newBalance = currentBalance + data.amount;

    // Update wallet
    const update = await walletRepository.updateWallet(wallet.id, {
      balance: newBalance,
      prevBalance: currentBalance,
    });
    if (!update) return { success: false, message: "Wallet Not Funded" };
    // Add history
    // try {
    // //  Create History
    // } catch (e: any) {
    //   console.log(e?.message);
    // }

    return {
      success: true,
      message: "Wallet Funded",
      data: { previousBalance: currentBalance, newBalance: newBalance },
    };
    return wallet;
  }
  async debitUserWallet(userId: number, data: { amount: number }) {
    const wallet: any = await walletRepository.getWalletByKey("userId", userId);
    if (!wallet) return { success: false, message: "Wallet Not Found" };

    const currentBalance: number = parseFloat(wallet.balance);
    if (Number(data.amount) < 1)
      return { success: false, message: "Invalid Amount" };
    if (currentBalance < Number(data.amount))
      return { success: false, message: "Insufficient Balance" };

    const newBalance = currentBalance - data.amount;

    // Update wallet
    const update = await walletRepository.updateWallet(wallet.id, {
      balance: newBalance,
      prevBalance: currentBalance,
    });
    if (!update) return { success: false, message: "Wallet Not Funded" };
    // Add history
    // try {
    // //  Create History
    // } catch (e: any) {
    //   console.log(e?.message);
    // }

    return {
      success: true,
      message: "Wallet Debitted",
      data: { previousBalance: currentBalance, newBalance: newBalance },
    };
    return wallet;
  }

  getByKey = async (key: string, value: any) => {
    const wallets = await walletRepository.getWalletByKey(key, value);
    return wallets;
  };

  find = async (value: any) => {
    const wallets = await walletRepository.getWalletByKey("id", value);
    return wallets;
  };
}

export default new WalletService();
