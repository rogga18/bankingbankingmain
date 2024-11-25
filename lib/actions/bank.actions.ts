"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    const banks = await getBanks({ userId });

    const accounts = banks?.map((bank: Bank) => ({
      id: bank.$id,
      availableBalance: 150000,
      currentBalance: 150000,
      name: "Savings Plus",
      officialName: "Horizon Bank Account",
      mask: "6775",
      type: "checking",
      subtype: "checking",
      appwriteItemId: bank.$id,
      shareableId: bank.shareableId,
      institutionId: "horizon_bank"
    }));

    const totalBanks = accounts?.length || 0;
    const totalCurrentBalance = 150000 * (accounts?.lenght || 0);

    return parseStringify({ 
      data: accounts, 
      totalBanks, 
      totalCurrentBalance 
    });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    const bank = await getBank({ documentId: appwriteItemId });
    
    const account = {
      id: bank.$id,
      availableBalance: 6000,
      currentBalance: 6000,
      name: "Lillian Justice",
      officialName: "Horizon Bank Account",
      mask: "6775",
      type: "checking",
      subtype: "checking",
      appwriteItemId: bank.$id,
      institutionId: "horizon_bank"
    };

    // Get transfer transactions from Appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    const transferTransactions = transferTransactionsData?.documents?.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    ) || [];

    // Sample static transactions
    const sampleTransactions = [
        {
          "id": "tx4",
          "name": "401K Pension Transfer",
          "amount": 6000.75,
          "date": "2024-03-12",
          "paymentChannel": "in store",
          "category": "Groceries",
          "type": "debit"
      },
      {
          "id": "tx5",
          "name": "Gas Station",
          "amount": 42.30,
          "date": "2024-03-12",
          "paymentChannel": "Penssion",
          "category": "Penssion",
          "type": "Direct deposite"
      },
      {
          "id": "tx6",
          "name": "Gym Membership",
          "amount": 35.00,
          "date": "2024-03-10",
          "paymentChannel": "online",
          "category": "Health & Fitness",
          "type": "debit"
      },
      {
          "id": "tx7",
          "name": "Electric Bill",
          "amount": 120.15,
          "date": "2024-03-09",
          "paymentChannel": "online",
          "category": "Utilities",
          "type": "debit"
      },
      {
          "id": "tx8",
          "name": "Coffee Shop",
          "amount": 8.50,
          "date": "2024-03-08",
          "paymentChannel": "in store",
          "category": "Food & Drink",
          "type": "debit"
      },
      {
          "id": "tx9",
          "name": "Amazon Purchase",
          "amount": 25.99,
          "date": "2024-03-07",
          "paymentChannel": "online",
          "category": "Shopping",
          "type": "debit"
      },
      {
          "id": "tx10",
          "name": "Insurance Payment",
          "amount": 150.00,
          "date": "2024-03-06",
          "paymentChannel": "online",
          "category": "Insurance",
          "type": "debit"
      },
      {
          "id": "tx11",
          "name": "Uber Ride",
          "amount": 18.75,
          "date": "2024-03-05",
          "paymentChannel": "online",
          "category": "Transportation",
          "type": "debit"
      },
      {
          "id": "tx12",
          "name": "Bonus",
          "amount": 500.00,
          "date": "2024-03-04",
          "paymentChannel": "direct deposit",
          "category": "Income",
          "type": "credit"
      },
      {
          "id": "tx13",
          "name": "Dining Out",
          "amount": 45.00,
          "date": "2024-03-03",
          "paymentChannel": "in store",
          "category": "Food & Drink",
          "type": "debit"
      },
      {
          "id": "tx14",
          "name": "Movie Tickets",
          "amount": 20.00,
          "date": "2024-03-02",
          "paymentChannel": "in store",
          "category": "Entertainment",
          "type": "debit"
      },
      {
          "id": "tx15",
          "name": "Spotify Subscription",
          "amount": 9.99,
          "date": "2024-03-01",
          "paymentChannel": "online",
          "category": "Entertainment",
          "type": "debit"
      },
      {
          "id": "tx16",
          "name": "Utility Bill",
          "amount": 110.20,
          "date": "2024-02-28",
          "paymentChannel": "online",
          "category": "Utilities",
          "type": "debit"
      },
      {
          "id": "tx17",
          "name": "Grocery Store",
          "amount": 65.30,
          "date": "2024-02-27",
          "paymentChannel": "in store",
          "category": "Groceries",
          "type": "debit"
      },
      {
          "id": "tx18",
          "name": "Rent Payment",
          "amount": 1200.00,
          "date": "2024-02-26",
          "paymentChannel": "bank transfer",
          "category": "Housing",
          "type": "debit"
      },
      {
          "id": "tx19",
          "name": "Car Payment",
          "amount": 300.00,
          "date": "2024-02-25",
          "paymentChannel": "online",
          "category": "Transportation",
          "type": "debit"
      },
      {
          "id": "tx20",
          "name": "Freelance Project",
          "amount": 750.00,
          "date": "2024-02-24",
          "paymentChannel": "direct deposit",
          "category": "Income",
          "type": "credit"
      },
      {
          "id": "tx21",
          "name": "Doctor's Visit",
          "amount": 90.00,
          "date": "2024-02-23",
          "paymentChannel": "in store",
          "category": "Health & Fitness",
          "type": "debit"
      },
      {
          "id": "tx22",
          "name": "Concert Tickets",
          "amount": 120.00,
          "date": "2024-02-22",
          "paymentChannel": "online",
          "category": "Entertainment",
          "type": "debit"
      },
      {
          "id": "tx23",
          "name": "Phone Bill",
          "amount": 55.25,
          "date": "2024-02-21",
          "paymentChannel": "online",
          "category": "Utilities",
          "type": "debit"
      },
      {
          "id": "tx24",
          "name": "Charity Donation",
          "amount": 30.00,
          "date": "2021-03-20",
          "paymentChannel": "online",
          "category": "Charity",
          "type": "debit"
      }
    ];

    // Combine and sort all transactions
    const allTransactions = [...sampleTransactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Remove or simplify getInstitution to return static data
export const getInstitution = async ({ institutionId }: getInstitutionProps) => {
  return parseStringify({
    institution_id: "horizon_bank",
    name: "Horizon Bank",
  });
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
