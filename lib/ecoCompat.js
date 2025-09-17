const { JSONFilePreset } = require('lowdb/node');
const path = require('path');

// Initialize database with defaults
const defaultData = { users: {}, items: {} };
let db = null;

// Initialize database asynchronously
const initDB = async () => {
  if (!db) {
    const file = path.join(process.cwd(), 'economy.json');
    db = await JSONFilePreset(file, defaultData);
  }
  return db;
};

class Manager {
  constructor() {
    this.cooldowns = new Map();
  }

  async fetchMoney(userId) {
    const database = await initDB();
    const userKey = `money_${userId}`;
    return database.data.users[userKey] || 0;
  }

  async addMoney(userId, amount) {
    const database = await initDB();
    const userKey = `money_${userId}`;
    if (!database.data.users[userKey]) database.data.users[userKey] = 0;
    database.data.users[userKey] += amount;
    await database.write();
    return database.data.users[userKey];
  }

  async subtractMoney(userId, amount) {
    const database = await initDB();
    const userKey = `money_${userId}`;
    if (!database.data.users[userKey]) database.data.users[userKey] = 0;
    database.data.users[userKey] = Math.max(0, database.data.users[userKey] - amount);
    await database.write();
    return database.data.users[userKey];
  }

  async daily(userId, amount, options = {}) {
    const cooldownKey = `daily_${userId}`;
    const now = Date.now();
    const lastDaily = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours

    if (now - lastDaily < cooldownTime) {
      const remaining = cooldownTime - (now - lastDaily);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);
    const newBalance = await this.addMoney(userId, amount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: amount,
      after: newBalance
    };
  }

  async weekly(userId, amount, options = {}) {
    const cooldownKey = `weekly_${userId}`;
    const now = Date.now();
    const lastWeekly = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 7 * 24 * 60 * 60 * 1000; // 7 days

    if (now - lastWeekly < cooldownTime) {
      const remaining = cooldownTime - (now - lastWeekly);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);
    const newBalance = await this.addMoney(userId, amount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: amount,
      after: newBalance
    };
  }

  async beg(userId, amount, options = {}) {
    const cooldownKey = `beg_${userId}`;
    const now = Date.now();
    const lastBeg = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 5 * 60 * 1000; // 5 minutes

    if (now - lastBeg < cooldownTime) {
      const remaining = cooldownTime - (now - lastBeg);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);

    // Simulate random beg outcomes
    let finalAmount = amount;
    let lost = false;

    if (options.canLose && Math.random() < 0.3) {
      finalAmount = -Math.floor(amount * 0.5);
      lost = true;
    } else {
      finalAmount = Math.floor(amount * (0.5 + Math.random() * 0.5));
    }

    const newBalance = await this.addMoney(userId, finalAmount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: finalAmount,
      lost: lost,
      after: newBalance
    };
  }

  async work(userId, amount, options = {}) {
    const cooldownKey = `work_${userId}`;
    const now = Date.now();
    const lastWork = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 30 * 60 * 1000; // 30 minutes

    if (now - lastWork < cooldownTime) {
      const remaining = cooldownTime - (now - lastWork);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);
    const workAmount = Math.floor(amount * (0.8 + Math.random() * 0.4));
    const newBalance = await this.addMoney(userId, workAmount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: workAmount,
      after: newBalance
    };
  }
}

// Database adapter object that mimics Eco.db
const dbAdapter = {
  async fetch(key) {
    const database = await initDB();
    return database.data.users[key] || 0;
  },

  async set(key, value) {
    const database = await initDB();
    database.data.users[key] = value;
    await database.write();
    return value;
  },

  async add(key, amount) {
    const database = await initDB();
    if (!database.data.users[key]) database.data.users[key] = 0;
    database.data.users[key] += amount;
    await database.write();
    return database.data.users[key];
  },

  async subtract(key, amount) {
    const database = await initDB();
    if (!database.data.users[key]) database.data.users[key] = 0;
    database.data.users[key] = Math.max(0, database.data.users[key] - amount);
    await database.write();
    return database.data.users[key];
  },

  async delete(key) {
    const database = await initDB();
    delete database.data.users[key];
    await database.write();
    return true;
  }
};

module.exports = {
  Manager,
  db: dbAdapter
};